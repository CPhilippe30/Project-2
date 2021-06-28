from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project2-group-5.db'


# database setup
db = SQLAlchemy(app)

class Arrest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)

@app.route('/')
def index():
    return "NFL Arrests"

@app.route('/api/arrests/postgres')
def arrest_postgres():
    arrests = db.session.query(Arrest)
    data = []

    for arrest in arrests:
        data.append({
            "id": arrest.id,
            "content": arrest.content
        })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)