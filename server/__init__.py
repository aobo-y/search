import os
from flask import Flask

def create_app():
    app = Flask(__name__)

    from . import search_api


    app.register_blueprint(search_api.bp)

    return app
