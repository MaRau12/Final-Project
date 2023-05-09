from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Transport, Country, City
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


@api.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id_check = get_jwt_identity()
    user = User.query.filter_by(id = user_id_check).first()
    return jsonify(user.serialize()), 200
    #print("current",current_user)



@api.route("/users", methods=["GET"])

def get_all_users():
    users = User.query.all()
    return jsonify({"users": [user.serialize() for user in users]}), 200

@api.route("/countries", methods=["GET"])
def get_all_countries():
    countries = Country.query.all()
    return jsonify({"countries": [country.serialize() for country in countries]}), 200

@api.route("/transports", methods=["GET"])
def get_all_transports():
    transports = Transport.query.all()
    return jsonify({"data": [Transport.serialize() for Transport in transports]}), 200

@api.route("/posts", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route("/cities", methods=["GET"])
def get_all_cities():
    cities = City.query.all()
    return jsonify({"cities": [city.serialize() for city in cities]}), 200

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

@api.route("/city", methods=["POST"])
@jwt_required()
def create_new_city():
    print('@@@@@')
    body = request.json
    country = Country.query.filter_by(name = body["country"]).first()
    country = Country.query.get(body[country])
    print(country)
    city = City(
        name = body["name"],
        latitude = body["latitude"],
        longitude = body["longitude"],
        country = country,
    )
    db.session.add(city)
    db.session.commit()
    return jsonify({"response": "City added"}), 200

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
    countries = [
        Country(
            name = country['name'], 
            code = country['code'],
            longitude = country['longitude'], 
            latitude = country['latitude']) 
        for country in body]
    db.session.add_all(countries)
    db.session.commit()
    return 'done'

@api.route("/filltransport", methods=["POST"])
def fill_transport():
    body = request.json
    transports = [
        Transport(name = transport['name'],
        icon = transport['icon'])   
        for transport in body]
    db.session.add_all(transports)
    db.session.commit()
    return 'done'

@api.route("/transport_by_name", methods=["GET"])
def get_transport_by_name():
    name = request.args.get('name')
    price = request.args.get('price')
    from_location_search = request.args.get('from_location_search')
    to_location = request.args.get('to_location')
    posts = Post.query.filter(Post.transports.any(Transport.name == name), Post.price <= price, Post.from_location == from_location_search )
    print("#####")
    print([post.serialize() for post in posts])
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

