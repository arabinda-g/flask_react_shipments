from flask import Blueprint, request, jsonify, current_app
from .models import db, Shipment, File
import os
import pandas as pd
import uuid

api = Blueprint("api", __name__)


@api.route("/upload", methods=["POST"])
def file_upload():
    file = request.files["file"]
    if file:
        # Generate a random file name
        file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], str(uuid.uuid4()))
        file.save(file_path)

        # Store the path in the database
        file = File(file_path=file_path)
        db.session.add(file)
        db.session.commit()

        # Get the insert id
        file_id = file.id

        # Load into DataFrame
        data = pd.read_csv(file_path)

        # Convert date fields
        data["order_date"] = pd.to_datetime(data["Order Date"], format="%m/%d/%y")
        data["ship_date"] = pd.to_datetime(data["Ship Date"], format="%m/%d/%y")

        # Store in database
        for _, row in data.iterrows():
            shipment = Shipment(
                file_id=file_id,
                order_id=row["Order ID"],
                region=row["Region"],
                country=row["Country"],
                item_type=row["Item Type"],
                fiscal_year=row["Fiscal Year"],
                sales_channel=row["Sales Channel"],
                order_priority=row["Order Priority"],
                order_date=row["order_date"],
                ship_date=row["ship_date"],
                units_sold=row["Units Sold"],
                unit_price=row["Unit Price"],
                unit_cost=row["Unit Cost"],
                total_revenue=row["Total Revenue"],
                total_cost=row["Total Cost"],
                total_profit=row["Total Profit"],
                email=row["Email"],
            )
            db.session.add(shipment)
            db.session.commit()

        return jsonify({"message": "Success", "file_id": file_id})
    return jsonify({"error": "Failed to upload file"}), 400


@api.route("/data/<file_id>", methods=["GET"])
def get_data(file_id):
    file = File.query.get(file_id)
    if file:
        shipments = Shipment.query.filter_by(file_id=file_id).order_by(Shipment.id).all()
        data = []
        for shipment in shipments:
            data.append(
                {
                    "id": shipment.id,
                    "file_id": shipment.file_id,
                    "region": shipment.region,
                    "country": shipment.country,
                    "item_type": shipment.item_type,
                    "fiscal_year": shipment.fiscal_year,
                    "sales_channel": shipment.sales_channel,
                    "order_priority": shipment.order_priority,
                    "order_date": shipment.order_date.strftime("%Y-%m-%d"),
                    "order_id": shipment.order_id,
                    "ship_date": shipment.ship_date.strftime("%Y-%m-%d"),
                    "units_sold": shipment.units_sold,
                    "unit_price": shipment.unit_price,
                    "unit_cost": shipment.unit_cost,
                    "total_revenue": shipment.total_revenue,
                    "total_cost": shipment.total_cost,
                    "total_profit": shipment.total_profit,
                    "email": shipment.email,
                }
            )
        return jsonify(data)
    return jsonify({"error": "File not found"}), 404

@api.route('/update-data', methods=['POST'])
def update_data():
    data = request.json
    shipment = Shipment.query.filter_by(id=data['id']).first()
    if not shipment:
        return jsonify({'error': 'Data not found'}), 404

    for key, value in data.items():
        setattr(shipment, key, value)
    
    db.session.commit()
    return jsonify({'message': 'Data updated successfully'}), 200

@api.route('/create-data', methods=['POST'])
def create_data():
    data = request.json
    new_shipment = Shipment(**data)
    db.session.add(new_shipment)
    db.session.commit()
    return jsonify({
        'id': new_shipment.id,
        'file_id': new_shipment.file_id,
        'region': new_shipment.region,
        'country': new_shipment.country,
        'item_type': new_shipment.item_type,
        'fiscal_year': new_shipment.fiscal_year,
        'sales_channel': new_shipment.sales_channel,
        'order_priority': new_shipment.order_priority,
        'order_date': new_shipment.order_date.strftime('%Y-%m-%d'),
        'order_id': new_shipment.order_id,
        'ship_date': new_shipment.ship_date.strftime('%Y-%m-%d'),
        'units_sold': new_shipment.units_sold,
        'unit_price': new_shipment.unit_price,
        'unit_cost': new_shipment.unit_cost,
        'total_revenue': new_shipment.total_revenue,
        'total_cost': new_shipment.total_cost,
        'total_profit': new_shipment.total_profit,
        'email': new_shipment.email
    }), 201

@api.route('/delete-data/<int:id>', methods=['DELETE'])
def delete_data(id):
    shipment = Shipment.query.get_or_404(id)
    db.session.delete(shipment)
    db.session.commit()
    return jsonify({'message': 'Data deleted successfully'}), 200