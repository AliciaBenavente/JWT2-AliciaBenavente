"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_cors import CORS
from flask import Flask, flash, redirect, session, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import generate_password_hash, check_password_hash

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://refactored-carnival-v6gv6gw5x65j3xggx-3000.app.github.dev"}})
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "FS_4Geeks-2024__BOOTCAMP"  # Change this!
jwt = JWTManager(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response



# # CREATING A TOKEN
# @app.route("/login", methods=["POST"])
# def handle_login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(email=email).first()   
#     print(email)
#     print(password)
#     print(user)
#     if user is None or user.password != password:
#         return jsonify({"msg": "Email or password incorrect"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

# # USING THE TOKEN
# @app.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200
#     # if the return above is not working, try with this:
#     # return jsonify(
#         #     id=current_user.id,
#         #     email=current_user.email
#         # )

# @app.route("/logout", methods=["POST"])
# def handle_logout():
#     # Clear the session
#     session.pop('user_id', None)  # Replace 'user_id' with your session key
#     flash("Successfully logged out")
#     return redirect(url_for('login'))  # Redirect to the login page


# @app.route("/signup", methods=["POST"])
# def handle_signup():

#     body = request.get_json()
#     print(body)
#     existing_user = User.query.filter_by(email=body["email"]).first()
#     if existing_user:
#         return ("ERROR: incorrect user or password")
#     print(existing_user)
#     hashed_password = generate_password_hash(body['password'], method='pbkdf2:sha256')

#     new_user = User(
#         email=body['email'],
#         password=hashed_password,
#         is_active=True
#     )
#     print((new_user))
#     if len(body['email']) > 255:
#         return jsonify({"ERROR": "Email exceeds maximum length of 255 characters."}), 400

#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"message": "User created successfully!"}), 201




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
