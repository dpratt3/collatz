from flask import Flask, send_from_directory

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

if __name__ == '__main__':
    app.run(debug=True)
