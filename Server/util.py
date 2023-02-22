import pickle
import json
import numpy as np


__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    print("working with data", location)
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index > 0:
        x[loc_index] = 1
    return round(__model.predict([x])[0], 2)


def load_saved_data():
    global __data_columns
    global __locations
    global __model

    with open("./Columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
    with open('./banglore_home_price_model', 'rb') as p:
        __model = pickle.load(p)
    print("Data loading")
       


def get_location_names():
    return __locations


if __name__ == '__main__':
  load_saved_data()
