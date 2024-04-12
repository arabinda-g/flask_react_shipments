from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Shipment(db.Model):
    __tablename__ = 'shipments'

    id = db.Column(db.Integer, primary_key=True)
    region = db.Column(db.Text)
    country = db.Column(db.Text)
    item_type = db.Column(db.Text)
    fiscal_year = db.Column(db.Text)
    sales_channel = db.Column(db.Text)
    order_priority = db.Column(db.Text)
    order_date = db.Column(db.Text)
    order_id = db.Column(db.Text)
    ship_date = db.Column(db.Text)
    units_sold = db.Column(db.Text)
    unit_price = db.Column(db.Text)
    unit_cost = db.Column(db.Text)
    total_revenue = db.Column(db.Text)
    total_cost = db.Column(db.Text)
    total_profit = db.Column(db.Text)
    email = db.Column(db.Text)
