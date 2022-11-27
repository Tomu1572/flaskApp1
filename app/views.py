from app import app
 
@app.route('/')
def home():
    return "Tomu says 'hello world!'"
