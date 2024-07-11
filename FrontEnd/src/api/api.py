from flask import Flask, request, jsonify


app = Flask(__name__)

import fectingdata

import prediction

import comparegraphs

import last30daysdata


### Solar
import fetchingdatasolar

import predictionsolar

import comparegraphssolar

#### Shortage
import fetchingshortagedata

import shortage