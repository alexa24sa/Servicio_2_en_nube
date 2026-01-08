// URL base de la API - cambiar por la URL de tu servicio en producción
const API_URL = window.location.origin;

// Elementos del DOM
const productoForm = document.getElementById('productoForm');
const productosLista = document.getElementById('productosLista');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const notification = document.getElementById('notification');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    productoForm.addEventListener('submit', agregarProducto);
    editForm.addEventListener('submit', actualizarProducto);
    
    // Cerrar modal
    document.querySelector('.close').addEventListener('click', () => {
        editModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    notification.textContent = mensaje;
    notification.className = `notification ${tipo} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Cargar todos los productos
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        
        if (productos.length === 0) {
            productosLista.innerHTML = `
                <div class="empty-state">
                    <h3>📭</h3>
                    <h3>No hay productos</h3>
                    <p>Agrega tu primer producto usando el formulario arriba</p>
                </div>
            `;
            return;
        }
        
        productosLista.innerHTML = productos.map(producto => `
            <div class="producto-card">
                <span class="producto-id">ID: ${producto.id}</span>
                <h3>${producto.nombre}</h3>
                <div class="producto-precio">$${parseFloat(producto.precio).toFixed(2)}</div>
                <p class="producto-descripcion">${producto.descripcion || 'Sin descripción'}</p>
                <div class="producto-actions">
                    <button class="btn btn-warning" onclick="abrirModalEditar(${producto.id})">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">🗑️ Eliminar</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mostrarNotificacion('Error al cargar productos', 'error');
    }
}

// Agregar nuevo producto
async function agregarProducto(e) {
    e.preventDefault();
    
    const nuevoProducto = {
        id: parseInt(document.getElementById('id').value),
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        descripcion: document.getElementById('descripcion').value
    };
    
    try {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });
        
        if (response.ok) {
            mostrarNotificacion('✅ Producto agregado exitosamente');
            productoForm.reset();
            cargarProductos();
        } else {
            mostrarNotificacion('❌ Error al agregar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error de conexión', 'error');
    }
}

// Abrir modal para editar
async function abrirModalEditar(id) {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();
        const producto = productos.find(p => p.id === id);
        
        if (producto) {
            document.getElementById('editId').value = producto.id;
            document.getElementById('editNombre').value = producto.nombre;
            document.getElementById('editPrecio').value = producto.precio;
            document.getElementById('editDescripcion').value = producto.descripcion || '';
            
            editModal.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error al cargar producto', 'error');
    }
}

// Actualizar producto
async function actualizarProducto(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editId').value);
    const productoActualizado = {
        id: id,
        nombre: document.getElementById('editNombre').value,
        precio: parseFloat(document.getElementById('editPrecio').value),
        descripcion: document.getElementById('editDescripcion').value
    };
    
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });
        
        if (response.ok) {
            mostrarNotificacion('✅ Producto actualizado exitosamente');
            editModal.style.display = 'none';
            cargarProductos();
        } else {
            mostrarNotificacion('❌ Error al actualizar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error de conexión', 'error');
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            mostrarNotificacion('✅ Producto eliminado exitosamente');
            cargarProductos();
        } else {
            mostrarNotificacion('❌ Error al eliminar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error de conexión', 'error');
    }
}
