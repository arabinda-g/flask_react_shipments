from flask import Blueprint, request, jsonify,current_app
# from .models import db, ChatSession, Message
import os
import pandas as pd

api = Blueprint('api', __name__)


@api.route('/upload', methods=['POST'])
def file_upload():
    file = request.files['file']
    if file:
        # file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
        file_path = file.filename
        file.save(file_path)
        return jsonify({'message': "Success", "path": file_path})
    return jsonify({'error':'Failed to upload file'}), 400



@api.route('/data/<filename>', methods=['GET'])
def get_data(filename):
    # file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file_path = filename
    if os.path.exists(file_path):
        data = pd.read_csv(file_path)
        return jsonify(data.to_dict(orient='records'))
    return jsonify({'error':'File unavailable'}), 400






