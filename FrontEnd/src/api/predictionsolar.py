import numpy as np
import pandas as pd
import datetime
from datetime import datetime
import os
from api import app
from flask import Flask, request, jsonify
import pymongo

root = ""
models = ""
dataset = "../Dataset/meter/"
figures_output = "../../public/output_graphs/"
table_output = "../../public/output_graphs/"


@app.route('/api/predictionsolar', methods=['POST'])
def predictionsolar():
    data = request.json
    start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
    end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
    device_list= data.get('selectedDevices')
    frequency = data.get('frequency')
    column = "energy(kWh/hh)"

    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb+srv://guest_admin:greencloud@cluster0.0lsxams.mongodb.net/GreenCloud")  # Change the connection string as per your MongoDB setup
    db = client["GreenCloud"]
    collection = db["simulated_solar"]
    LoadMeter = collection.find()

    mongodbdata = []
    for document in LoadMeter:
        document.pop('_id', None)  # Remove the '_id' field
        mongodbdata.append({
            'tstp': document['tstp'],
            'LCLid': document['LCLid'],
            'energy(kWh/hh)': document['energy(kWh/hh)'],
            'year': document['year'],
            'quarter': document['quarter'],
            'month': document['month'],
            'day': document['day'],
            'hour_minute': document['hour_minute'],
            'PredictedGeneration': document['PredictedGeneration']
            # Add other fields as needed
            # 'RelativeHumidity': document['RelativeHumidity'],
            # 'DewPoint': document['DewPoint'],
            # 'Precipitation': document['Precipitation'],
            # 'CloudCover': document['CloudCover'],
            # 'CloudCoverCategory': document['CloudCoverCategory'],
            # 'WindSpeed': document['WindSpeed'],
            # 'TotalConsumption': document['TotalConsumption'],
            # 'PredictedTotalConsumption': document['PredictedTotalConsumption']
        })
    # Convert the list of dictionaries into a pandas DataFrame
    df_combined = pd.DataFrame(mongodbdata)

    data = request.json
    start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
    end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
    device_list = data.get('selectedDevices')
    frequency = data.get('frequency')
    column = "energy(kWh/hh)"
    # df_combined = pd.read_csv(os.path.join(dataset, 'df_combined1.csv'))
    df_combined['tstp'] = pd.to_datetime(df_combined['tstp'])
    df_combined['time'] = df_combined['tstp']
    filtered_df = df_combined[df_combined['LCLid'].isin(device_list)]
    filtered_df = filtered_df[(filtered_df['time'] >= start_date) & (filtered_df['time'] <= end_date)]
    result_df = filtered_df.groupby(["LCLid", 'time']).agg({'energy(kWh/hh)': 'sum', 'PredictedGeneration': 'sum'}).reset_index()
    numeric_columns = result_df[["LCLid",column, "PredictedGeneration", "time"]]
    freq_mapping = {'hourly': 'H', 'daily': 'D', 'weekly': 'W'}
    numeric_columns['time'] = pd.to_datetime(numeric_columns['time'])
    
    if frequency == 'weekly':
        def calculate_week_number(date):
            return (date.day - 1) // 7 + 1
        grouped_df = numeric_columns.groupby([pd.Grouper(key='LCLid'), pd.Grouper(key='time', freq='W-MON')]).sum().reset_index()
        grouped_df = grouped_df.groupby(['time']).agg({'energy(kWh/hh)': 'sum', 'PredictedGeneration': 'sum'}).reset_index()
        grouped_df['week'] = grouped_df['time'].apply(calculate_week_number)
        grouped_df['month_year'] = grouped_df['time'].dt.strftime('%b-%Y')
        # Group by "LCLid", "week", and "month_year", calculating the mean
        # Convert 'week' column to integer
        grouped_df['week'] = grouped_df.groupby(['month_year'])['time'].rank("dense")
        grouped_df['month_year'] = pd.to_datetime(grouped_df['month_year'], format='%b-%Y')
        grouped_df = grouped_df.sort_values(['month_year', 'week'])
        grouped_df['month_year'] = grouped_df['month_year'].dt.strftime('%b-%Y')
        grouped_df['time'] = grouped_df['month_year'].astype(str)+"- Week "+grouped_df['week'].astype(str)

        json_data = grouped_df[['time', 'energy(kWh/hh)', 'PredictedGeneration']].values

    elif frequency == 'daily':
        grouped_df = numeric_columns.groupby([pd.Grouper(key='LCLid'), pd.Grouper(key='time', freq='D')]).sum().reset_index()
        grouped_df = grouped_df.groupby(['time']).agg({'energy(kWh/hh)': 'sum', 'PredictedGeneration': 'sum'}).reset_index()
        json_data = grouped_df[['time', 'energy(kWh/hh)', 'PredictedGeneration']].values

    elif frequency == 'hourly':
        test = result_df.sort_values(['time'])
        test = result_df.groupby([pd.Grouper(key='LCLid'), pd.Grouper(key='time', freq='H')]).sum().reset_index()
        test = result_df.groupby(['time']).agg({'energy(kWh/hh)': 'sum', 'PredictedGeneration': 'sum'}).reset_index()
        #group it by timestamp
        json_data = test[['time', 'energy(kWh/hh)', 'PredictedGeneration']].values


    return jsonify(json_data.tolist()), 200
