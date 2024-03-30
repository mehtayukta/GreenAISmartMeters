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
from flask import Flask, request, jsonify,


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
    top_5_max_rows = filtered_df.nlargest(5, column)
    top_5_max_rows.to_csv(os.path.join(table_output,"top_5.csv"),index= False)
    freq_mapping = {'daily': 'D', 'weekly': 'W', 'monthly': 'M'}
    result_df = filtered_df.groupby(["LCLid", 'time']).agg({'energy(kWh/hh)': 'mean'}).reset_index()
    print(result_df)
    result_df = result_df.groupby(["LCLid", pd.Grouper(key='time', freq=freq_mapping[frequency])])['energy(kWh/hh)'].mean().reset_index()
    

    numeric_columns = filtered_df[[column,"time"]]
    freq_mapping = {'daily': 'D', 'weekly': 'W', 'monthly': 'M'}
    numeric_columns = filtered_df[[column, "time"]]
    grouped_df = numeric_columns.groupby(pd.Grouper(key='time', freq=freq_mapping[frequency])).mean().reset_index()
    print(grouped_df)
    #     max_usage = grouped_df[column].max()
    
   # @after_this_request
    # def plot_graph(response):
    #     def calculate_week_number(date):
    #         return (date.day - 1) // 7 + 1

    #     grouped_df = numeric_columns.groupby(pd.Grouper(key='time', freq=freq_mapping[frequency])).mean().reset_index()
    #     max_usage = grouped_df[column].max()

    #     grouped_df.to_csv(os.path.join(figures_output, "grouped_df.csv"))

    #     # Plotting the line graph for the averaged load
    #     fig = px.line(grouped_df, x='time', y=column, markers=True, line_shape='linear', labels={'time': 'Time', column: f'Average {column}'})
    #     fig.update_layout(title='Average Load Over Time', xaxis_title='Time', yaxis_title=f'Average {column}', plot_bgcolor="whitesmoke", showlegend=True)

    #     fig.write_html(os.path.join(figures_output, 'plot_with_hover_dynamic_pred.html'))
    #     #fig.write_image(os.path.join(figures_output, 'plot_with_hover_dynamic_pred.png'))

    #     return response

    return jsonify("response"), 200