from flask import Flask, render_template, request, url_for, jsonify
from backend.generate_text import generate_random_text 
import pprint

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
  return render_template("index.html")

@app.route("/get_random_text", methods=["GET", "POST"])
def grab_text():
  word_count = request.json["length"]
  generated_text = generate_random_text(word_count)

  return jsonify({"text": " ".join(generated_text)})

app.run(debug=True, host="0.0.0.0", port=8080)