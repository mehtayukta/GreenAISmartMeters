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


#print("This is the current dir+++++++++++++++++++=",script_directory)

@app.route('/api/prediction', methods=['POST'])
def prediction():
    print("##################################################In Prediction")
    data = request.json
    start_date = data.get('startDate')
    start_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Format the datetime object as a string with the desired format
    start_date = start_date.strftime("%Y-%m-%d")
    print(start_date)
    #start_date = "2013-01-15"
    end_date = data.get('endDate')
    end_date = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S.%fZ")
    # Format the datetime object as a string with the desired format
    end_date = end_date.strftime("%Y-%m-%d")
    print(end_date)
    #end_date = "2013-3-15"
    
    #device_list = ['MAC004247', 'MAC004319']
    device_list= data.get('selectedDevices')
    #frequency = "monthly"
    frequency = data.get('frequency')
    column = "energy(kWh/hh)"
    
# data preparation
    df_combined =pd.read_csv(os.path.join(dataset,'df_combined.csv'))
    filtered_df = df_combined[df_combined['LCLid'].isin(device_list)]
    filtered_df = filtered_df[(filtered_df['time'] >= start_date) & (filtered_df['time'] <= end_date)]
    result_df = filtered_df.groupby(["LCLid", 'time']).agg({'energy(kWh/hh)': 'mean'}).reset_index()
    #print(result_df)
    numeric_columns = result_df[[column,"time"]]
    freq_mapping = {'daily': 'D', 'weekly': 'W', 'monthly': 'M'}
    numeric_columns['time'] = pd.to_datetime(numeric_columns['time'])

    grouped_df = numeric_columns.groupby(pd.Grouper(key='time', freq=freq_mapping[frequency])).mean().reset_index()
   # print("++++++++")
    #print(grouped_df)
    if frequency == "monthly":
        #grouped_df['time']=
        grouped_df['time'] = grouped_df['time'].dt.strftime('%b-%Y')
        grouped_df['time'] = pd.to_datetime(grouped_df['time']).dt.to_period('M')
        grouped_df = grouped_df.sort_values(by='time')
        grouped_df['time'] = grouped_df['time'].dt.strftime('%b-%Y')
        grouped_df = grouped_df.reset_index(drop=True)
        grouped_df =grouped_df.astype(str)

    elif frequency =='weekly':
        def calculate_week_number(date):
             return (date.day - 1) // 7 + 1
        grouped_df['week'] = grouped_df['time'].apply(calculate_week_number)
        grouped_df['month_year'] = grouped_df['time'].dt.strftime('%b-%Y')
        grouped_df['time'] = grouped_df['month_year'].astype(str)+" - Week "+grouped_df['week'].astype(str)
        grouped_df =grouped_df[['time','energy(kWh/hh)']]

    
    elif frequency =='daily':
        grouped_df['time'] = pd.to_datetime(grouped_df['time'])
        grouped_df = grouped_df.sort_values(by='time')
        grouped_df = grouped_df.astype(str)
       # print(grouped_df)


        


    json_data = grouped_df.values
    return jsonify(json_data.tolist()), 200