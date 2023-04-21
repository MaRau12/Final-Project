from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/user', methods=['POST'])
def create_user():
    body = request.json
    if body["user_name"] is not None and body["email"] is not None and body["password"] is not None:
        user = User(
            user_name = body["user_name"],
            email = body["email"],
            password = body["password"],
            full_name = body["full_name"],
            age = body["age"],
            country = body["country"],
            city = body["city"],
            description = body["description"]
        )
        db.session.add(user);
        db.session.commit();
        return jsonify({"response": "User created"}), 200
    else:
        return jsonify({"error": "Missing user details"}), 400

@api.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route('/posts', methods=['POST'])
def create_new_post():
    user_id_check = 1
    body = request.json
    post = Post(
        user_id = user_id_check,
        tittle = body["tittle"],
        trip_duration = body["trip_duration"],
        price = body["price"],
        description = body["description"],
        from_location = body["from_location"],
        to_location = body["to_location"],
        transports = body["transports"],
    )
    db.session.add(post);
    db.session.commit();
    return jsonify({"response": "Post created"}), 200

@api.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    user_id_check = 1
    post = Post.query.get(post_id)
    if post.user_id == user_id_check:
        db.session.delete(post);
        db.session.commit();
        return jsonify({"response": "Post deleted"}), 200
    else:
        return jsonify({"response": "You don't have permission"}), 400

@api.route('/posts', methods=['PUT'])
def edit_post():
    user_id_check = 1
    body = request.json
    post = Post.query.get(body["id"])
    if post.user_id == user_id_check:
        post.tittle = body["tittle"],
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

@api.route('/posts_by_user_id', methods=['GET'])
def get_all_posts_by_user_id():
    user_id_check = 1
    user_posts = Post.query.filter_by(user_id=user_id_check)
    return jsonify({"posts": [post.serialize() for post in user_posts]}), 200