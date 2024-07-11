import numpy as np
import pandas as pd
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


@app.route('/api/predictionshortage', methods=['POST'])

def predictionshortage():
    data = request.json
    try:
        start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%fZ")
        end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%fZ")
    except TypeError:
        return jsonify({'error': 'Invalid or missing date format'}), 400

    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb+srv://guest_admin:greencloud@cluster0.0lsxams.mongodb.net/GreenCloud")  # Change the connection string as per your MongoDB setup
    #client = pymongo.MongoClient("your_connection_string")  # Use environment variables or secure methods to store credentials
    db = client["GreenCloud"]
    collection = db["shortage"]
    shortage = collection.find()

    mongodbdata = []
    for document in shortage:
        document.pop('_id', None)  # Remove the '_id' field
        mongodbdata.append({
            'Date_Timestamp': document['Date_Timestamp'],
            'Predicted_Shortage': document['Predicted_Shortage'],
            'Shortage_Status': document['Shortage_Status'],
            'Action': document['Action'],
            'Shortage_Severity': document['Shortage_Severity'],
            'Recommendation': document['Recommendation']
        })

    df_combined = pd.DataFrame(mongodbdata)
    df_combined['Date_Timestamp'] = pd.to_datetime(df_combined['Date_Timestamp'])
    filtered_df = df_combined[(df_combined['Date_Timestamp'] >= start_date) & (df_combined['Date_Timestamp'] <= end_date)]
    result_df = filtered_df.reset_index(drop=True)
    # Convert Date_Timestamp to datetime
    result_df['Date_Timestamp'] = pd.to_datetime(result_df['Date_Timestamp'])

    # Sort DataFrame by Date_Timestamp
    result_df = result_df.sort_values(by='Date_Timestamp')

   
    #print(result_df)
    
    # Converting DataFrame to JSON
    json_data = result_df.to_dict(orient='records')  # This creates a list of dictionaries
    return jsonify(json_data), 200

# def predictionshortage():
#     data = request.json
#     start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
#     end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")

#     # Connect to MongoDB
#     client = pymongo.MongoClient("mongodb+srv://guest_admin:greencloud@cluster0.0lsxams.mongodb.net/GreenCloud")  # Change the connection string as per your MongoDB setup
#     db = client["GreenCloud"]
#     collection = db["shortage"]
#     shortage = collection.find()

#     mongodbdata = []
#     for document in shortage:
#         document.pop('_id', None)  # Remove the '_id' field
#         mongodbdata.append({
#             'Date_Timestamp': document['Date_Timestamp'],
#             'Predicted_Shortage': document['Predicted_Shortage'],
#             'Shortage_Status': document['Shortage_Status'],
#             'Action': document['Action'],
#             'Shortage_Severity': document['Shortage_Severity'],
#             'Recommendation': document['Recommendation']
#         })
#     df_combined = pd.DataFrame(mongodbdata)

#     data = request.json
#     start_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
#     end_date = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
#     # device_list = data.get('selectedDevices')
#     # frequency = data.get('frequency')
#     # df_combined = pd.read_csv(os.path.join(dataset, 'df_combined1.csv'))
#     df_combined['Date_Timestamp'] = pd.to_datetime(df_combined['Date_Timestamp'])
#     filtered_df = df_combined
#     filtered_df = filtered_df[(filtered_df['Date_Timestamp'] >= start_date) & (filtered_df['Date_Timestamp'] <= end_date)]
#     result_df = filtered_df.reset_index()
#     print(result_df)
#     json_data = result_df.values

#     return jsonify(json_data.tolist()), 200







