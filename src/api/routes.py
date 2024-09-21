"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, flash, redirect, session, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200





# CREATING A TOKEN
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first() 
    print(email)
    print(password)
    print(user)
    if user is None:
        print("Email incorrect")
        return jsonify({"msg": "Email  incorrect"}), 401
    if user.password != password:
        print("password incorrect")
        return jsonify({"msg": "password incorrect"}), 401
    print(user)
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    


@api.route("/signup", methods=["POST"])
def handle_signup():

    email = request.json['email']
    password = request.json['password']


    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return ("ERROR: incorrect user or password"), 400
    print(existing_user)
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = User(
        email=email,
        password=password,
        is_active=True
    )
    print((new_user))
    if len(email) > 255:
        return jsonify({"ERROR": "Email exceeds maximum length of 255 characters."}), 400
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully!"}), 201


@api.route('/checkUser', methods=['POST'])
def check_user_exists():
    email = request.json.get('email')

    if not email:
        return jsonify(message="Email is required"), 400

    if email:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify(exists=True, message="Email already exists"), 200

    return jsonify(exists=False), 200