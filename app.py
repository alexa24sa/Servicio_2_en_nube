from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)  # Habilita CORS para todas las rutas

# Base de datos simulada
productos = []

# Ruta para servir el index.html
@app.route('/')
def inicio():
    return send_from_directory('.', 'index.html')

# Ruta API de bienvenida
@app.route('/api')
def api_inicio():
    return jsonify({"mensaje": "Microservicio de Productos API"}), 200

# Obtener todos los productos (GET)
@app.route('/productos', methods=['GET'])
def obtener_productos():
    return jsonify(productos), 200

# Agregar un nuevo producto (POST)
@app.route('/productos', methods=['POST'])
def agregar_producto():
    nuevo_producto = request.get_json()
    productos.append(nuevo_producto)
    return jsonify({"mensaje": "Producto agregado"}), 201

# Actualizar un producto (PUT)
@app.route('/productos/<int:id>', methods=['PUT'])
def actualizar_producto(id):
    for producto in productos:
        if producto['id'] == id:
            datos = request.get_json()
            producto.update(datos)
            return jsonify({"mensaje": "Producto actualizado"}), 200
    return jsonify({"error": "Producto no encontrado"}), 404

# Eliminar un producto (DELETE)
@app.route('/productos/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    global productos
    productos = [producto for producto in productos if producto['id'] != id]
    return jsonify({"mensaje": "Producto eliminado"}), 200

# Ejecutar el microservicio
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
