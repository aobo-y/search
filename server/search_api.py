from flask import Blueprint, Flask, escape, request, jsonify
from flask_cors import cross_origin
import re
from . import controllers

bp = Blueprint('search_api', __name__)

@bp.route('/v1/search', methods=['GET'])
@cross_origin(origins=['http://localhost:3000', re.compile('https://aobo-y.github.io'), re.compile('http://hcdmg1.cs.virginia.edu.*')], methods=['GET', 'OPTIONS'])
def search():
  query = request.args['q']
  return jsonify(controllers.search(query, 50))


@bp.route('/v1/click', methods=['POST'])
@cross_origin(origins=['http://localhost:3000', re.compile('https?://aobo-y.github.io'), re.compile('http://hcdmg1.cs.virginia.edu.*')], methods=['POST', 'OPTIONS'])
def clicks():
  if request.method == 'OPTIONS':
    return

  body = request.get_json()

  print('clicked:', body)

  return {}
