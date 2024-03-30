
import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score, f1_score
import datetime
from datetime import datetime
import seaborn as sns
import matplotlib.pyplot as plt
import mplcursors
import os
import plotly.express as px
import plotly.io as pio
from api import app
from flask import Flask, request, jsonify
import pymongo

root = ""
models = ""
dataset = "../Dataset/meter/"
figures_output = "../output_graphs"
table_output = "../output_graphs"

# app = Flask(__name__)

@app.route('/api/routesolar', methods=['GET'])
def local_lambda_handler_solar():
    # df_half_hour_data = pd.read_csv(os.path.join(dataset, 'block_1.csv'))  # Change 'your_data_file.csv' to your actual data file name
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
    df_half_hour_data = pd.DataFrame(mongodbdata)

    df_half_hour_data['tstp'] = pd.to_datetime(df_half_hour_data['tstp'])  # Convert 'tstp' column to datetime format
    df_half_hour_data_unique_meter = df_half_hour_data['LCLid'].unique().tolist()
    oldest_date = df_half_hour_data['tstp'].min().strftime('%Y-%m-%d %H:%M:%S')  # Format oldest date
    latest_date = df_half_hour_data['tstp'].max().strftime('%Y-%m-%d %H:%M:%S')  # Format latest date
    
    response = {
        'meter_list': df_half_hour_data_unique_meter,
        'message': 'Python function executed successfully',
        'startDate': oldest_date,
        'endDate': latest_date,
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
