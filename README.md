# GreenAISmartMeters
Smart Meters for Green AI
# GreenAISmartMeters
Smart Meters for Green AI

Date Jan 28 2024
   - Dataset:
        -- Used the data from Kaggle 
        -- Weather Data:https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london?select=weather_daily_darksky.csv
        -- Load Data: https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london/data?select=halfhourly_dataset. block_0.csv file
   - Backend:
        -- Python Modelling: 
        --- Created the Python files for feature engineering and data visualization.
        --- Tested data with Linear Regression and LSTM ( Under process)
    - Flask App:
        -- Setup the flask environment from Visual Studio, and created the Proxy and API to connect the Python to React.
        -- Fetched the data from Flask and created dynamic loading in Frontend
   - Frontend:
        -- Dynamic Loading of dates and meter lists available to monitor from the dataset are loaded in a dropdown with multi-select options.
        -- Monthly, weekly, and daily data trends can be analyzed using the Dashboard on an average and comparison between the meters individually monitoring.

Date Feb 5 2024
   -  I have updated the react packages and rewrote a part of the code to make it more efficient.
   -  To avoid confusion, I have fixed the part for IoT and Meter Display in order to make it more clear.
   -  In order to keep the frontend simple, we have limited the graphs. 
   -  The frequency dropdown box has been added so that the frequency can be selected easily.
   - Graphs are dynamically loaded based on your selection and are loaded in real-time.

    The remaining part is AI integration and some CSS.

Date Feb 7 2024 
   - Completed the Frontend Part of CSS


