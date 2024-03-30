import numpy as np
import pandas as pd
import datetime
from datetime import datetime
import os
from api import app
from flask import Flask, request, jsonify
import pymongo
from datetime import datetime, timedelta


@app.route('/api/last30daysdata', methods=['POST'])
def last30daysdata():
        client = pymongo.MongoClient("mongodb+srv://guest_admin:greencloud@cluster0.0lsxams.mongodb.net/GreenCloud")
        db = client["GreenCloud"]
        collection2 = db["simulated_metersv2"]
        collection = db["electricMeter"]

        # Define the query to filter simulated_meters collection
        query_simulated_meters = {"workingStatus": 1}

        # Find documents in the electricMeter collection
        cursor_meters = collection.find(query_simulated_meters)

        # Convert cursor to DataFrame
        df_meters = pd.DataFrame(list(cursor_meters))
        electric_meter_ids = df_meters['electricMeterId'].tolist()
        print(electric_meter_ids)
        query_simulated_metersv2 = {"LCLid": {"$in": electric_meter_ids}}
        cursor_simulated_metersv2 = collection2.find(query_simulated_metersv2)
        df_simulated_metersv2 = pd.DataFrame(list(cursor_simulated_metersv2))
        df_simulated_metersv2['tstp'] = pd.to_datetime(df_simulated_metersv2['tstp'])
        df_simulated_metersv2['tstp'] = df_simulated_metersv2['tstp'].dt.date
        latest_date = df_simulated_metersv2['tstp'].max()
        date_30_days_ago = latest_date - timedelta(days=30)
        df_last_30_days = df_simulated_metersv2[df_simulated_metersv2['tstp'] >= date_30_days_ago]
        df_last_30_days =df_last_30_days[['LCLid','energy(kWh/hh)','tstp']]
        df_last_30_days =df_last_30_days.rename(columns={'energy(kWh/hh)':'energy'})

        df_last_30_days = df_last_30_days.sort_values(by='tstp', ascending=True)
        df_aggregated = df_last_30_days.groupby(['tstp', 'LCLid']).agg({
            'energy': 'sum'  # Sum the 'energy(kWh/hh)' values for each group
        }).reset_index()

        df_aggregated = df_aggregated.sort_values(by='tstp', ascending=True)
        df_aggregated['device'] ='Meter'




        #Solar 
        collection2 = db["simulated_solar"]
        collection = db["solarMeter"]

        # Define the query to filter simulated_meters collection
        query_simulated_meters = {"workingStatus": 1}

        # Find documents in the electricMeter collection
        cursor_meters = collection.find(query_simulated_meters)

        # Convert cursor to DataFrame
        df_meters = pd.DataFrame(list(cursor_meters))
        electric_meter_ids = df_meters['solarMeterId'].tolist()
        print(electric_meter_ids)
        query_simulated_metersv2 = {"LCLid": {"$in": electric_meter_ids}}
        cursor_simulated_metersv2 = collection2.find(query_simulated_metersv2)
        df_simulated_metersv2 = pd.DataFrame(list(cursor_simulated_metersv2))
        df_simulated_metersv2['tstp'] = pd.to_datetime(df_simulated_metersv2['tstp'])
        df_simulated_metersv2['tstp'] = df_simulated_metersv2['tstp'].dt.date
        latest_date = df_simulated_metersv2['tstp'].max()
        date_30_days_ago = latest_date - timedelta(days=30)
        df_last_30_days = df_simulated_metersv2[df_simulated_metersv2['tstp'] >= date_30_days_ago]
        df_last_30_days =df_last_30_days[['LCLid','energy(kWh/hh)','tstp']]
        df_last_30_days =df_last_30_days.rename(columns={'energy(kWh/hh)':'energy'})

        df_last_30_days = df_last_30_days.sort_values(by='tstp', ascending=True)
        df_aggregated_solar = df_last_30_days.groupby(['tstp', 'LCLid']).agg({
        'energy': 'sum'  # Sum the 'energy(kWh/hh)' values for each group
        }).reset_index()

        df_aggregated_solar = df_aggregated_solar.sort_values(by='tstp', ascending=True)
        df_aggregated_solar['device'] ='Solar'
      
        #Mergining Meter and solar
        df_aggregated = pd.concat([df_aggregated, df_aggregated_solar], ignore_index=True)
        # df_aggregated = df_aggregated.astype(str)
        result_df_solar = df_aggregated_solar.astype(str)

        

        # df_aggregated = df_aggregated.astype(str)
        result_df = df_aggregated.astype(str)
        # json_data = result_df.values
        data_list = df_aggregated.to_dict(orient='records')

        # Convert the 'tstp' column to string format
        for record in data_list:
            record['tstp'] = str(record['tstp'])

        

        # Return JSON response
        return jsonify(data_list), 200


