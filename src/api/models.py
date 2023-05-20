from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profile_image_url = db.Column(db.String(255), unique=False, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(80), unique=False, nullable=True)
    age = db.Column(db.Integer(), unique=False, nullable=True)
    country = db.Column(db.String(20), unique=False, nullable=True)
    city = db.Column(db.String(20), unique=False, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    admin = db.Column(db.Boolean(), unique=False, nullable=True)
    posts = db.relationship('Post', backref='user')
    favorites = db.relationship('Favorites', backref='user')
    
    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "profile_image_url": self.profile_image_url,
            "email": self.email,
            "full_name": self.full_name,
            "age": self.age,
            "country": self.country,
            "city": self.city,
            "description": self.description,
            "admin": self.admin,
            "post": [post.serialize_post_bis() for post in self.posts],
            "favorites": [favorite.serialize() for favorite in self.favorites]
        }
    def serialize_user_bis(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "country": self.country
        }

transports = db.Table('post_transport',
    db.Column('transport_id', db.Integer, db.ForeignKey('transport.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

citys = db.Table('post_from_city',
    db.Column('city_id', db.Integer, db.ForeignKey('city.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    post_image_url = db.Column(db.String(255), unique=False, nullable=True)
    title = db.Column(db.String(40), unique=True, nullable=False)
    trip_duration = db.Column(db.Integer(), unique=False, nullable=False)
    price = db.Column(db.Integer(), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=True, nullable=False)
    transports = db.relationship('Transport', secondary = transports, backref=db.backref('post', lazy = True))
    from_location = db.Column(db.Integer(), db.ForeignKey('city.id'), nullable=False)
    from_city = db.relationship('City', foreign_keys=[from_location])
    to_location = db.Column(db.Integer(), db.ForeignKey('city.id'), nullable=False)
    to_city = db.relationship('City', foreign_keys=[to_location])
    comments = db.relationship('Comment', backref='post', cascade="all,delete")
    favorites = db.relationship('Favorites', backref='post', cascade="all,delete")
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_image_url": self.post_image_url,
            "title": self.title,
            "trip_duration": self.trip_duration,
            "price": self.price,
            "description": self.description,
            "transports": [transport.serialize_transport_bis() for transport in self.transports],
            "from_location": self.from_city.serialize(),
            "to_location": self.to_city.serialize(),
            "transports": [transport.serialize_transport_bis() for transport in self.transports],
            "likes": len(self.favorites)
        }

    def serialize_post_bis(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_image_url": self.post_image_url,
            "title": self.title,
            "trip_duration": self.trip_duration,
            "price": self.price,
            "description": self.description,
            "transports": [transport.serialize_transport_bis() for transport in self.transports],
            "from_location": self.from_city.serialize(),
            "to_location": self.to_city.serialize(),
            "transports": [transport.serialize_transport_bis() for transport in self.transports]
        }

class Transport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    icon = db.Column(db.String(135), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon': self.icon
        }

    def serialize_transport_bis(self):
        return {
            "id": self.id,
            "name": self.name,
            "icon": self.icon
        }

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    latitude = db.Column(db.Float(), unique=False, nullable=False)
    longitude = db.Column(db.Float(), unique=False, nullable=False)
    # cities = db.relationship('City', backref='country')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "code": self.code,
            "latitude": self.latitude,
            "longitude": self.longitude,
            # "cities" : [city.serialize_city_bis() for city in self.cities]
        }

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    latitude = db.Column(db.Float(), unique=False, nullable=True)
    longitude = db.Column(db.Float(), unique=False, nullable=True)
    country_name = db.Column(db.String(120), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "country": self.country_name
        }

    def serialize_city_bis(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude
    }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer(), db.ForeignKey('post.id'), nullable=False)
    commenting_user_id = db.Column(db.Integer(), unique=True, nullable=False)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    comment = db.Column(db.String(), unique=True, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'commenting_user_id': self.commenting_user_id,
            'date': self.date,
            'comment': self.comment
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer(), db.ForeignKey('post.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post': Post.query.get(self.post_id).serialize()
        }
        