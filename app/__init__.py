from flask import Flask
 
app = Flask(__name__, static_folder='static')

app.config['JSON_AS_ASCII'] = False 
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = '522fba4559295af5b81785106665ae3b882cf9983ffb5803'
 
from app import views  # noqa
