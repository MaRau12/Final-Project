from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route('/posts_by_user_id', methods=['GET'])
def get_all_posts_by_user_id():
    user_id_check = 1
    posts = Post.query.filter_by(user_id=user_id_check)
    print('@@@@@@@@@@@@')
    print([post.serialize() for post in posts])
    return jsonify({"posts": [post.serialize() for post in posts]}), 200