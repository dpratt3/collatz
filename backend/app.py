from flask import Flask, request, send_from_directory, jsonify
from scripts.collatz import collatz
import os
import math

app = Flask(__name__, static_folder='static')

# Serve React static files
@app.route('/')
def index():
    return send_from_directory('../frontend/build', 'index.html')

@app.route('/static/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('../frontend/build/static/js', filename)

@app.route('/static/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('../frontend/build/static/css', filename)

# Your other Flask routes and APIs go here
@app.route('/api/collatz/<int:number>')
def calculate_collatz(number):
    sequence = collatz(number)
    return jsonify(sequence)

@app.route('/api/logarithm', methods=['POST'])
def log_sequence():
    data = request.json
    seq = data.get('seq')
    if not seq:
        return jsonify(error="Sequence parameter 'seq' is required"), 400
    
    log_seq = [math.log(x, 10) for x in seq]
    return jsonify(log_seq)
    
if __name__ == '__main__':
    app.run(debug=True)
