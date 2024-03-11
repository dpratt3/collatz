from flask import Flask, send_from_directory, jsonify
from scripts.collatz import collatz

app = Flask(__name__)

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
@app.route('/collatz/<int:number>')
def calculate_collatz(number):
    sequence = collatz(number)
    return jsonify(sequence)

if __name__ == '__main__':
    app.run(debug=True)
