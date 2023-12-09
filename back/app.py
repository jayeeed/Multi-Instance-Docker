from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['MONGO_URI'] = 'mongodb+srv://xy3d:XgB8JVGTuWGd50kp@cluster0.20iimjx.mongodb.net/crud'
mongo = PyMongo(app)

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = mongo.db.tasks.find()
        result = []
        for task in tasks:
            result.append({'_id': str(task['_id']), 'title': task['title']})
        return jsonify(result)
    elif request.method == 'POST':
        data = request.json
        title = data.get('title', '')
        if title:
            task_id = mongo.db.tasks.insert_one({'title': title}).inserted_id
            return jsonify({'_id': str(task_id), 'title': title})
        else:
            return jsonify({'error': 'Title is required'}), 400

@app.route('/tasks/<task_id>', methods=['GET', 'PUT', 'DELETE'])
def task(task_id):
    if request.method == 'GET':
        task = mongo.db.tasks.find_one({'_id': ObjectId(task_id)})
        if task:
            return jsonify({'_id': str(task['_id']), 'title': task['title']})
        else:
            return jsonify({'error': 'Task not found'}), 404
    elif request.method == 'PUT':
        data = request.json
        title = data.get('title', '')
        if title:
            mongo.db.tasks.update_one({'_id': ObjectId(task_id)}, {'$set': {'title': title}})
            return jsonify({'_id': task_id, 'title': title})
        else:
            return jsonify({'error': 'Title is required'}), 400
    elif request.method == 'DELETE':
        result = mongo.db.tasks.delete_one({'_id': ObjectId(task_id)})
        if result.deleted_count == 1:
            return jsonify({'message': 'Task deleted successfully'})
        else:
            return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
