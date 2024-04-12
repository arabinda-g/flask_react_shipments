from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Shipment(db.Model):
    __tablename__ = "shipments"

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey("files.id"), nullable=True)
    region = db.Column(db.Text)
    country = db.Column(db.Text)
    item_type = db.Column(db.Text)
    fiscal_year = db.Column(db.Integer)
    sales_channel = db.Column(db.String(100))
    order_priority = db.Column(db.String(10))
    order_date = db.Column(db.Date)
    order_id = db.Column(db.String(50), unique=True)
    ship_date = db.Column(db.Date)
    units_sold = db.Column(db.Integer)
    unit_price = db.Column(db.Float)
    unit_cost = db.Column(db.Float)
    total_revenue = db.Column(db.Float)
    total_cost = db.Column(db.Float)
    total_profit = db.Column(db.Float)
    email = db.Column(db.String(255))


class File(db.Model):
    __tablename__ = "files"

    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.Text)
