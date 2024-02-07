#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jan 30 10:47:51 2024

@author: yuktamehta
"""

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

root = ""
models=""
dataset="../Dataset/meter/"
figures_output="../output_graphs"
table_output="../output_graphs"

@app.route('/api/route', methods=['GET'])
def local_lambda_handler():

    
    df_half_hour_data = pd.read_csv(os.path.join(dataset,'block_0.csv'))
    df_half_hour_data_unique_meter = df_half_hour_data['LCLid'].unique()
    meter_list = df_half_hour_data_unique_meter.tolist()
    oldest_date = df_half_hour_data['tstp'].min()
    latest_date = df_half_hour_data['tstp'].max()
    print(latest_date)     
    print(oldest_date)     
    print("format me")



    #latest_date = datetime.strptime(latest_date, "%Y-%m-%d %H:%M:%S.%f")
    latest_date = latest_date.split()[0]
    #oldest_date = datetime.strptime(oldest_date, "%Y-%m-%d %H:%M:%S.%f")
    oldest_date = oldest_date.split()[0]



    print()
    
    print(latest_date)
    print(oldest_date)
     
    print("I am here")

    #latest_date ="2014-02-28"
    #oldest_date ="2011-12-28"
    
    response = {
        'meter_list' :meter_list,
        'message': 'Python function executed successfully',
        'startDate': oldest_date,
        'endDate': latest_date,
        #'frequency': frequency,
    }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
