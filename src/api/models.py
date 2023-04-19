from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(80), unique=False, nullable=True)
    age = db.Column(db.Integer(), unique=False, nullable=True)
    country = db.Column(db.String(20), unique=False, nullable=True)
    city = db.Column(db.String(20), unique=False, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    admin = db.Column(db.Boolean(), unique=False, nullable=False)
    posts = db.relationship('Post', backref='user')

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "full_name": self.full_name,
            "age": self.age,
            "country": self.country,
            "city": self.city,
            "description": self.description,
            "admin": self.admin
        }

transports = db.Table('post_transport',
    db.Column('transport_id', db.Integer, db.ForeignKey('transport.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    tittle = db.Column(db.String(40), unique=True, nullable=False)
    trip_duration = db.Column(db.Integer(), unique=False, nullable=False)
    price = db.Column(db.Integer(), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    from_location = db.Column(db.String(20), unique=False, nullable=False)
    to_location = db.Column(db.String(20), unique=False, nullable=False)
    transports = db.relationship('Transport', secondary = transports, backref=db.backref('post', lazy = True))
    comments = db.relationship('Comment', backref='post')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tittle": self.tittle,
            "trip_duration": self.trip_duration,
            "price": self.price,
            "description": self.description,
            "from_location": self.from_location,
            "to_location": self.to_location,
            "transport": self.transport,
            "comments": self.comments
        }

class Transport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer(), db.ForeignKey('post.id'), nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=False)
    latitude = db.Column(db.Float(), unique=False, nullable=True)
    longitude = db.Column(db.Float(), unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "country_id": self.country_id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer(), db.ForeignKey('post.id'), nullable=False)
    commenting_user_id = db.Column(db.Integer(), unique=True, nullable=False)
    date = db.Column(db.DateTime(), unique=False, nullable=False)
    comment = db.Column(db.String(), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "commenting_user_id": self.commenting_user_id,
            "date": self.date,
            "comment": self.comment
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer(), db.ForeignKey('post.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
        }