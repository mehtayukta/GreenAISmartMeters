import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error
import xgboost as xgb
import matplotlib.pyplot as plt
import time

def load_dataset(file_name):
    """
    Load the dataset from the provided file name.
    
    Parameters:
    file_name (str): The name of the CSV file.
    
    Returns:
    pd.DataFrame: Loaded DataFrame.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, file_name)
    return pd.read_csv(file_path)

def calculate_mape(y_true, y_pred):
    """
    Calculate the Mean Absolute Percentage Error (MAPE).
    
    Parameters:
    y_true (array-like): True values.
    y_pred (array-like): Predicted values.
    
    Returns:
    float: MAPE value.
    """
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100

def train_xgboost_model(X_train, y_train):
    """
    Train the XGBoost model.
    
    Parameters:
    X_train (pd.DataFrame): Features for training.
    y_train (pd.Series): Target variable for training.
    
    Returns:
    xgb.XGBRegressor: Trained XGBoost model.
    """
    best_params = {'learning_rate': 0.1, 'max_depth': 5, 'n_estimators': 50}
    xgbr = xgb.XGBRegressor(objective='reg:squarederror', **best_params)
    xgbr.fit(X_train, y_train)
    
    # Print best parameters
    print("Best Parameters:", best_params)
    
    return xgbr

def evaluate_model(model, X_test, y_test, df):
    """
    Evaluate the model using RMSE, MAE, and MAPE.
    
    Parameters:
    model: Trained model.
    X_test (pd.DataFrame): Features for testing.
    y_test (pd.Series): Target variable for testing.
    df (pd.DataFrame): Original DataFrame containing all data.
    """
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    mape = calculate_mape(y_test, y_pred)
    
    print(f"RMSE: {rmse}")
    print(f"MAE: {mae}")
    print(f"MAPE: {mape:.2f}%")
    
    # Add predicted values as a new column in the DataFrame
    df_result = X_test.copy()
    df_result['Predicted_Consumption'] = y_pred
    
    # # Plot actual vs predicted values
    plot_predictions(df_result, df, "Actual vs Predicted values for the test set")

def plot_predictions(df_result, df, title):
    """
    Plot actual vs predicted values on the same axis.
    
    Parameters:
    df_result (pd.DataFrame): DataFrame containing actual and predicted values.
    df (pd.DataFrame): Original DataFrame containing all data.
    title (str): Title of the plot.
    """
    plt.figure(figsize=(20, 6))
    plt.plot(df.index, df['Total_Consumption'], label='Actual')
    plt.plot(df_result.index, df_result['Predicted_Consumption'], label='Predicted')
    plt.legend()
    plt.title(title)
    plt.xlabel("DateTimestamp")
    plt.ylabel("Total Consumption")
    plt.xticks(rotation=45)  # Rotate x-axis labels for better readability
    plt.tight_layout()  # Adjust layout to prevent clipping of labels
    plt.show()


def main():
    start_time = time.time()
    # Load dataset
    df = load_dataset('Transformed_dataset.csv')
    # Prepare data
    X_consumption = df.drop(['Date_Timestamp', 'Total_Consumption','Total_Generation','Consumption_B2','Consumption_B3','Gb(i)', 'Gd(i)', 'Gr(i)', 'Generation_1','Generation_2','Generation_3', 'Cloud_Cover_Category'], axis=1)
    y_consumption = df['Total_Consumption']
    X_train_consumption, X_test_consumption, y_train_consumption, y_test_consumption = train_test_split(X_consumption, y_consumption, test_size=0.042, shuffle=False, random_state=42)
    
    # Train XGBoost model
    best_xgb_model = train_xgboost_model(X_train_consumption, y_train_consumption)
    
    # Evaluate model
    evaluate_model(best_xgb_model, X_test_consumption, y_test_consumption, df)
    
    # Plot actual vs predicted values
    plot_predictions(X_test_consumption, best_xgb_model.predict(X_test_consumption), df, "Actual vs Predicted values for the test set")
    end_time = time.time()  # Record end time
    runtime = end_time - start_time  # Calculate runtime
    print(f"Runtime: {runtime} seconds")

if __name__ == "__main__":
    main()
