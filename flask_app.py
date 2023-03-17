from flask import Flask,request,jsonify,render_template
import pandas as pd
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
cors = CORS(app)

@app.route("/",methods=['GET'])
def main_page():
     return render_template("thisorthat.html")


@app.route("/thisorthat",methods=['GET'])
@cross_origin()
def thisorthat():
    if request.method == 'GET':
        email=request.args.get('q')
        print(email)
        if email.lower() == "test@gmail.com":
            df=pd.read_csv("This or That Icebreaker.csv")
            print(os.getcwd())
            return df.to_dict(orient='list')
        else:
            return '{"Choices":[]}'

if __name__ == '__main__':
    app.run(debug=True)