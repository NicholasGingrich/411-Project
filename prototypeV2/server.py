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


class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]} 



class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)


class Sneaker_Name(Resource):
    def get(self, shoe_name):
        print("Shoe Name:" + shoe_name)
        url = "https://the-sneaker-database.p.rapidapi.com/sneakers"

        querystring = {"limit":"10","name":shoe_name}

        headers = {
	        "X-RapidAPI-Key": "5cdd7f45e5msh8066594c12d1214p16968bjsnd2e6e099f9e7",
	        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        return response.json()
               


api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3
api.add_resource(Sneaker_Name, '/sneakers/<shoe_name>') #route 4


if __name__ == '__main__':
   app.run(port=5002)