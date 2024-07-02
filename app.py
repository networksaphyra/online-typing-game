from flask import Flask, render_template, request, url_for, jsonify
from flask_cors import CORS
from backend.generate_text import generate_random_text 
import pprint

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET", "POST"])
def index():
  return render_template("index.html")

@app.route("/ss", methods=["GET", "POST"])
def grab_text():
  word_count = request.json["length"]
  generated_text = generate_random_text(word_count)

  generated_text = pprint.pformat(generated_text)
  print(generated_text)

  return jsonify({"generated_text": ", ".join(generate_random_text(word_count))})

app.run(debug=True, host="0.0.0.0", port=10001)