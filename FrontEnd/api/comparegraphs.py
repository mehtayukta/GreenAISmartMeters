import numpy as np
import pandas as pd
import datetime
from datetime import datetime
import os
from api import app
from flask import Flask, request, jsonify

root = ""
models = ""
dataset = "../Dataset/meter/"
figures_output = "../../public/output_graphs/"
table_output = "../../public/output_graphs/"

@app.route('/api/comparegraphs', methods=['POST'])
def comparegraphs():
    data = request.json
    start_date = data.get('startDate')
    start_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Format the datetime object as a string with the desired format
    start_date = start_date.strftime("%Y-%m-%d")
    #print(start_date)
    #start_date = "2013-01-15"
    end_date = data.get('endDate')
    end_date = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Format the datetime object as a string with the desired format
    end_date = end_date.strftime("%Y-%m-%d")
    #print(end_date)
    #end_date = "2013-3-15"
    
    #device_list = ['MAC004247', 'MAC004319']
    device_list= data.get('selectedDevices')
    #frequency = "monthly"
    frequency = data.get('frequency')
    #print(device_list)
    #print(start_date)
    #print(end_date)
    column = "energy(kWh/hh)"

    df_combined =pd.read_csv(os.path.join(dataset,"df_combined.csv"))
    df_combined['time'] = pd.to_datetime(df_combined['time'])

    filtered_df = df_combined[df_combined['LCLid'].isin(device_list)]
    filtered_df = filtered_df[(filtered_df['time'] >= start_date) & (filtered_df['time'] <= end_date)]
    top_5_max_rows = filtered_df.nlargest(5, column)
    freq_mapping = {'daily': 'D', 'weekly': 'W', 'monthly': 'M'}
    result_df = filtered_df.groupby(["LCLid", 'time']).agg({'energy(kWh/hh)': 'mean'}).reset_index()
    result_df = result_df.groupby(["LCLid", pd.Grouper(key='time', freq=freq_mapping[frequency])])['energy(kWh/hh)'].mean()
    result_df= result_df.reset_index()
    numeric_columns = filtered_df[[column,"time"]]
    freq_mapping = {'daily': 'D', 'weekly': 'W', 'monthly': 'M'}
    numeric_columns = filtered_df[[column, "time"]]
    if frequency=="monthly":
        result_df['time'] = result_df['time'].dt.strftime('%b-%Y')
        grouped_df = numeric_columns.groupby(pd.Grouper(key='time', freq=freq_mapping[frequency])).mean().reset_index() # Average Trend
        grouped_df['time'] = grouped_df['time'].dt.strftime('%b-%Y')
        #print(grouped_df)
        result_df['time'] = pd.to_datetime(result_df['time'], format='%b-%Y')
        result_df = result_df.sort_values(by='time', ascending=True)
        result_df['time'] = result_df['time'].dt.strftime('%b-%Y')
        #print(result_df)
        result_df =result_df.astype(str)

        #result_df = result_df.values ### Change for daily and montly 
        json_data = result_df.values
        max_usage= grouped_df[column].max()
        
    elif frequency == "weekly":
        
        result_df['time'] = pd.to_datetime(result_df['time'])
        def calculate_week_number(date):
            return (date.day - 1) // 7 + 1
        
        grouped_df = numeric_columns.groupby(pd.Grouper(key='time', freq=freq_mapping[frequency])).mean().reset_index()
        max_usage= grouped_df[column].max()
        
        result_df['week'] = result_df['time'].apply(calculate_week_number)
        result_df['month_year'] = result_df['time'].dt.strftime('%b-%Y')
        # Group by "LCLid", "week", and "month_year", calculating the mean
        # Convert 'week' column to integer
        result_df['week'] = result_df['week'].astype(int)
        result_df['month_year'] = pd.to_datetime(result_df['month_year'], format='%b-%Y')
        result_df = result_df.sort_values(['week', 'month_year'])
        result_df['month_year'] = result_df['month_year'].dt.strftime('%b-%Y')
        result_df['time'] = result_df['month_year'].astype(str)+"- Week "+result_df['week'].astype(str)
        result_df= result_df[['LCLid','time','energy(kWh/hh)']]
        #print(result_df)
        result_df = result_df.astype(str)
        json_data = result_df.values

    elif frequency == "daily":
            print(result_df)
            result_df['time'] = pd.to_datetime(result_df['time'])
            result_df = result_df.sort_values(['time'])

            result_df = result_df.astype(str)
            json_data = result_df.values


    return jsonify(json_data.tolist()), 200