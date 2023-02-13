from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from app import db

class BlogEntry(db.Model, SerializerMixin):
    __tablename__ = "blog_entries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(280), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, name, message, email):
        self.name = name
        self.message = message
        self.email = email
        self.date_created = datetime.now()
        self.date_updated = datetime.now()
        
    def update(self, name, message, email):
        self.name = name
        self.message = message
        self.email = email
        self.date_created = datetime.now()
        self.date_updated = datetime.now()

    # def __repr__(self):
    #     return f"BlogEntry(name='{self.name}', message='{self.message}', email='{self.email}', date_created='{self.date_created}', date_updated='{self.date_updated}')"
