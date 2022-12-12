from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
import requests

app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/") #root directory
def hello():
    return jsonify({'text':'Hello World!'})


class Sneaker_Name(Resource):
    def get(self, shoe_name):
        print("Shoe Name:" + shoe_name)
        url = "https://the-sneaker-database.p.rapidapi.com/sneakers"

        querystring = {"limit":"10","name":shoe_name}

        headers = {
	        "X-RapidAPI-Key": "insert key here",
	        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        return response.json()
               

api.add_resource(Sneaker_Name, '/sneakers/<shoe_name>') #route 4


if __name__ == '__main__':
   app.run(port=5002)