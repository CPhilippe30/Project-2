from flask import Flask, jsonify, render_template
from dotenv import load_dotenv
from os import environ
from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo
import json


load_dotenv()



app = Flask(__name__)
app.config['MONGO_URI'] = environ.get('MONGODB_URI')
##app.config["MONGO_URI"] = "mongodb://localhost:27017/nflduidb"


# database setup
mongo = PyMongo(app)


nflduidb = mongo.db.nflduidb
nflduidb.drop()
with open('data/nfl-dui.json') as f:
    data = json.load(f)
    for row in data:
        nflduidb.insert_one(row)

