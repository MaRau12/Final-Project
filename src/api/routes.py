from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Transport, Country
from api.utils import generate_sitemap, APIException

# Token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint("api", __name__)


@api.route("/register", methods=["POST"])
def create_user():
    body = request.json
    print(body)
    user_already_exist = User.query.filter_by(email= body["email"]).first()
    if user_already_exist:
        return jsonify({"response": "Email already in use"}), 403
    if body["user_name"] and body["email"] and body["password"]:
        user = User(
            full_name = body ["full_name"],
            user_name = body["user_name"],
            email = body["email"],
            password = body["password"],
            country = body["country"],
            city = body["city"],
            
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"response": "User created"}), 200
    else:
        return jsonify({"error": "Missing user details"}), 403

@api.route("/login", methods=["POST"])
def login_user():
    body = request.json
    user = User.query.filter_by(email= body["email"], password= body["password"]).first()
    if user:
        token = create_access_token(identity=user.id) # Token
        return jsonify({"token": token})
    else:
        return jsonify({"error": "Error with credentials"}), 403

@api.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify({"users": [user.serialize() for user in users]}), 200

@api.route("/posts", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route("/posts", methods=["POST"])
@jwt_required()
def create_new_post():
    user_id_check = get_jwt_identity()
    body = request.json
    transports = []
    for name in body["transports"]:
        transport = Transport.query.filter_by(name = name).first()
        transports.append(transport)
    post = Post(
        user_id = user_id_check,
        title = body["title"],
        trip_duration = body["trip_duration"],
        price = body["price"],
        description = body["description"],
        from_location = body["from_location"],
        to_location = body["to_location"],
        transports = transports,
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({"response": "Post created"}), 200

@api.route("/posts/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    user_id_check = get_jwt_identity()
    post = Post.query.get(post_id)
    if post.user_id == user_id_check:
        db.session.delete(post)
        db.session.commit()
        return jsonify({"response": "Post deleted"}), 200
    else:
        return jsonify({"response": "You don't have permission"}), 400

@api.route("/posts", methods=["PUT"])
@jwt_required()
def edit_post():
    user_id_check = get_jwt_identity()
    body = request.json
    post = Post.query.get(body["id"])
    if post.user_id == user_id_check:
        post.title = body["title"],
        post.trip_duration = body["trip_duration"],
        post.price = body["price"],
        post.description = body["description"],
        post.from_location = body["from_location"],
        post.to_location = body["to_location"],
        post.transports = body["transports"],
        db.session.commit();
        return jsonify({"response": "Post edited"}), 200
    else:
        return jsonify({"response": "Missing fields"}), 400

@api.route("/posts_by_user_id", methods=["GET"])
@jwt_required()
def get_all_posts_by_user_id():
    user_id_check = get_jwt_identity()
    user_posts = Post.query.filter_by(user_id=user_id_check)
    return jsonify({"posts": [post.serialize() for post in user_posts]}), 200

@api.route("/fillcountry", methods=["POST"])
def fill_country():
    body = request.json
    countries = [Country(name = country['name']) for country in body]
    db.session.add_all(countries)
    db.session.commit()
    return 'done'
