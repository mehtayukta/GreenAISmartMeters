from flask import Flask, request, jsonify


app = Flask(__name__)

import fectingdata

import prediction

import comparegraphs
