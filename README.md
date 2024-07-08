# Installation step for the project:

## Navigate to Frontend directory from the terminal
The project assumes that nodejs is already installed.
- Step 1: Open the terminal in the VSCode type the following commands to install the node modules:
   - npm install / npm install --force
- Step 2: npm start ( If you get any error of missing modules the modules can be installed by npm install module_name)
  


## In the second step open the terminal and navigate to Backend Folder:
- Step 3: npm start

## In the third terminal start the flask application:
- Step 4 : Setup the flask enviroment by following commands:
   - Create the api folder in source directory
   - cd Frontend/scr/api
   - python -m venv venv (creating the virtual environment)
   - for mac : .venv/bin/activate OR source venv/bin/activate
   - pip install Flask ( and other required modules like pandas, numpy, etc.)
   - pip install python-dotenv

- Step 5: Create in the API folder create a file .flaskenv and write
  
      FLASK_APP=api.py
  
      FLASK_DEBUG=1

- Step 7: flask run ( Note you might need to install python libraries if not already installed)


## Setup MongoDB Compass:
 Install MongoDB Compass and put the connection link of UI

# GreenAISmartMeters
Smart Meters for Green AI

Date Jan 28 2024
   - Dataset:
        - Used the data from Kaggle 
        - Weather Data:https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london?select=weather_daily_darksky.csv
        - Load Data: https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london/data?select=halfhourly_dataset. block_0.csv file
   - Backend:
        - Python Modelling: 
        - Created the Python files for feature engineering and data visualization.
        - Tested data with Linear Regression and LSTM ( Under process)
    - Flask App:
        - Setup the flask environment from Visual Studio, and created the Proxy and API to connect the Python to React.
        - Fetched the data from Flask and created dynamic loading in Frontend
   - Frontend:
        - Dynamic Loading of dates and meter lists available to monitor from the dataset are loaded in a dropdown with multi-select options.
        - Monthly, weekly, and daily data trends can be analyzed using the Dashboard on an average and comparison between the meters individually monitoring.

Date Feb 5 2024
   -  I have updated the react packages and rewrote a part of the code to make it more efficient.
   -  To avoid confusion, I have fixed the part for IoT and Meter Display in order to make it more clear.
   -  In order to keep the frontend simple, we have limited the graphs. 
   -  The frequency dropdown box has been added so that the frequency can be selected easily.
   - Graphs are dynamically loaded based on your selection and are loaded in real-time.

    The remaining part is AI integration and some CSS.

Date Feb 7 2024 
   - Completed the Frontend Part of CSS


