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

@app.route('/api/comparegraphssolar', methods=['POST'])
def comparegraphssolar():
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
            'hour_minute': document['hour_minute']
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

    df_combined['tstp'] = pd.to_datetime(df_combined['tstp'])
    df_combined['time'] = df_combined['tstp']
    # df_combined['time'] = pd.to_datetime(df_combined['time'])
    filtered_df = df_combined[df_combined['LCLid'].isin(device_list)]
    filtered_df = filtered_df[(filtered_df['time'] >= start_date) & (filtered_df['time'] <= end_date)]
    top_5_max_rows = filtered_df.nlargest(5, column)
    freq_mapping = {'hourly': 'H', 'daily': 'D', 'weekly': 'W'}
    result_df = filtered_df.groupby(["LCLid", 'time']).agg({'energy(kWh/hh)': 'sum'}).reset_index()
    result_df = result_df.groupby(["LCLid", pd.Grouper(key='time', freq=freq_mapping[frequency])])['energy(kWh/hh)'].sum()
    result_df= result_df.reset_index()
    numeric_columns = filtered_df[["LCLid", column, "time"]]
        
    if frequency == "weekly":
        
        result_df['time'] = pd.to_datetime(result_df['time'])
        def calculate_week_number(date):
            return (date.day - 1) // 7 + 1
        
        grouped_df = numeric_columns.groupby(["LCLid", pd.Grouper(key='time', freq=freq_mapping[frequency])]).sum().reset_index()
        max_usage= grouped_df[column].max()

        result_df['week'] = result_df['time'].apply(calculate_week_number)
        result_df['month_year'] = result_df['time'].dt.strftime('%b-%Y')
        # Group by "LCLid", "week", and "month_year", calculating the mean
        # Convert 'week' column to integer
        result_df['week'] = result_df.groupby(['month_year'])['time'].rank("dense")
        result_df['month_year'] = pd.to_datetime(result_df['month_year'], format='%b-%Y')
        result_df = result_df.sort_values(['month_year', 'week'])
        result_df['month_year'] = result_df['month_year'].dt.strftime('%b-%Y')
        result_df['time'] = result_df['month_year'].astype(str)+"- Week "+result_df['week'].astype(str)
        result_df= result_df[['LCLid','time','energy(kWh/hh)']]

        result_df = result_df.astype(str)
        json_data = result_df.values

    elif frequency == "daily":
        result_df['time'] = pd.to_datetime(result_df['time'])
        result_df = result_df.sort_values(['time'])

        result_df = result_df.astype(str)
        json_data = result_df.values

    elif frequency == "hourly":
        result_df = result_df.sort_values(['time'])
        json_data = result_df.values
         
    return jsonify(json_data.tolist()), 200

