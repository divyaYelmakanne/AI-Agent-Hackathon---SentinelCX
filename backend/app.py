from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# ✅ Default route to confirm server is running
@app.route('/')
def home():
    return '✅ Flask backend is running successfully. Use POST /analyze to analyze sentiment.'

# ✅ Sentiment analysis route
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    message = data.get("message", "")
    blob = TextBlob(message)
    polarity = blob.sentiment.polarity

    if polarity > 0.5:
        sentiment = "joy"
    elif polarity > 0:
        sentiment = "delight"
    elif polarity == 0:
        sentiment = "neutral"
    elif polarity > -0.5:
        sentiment = "confusion"
    else:
        sentiment = "anger"

    return jsonify({"sentiment": sentiment, "score": polarity})

if __name__ == '__main__':
    app.run(debug=True)
