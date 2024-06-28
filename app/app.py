from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST", "GET"])
def submit():
    data = request.json
    print(data)
    return jsonify(message="oonga boonga")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
