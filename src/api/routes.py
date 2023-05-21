from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Transport, Country, City, Favorites, Comment
from api.utils import generate_sitemap, APIException
from sqlalchemy import or_
import cloudinary
import cloudinary.uploader
# Token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json

api = Blueprint("api", __name__)

# ------------ User -------------
@api.route("/register", methods=["POST"])
def create_user():
    body = request.json
    user_already_exist = User.query.filter_by(email= body["email"]).first()
    if user_already_exist:
        return jsonify({"response": "Email already in use"}), 403
    if body["user_name"] and body["email"] and body["password"]:
        user = User(
            full_name = body ["full_name"],
            user_name = body["user_name"],
            email = body["email"],
            profile_image_url = ["profile_image_url "],
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

@api.route("/edituser", methods=["PUT"])
@jwt_required()
def edit_user_data():
    user_id_check = get_jwt_identity()
    body = json.loads(request.form["user_data"])
    user = User.query.filter_by(id = user_id_check).first()
    if body["full_name"] :
        user.full_name = body["full_name"] 
    else:
         user.full_name
    if 'profile_image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['profile_image'])
        # update the user with the given cloudinary image URL
        user.profile_image_url = result['secure_url']  
    if body["user_name"]:
        user.user_name = body["user_name"]
    else: user.user_name 
    if body["email"] :   
        user.email = body["email"]
    else: user.email
    if body["age"] :
        user.age = body["age"] 
    else: user.age    
    if body["country"] : 
        user.country = body["country"]
    else: user.country
    if body["city"] :   
        user.city = body["city"]
    else: 
        user.city
    if body["description"] :   
        user.description = body["description"]
    else:
         user.description
    if body["password"] :
        user.password = body["password"]

    else:
        user.password    
    db.session.commit()
    return jsonify({"response": "User edited"}), 200

@api.route('/current_user', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id_check = get_jwt_identity()
    user = User.query.filter_by(id = user_id_check).first()
    return jsonify(user.serialize()), 200

@api.route("/users/<int:user_id>", methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({ "user": user.serialize_user_bis() }), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify({"users": [user.serialize() for user in users]}), 200

# ------------ Countries & Cities -------------
@api.route("/countries", methods=["GET"])
def get_all_countries():
    countries = Country.query.all()
    return jsonify({"countries": [country.serialize() for country in countries]}), 200

@api.route("/cities", methods=["GET"])
def get_all_cities():
    cities = City.query.all()
    return jsonify({"cities": [city.serialize() for city in cities]}), 200

@api.route("/city", methods=["POST"])
@jwt_required()
def create_new_city():
    body = request.json
    country = Country.query.filter_by(name = body["country"]).first()
    country = Country.query.get(body[country])
    city = City(
        name = body["name"],
        latitude = body["latitude"],
        longitude = body["longitude"],
        country = country,
    )
    db.session.add(city)
    db.session.commit()
    return jsonify({"response": "City added"}), 200

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

# ------------ Transports -------------
@api.route("/transports", methods=["GET"])
def get_all_transports():
    transports = Transport.query.all()
    return jsonify({"data": [transport.serialize() for transport in transports]}), 200

@api.route("/transport_by_name", methods=["GET"])
def get_transport_by_name():
    name = request.args.get('name')
    price = request.args.get('price')
    from_location_search = request.args.get('from_location_search')
    to_location = request.args.get('to_location')
    travel_time = request.args.get('travel_time')   
    queries = [Post.price <= price, or_(Post.from_city.has(name = from_location_search),  Post.to_city.has(name = from_location_search))]
    if name and name != "":
        queries.append(Post.transports.any(Transport.name == name))
    elif travel_time and travel_time != "":
        queries.append(Post.trip_duration <= travel_time)
    posts = Post.query.filter(*queries).all()
    
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

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

# ------------ Posts -------------
@api.route("/posts", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route("/posts", methods=["POST"])
@jwt_required()
def create_new_post():
    user_id_check = get_jwt_identity()
    body = json.loads(request.form["user_data"])
    new_from_city = City(name=body['from_location']['name'], latitude=body['from_location']['latitude'], longitude=body['from_location']['longitude'], country_name=body['from_location']['country'])
    db.session.add(new_from_city)
    db.session.commit()
    new_to_city = City(name=body['to_location']['name'], latitude=body['to_location']['latitude'], longitude=body['to_location']['longitude'], country_name=body['to_location']['country'])
    db.session.add(new_to_city)
    db.session.commit()
    transports = []

    for transport_dict in body["transports"]:
        transport = Transport.query.get(transport_dict["id"])
        transports.append(transport)
    if 'post_image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['post_image'])
        # update the user with the given cloudinary image URL
        post_image_url = result['secure_url']
    else:
        post_image_url = 'https://placehold.co/500x500'

    post = Post(
        user_id = user_id_check,
        title = body["title"],
        post_image_url = post_image_url,
        trip_duration = body["trip_duration"],
        price = body["price"],
        description = body["description"],
        from_location = new_from_city.id,
        to_location = new_to_city.id,
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
    body = json.loads(request.form["user_data"])
    post = Post.query.get(body["id"])
    if post.user_id == user_id_check:
        post.title = body["title"]
        if 'post_image' in request.files:
            # upload file to uploadcare
            result = cloudinary.uploader.upload(request.files['post_image'])
            # update the user with the given cloudinary image URL
            post.post_image_url = result['secure_url']  

        post.trip_duration = body["trip_duration"]
        post.price = body["price"]
        post.description = body["description"]
        post.from_location = body["from_location"]
        post.to_location = body["to_location"]
        post.transports = body["transports"]
        db.session.commit()
        return jsonify({"response": "Post edited"}), 200
    else:
        return jsonify({"response": "Missing fields"}), 400

@api.route("/posts_by_user_id", methods=["GET"])
@jwt_required()
def get_all_posts_by_user_id():
    user_id_check = get_jwt_identity()
    user_posts = Post.query.filter_by(user_id=user_id_check)
    return jsonify({"posts": [post.serialize() for post in user_posts]}), 200

# ------------ Favorites -------------
@api.route("/add-to-favorites/<int:post_id>", methods=["POST"])
@jwt_required()
def add_favorite(post_id):
    user_id_check = get_jwt_identity()
    already_exist_fav = Favorites.query.filter_by(user_id = user_id_check, post_id = post_id).first()
    if already_exist_fav:
        db.session.delete(already_exist_fav)
        db.session.commit()
        return jsonify({"response": "favorites deleted"}), 200
    else:
        favorite = Favorites(
            user_id = user_id_check,
            post_id = post_id,
        )
        db.session.add(favorite)
        db.session.commit()
        if favorite :
            return jsonify({"response": "favorites added"}), 200

    return jsonify({"response": "You don't have permission"}), 400

# ------------ Comments -------------
@api.route("/comments", methods=["POST"])
@jwt_required()
def post_comment():
    if not request.is_json:
        return jsonify({"message": "Invalid request"}), 400

    try:
        # Extract the necessary data from the request
        post_id = request.json.get("post_id")
        commenting_user_id = get_jwt_identity()
        date = request.json.get("date")
        comment_text = request.json.get("comment")

        new_comment = Comment(
            post_id=post_id,
            commenting_user_id=commenting_user_id,
            date=date,
            comment=comment_text
        )

        db.session.add(new_comment)
        db.session.commit()

        return jsonify(new_comment.serialize()), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500
