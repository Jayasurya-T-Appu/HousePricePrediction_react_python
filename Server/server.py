
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import util

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def index():
    return "<h4>Server Running on port 5000</h4>"

@app.route('/get_location_names', methods=['GET'])
@cross_origin()
def get_location_names():
    response = jsonify({
        "locations": util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Orgin','*')
    return response

@app.route('/predict_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.json['total_sqft'])
    location = request.json['location']
    bhk = int(request.json['bhk'])
    bath = int(request.json['bath'])

    response = jsonify({
        'estimates_price' : util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Orgin','*')
    return response


if __name__ == "__main__":
    util.load_saved_data()
    print("Starting Python Flask Server")
    app.run(debug=True)