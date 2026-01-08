# 🚀 Guía de Despliegue en Google Cloud Platform

Este proyecto es un microservicio REST API de gestión de productos con interfaz web, listo para desplegarse en Google Cloud Platform usando App Engine.

## 📋 Requisitos Previos

1. **Cuenta de Google Cloud Platform**
   - Crea una cuenta en [Google Cloud](https://cloud.google.com/)
   - Activa la prueba gratuita (300 USD de crédito)

2. **Instalar Google Cloud SDK**
   - Descarga desde: https://cloud.google.com/sdk/docs/install
   - Para Windows: Ejecuta el instalador y sigue las instrucciones
   - Verifica la instalación: `gcloud --version`

3. **Git instalado**
   - Descarga desde: https://git-scm.com/downloads

## 🔧 Configuración Inicial

### 1. Configurar Google Cloud SDK

Abre PowerShell o CMD y ejecuta:

```powershell
# Inicializar gcloud
gcloud init

# Esto te pedirá:
# - Iniciar sesión con tu cuenta de Google
# - Seleccionar o crear un proyecto
# - Configurar región por defecto (recomendado: us-central1)
```

### 2. Crear un nuevo proyecto en GCloud (opcional)

```powershell
# Crear proyecto
gcloud projects create servicio-productos-2026 --name="Servicio Productos"

# Configurar proyecto actual
gcloud config set project servicio-productos-2026

# Habilitar servicios necesarios
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Inicializar App Engine

```powershell
# Crear aplicación App Engine (solo primera vez)
gcloud app create --region=us-central
```

## 📦 Preparar el Repositorio

### 1. Clonar tu repositorio

```powershell
cd C:\Users\vale_\Downloads

# Clonar el repositorio
git clone https://github.com/alexa24sa/Servicio_2_en_nube.git

cd Servicio_2_en_nube
```

### 2. Copiar archivos del proyecto

Copia todos los archivos del proyecto actual al repositorio clonado:

```powershell
# Desde la carpeta del microservicio actual
xcopy "C:\Users\vale_\Downloads\Sistemas Distribuidos\Sistemas Distribuidos\Practica7\microservicio\*" "C:\Users\vale_\Downloads\Servicio_2_en_nube\" /E /I /Y
```

### 3. Subir cambios a GitHub

```powershell
cd C:\Users\vale_\Downloads\Servicio_2_en_nube

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Agregar microservicio con frontend para App Engine"

# Subir a GitHub
git push origin main
```

## 🚀 Desplegar en Google Cloud

### Opción 1: Despliegue con App Engine (Recomendado)

```powershell
cd C:\Users\vale_\Downloads\Servicio_2_en_nube

# Desplegar
gcloud app deploy

# Cuando pregunte, confirma con 'Y'
# El proceso tomará unos minutos
```

### Opción 2: Despliegue con Cloud Run (Alternativa)

```powershell
# Construir imagen Docker
gcloud builds submit --tag gcr.io/[PROJECT-ID]/servicio-productos

# Desplegar en Cloud Run
gcloud run deploy servicio-productos \
  --image gcr.io/[PROJECT-ID]/servicio-productos \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🌐 Acceder a tu Aplicación

Después del despliegue, obtendrás una URL como:
```
https://[PROJECT-ID].uc.r.appspot.com
```

Para abrir la aplicación directamente:

```powershell
gcloud app browse
```

## 📊 Monitorear y Gestionar

### Ver logs en tiempo real
```powershell
gcloud app logs tail -s default
```

### Ver información de la aplicación
```powershell
gcloud app describe
```

### Ver versiones desplegadas
```powershell
gcloud app versions list
```

### Detener la aplicación (para evitar cargos)
```powershell
# Listar versiones
gcloud app versions list

# Detener una versión específica
gcloud app versions stop [VERSION-ID]
```

## 🔒 Configuraciones de Seguridad

### Configurar variables de entorno (opcional)

Edita `app.yaml` y agrega:

```yaml
env_variables:
  SECRET_KEY: "tu-clave-secreta"
  DATABASE_URL: "tu-base-de-datos"
```

## 📝 Estructura del Proyecto

```
Servicio_2_en_nube/
├── app.py                 # Aplicación Flask principal
├── requirements.txt       # Dependencias Python
├── app.yaml              # Configuración App Engine
├── Dockerfile            # Contenedor Docker
├── .gcloudignore        # Archivos ignorados en despliegue
├── .dockerignore        # Archivos ignorados en Docker
├── index.html           # Página principal
├── static/
│   ├── css/
│   │   └── style.css    # Estilos
│   └── js/
│       └── app.js       # Lógica del frontend
└── README.md            # Este archivo
```

## 🧪 Probar Localmente (Opcional)

```powershell
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar localmente
python app.py

# Abrir en navegador: http://localhost:8080
```

## 🛠️ Solución de Problemas

### Error: "app.yaml not found"
- Asegúrate de estar en el directorio correcto con `cd`
- Verifica que el archivo `app.yaml` existe

### Error: "Permission denied"
- Ejecuta: `gcloud auth login`
- Vuelve a intentar

### Error: "Quota exceeded"
- Verifica tu cuota en: https://console.cloud.google.com/iam-admin/quotas
- Considera usar otra región

### La aplicación no carga el frontend
- Verifica que la carpeta `static/` y `index.html` se desplegaron
- Revisa los logs: `gcloud app logs tail -s default`

## 💰 Costos

- **App Engine**: Plan gratuito incluye 28 horas/día de instancia F1
- **Almacenamiento**: 1 GB gratuito
- **Ancho de banda**: 1 GB/día gratuito

Para proyectos pequeños, debería permanecer en el nivel gratuito.

## 📚 Recursos Adicionales

- [Documentación App Engine](https://cloud.google.com/appengine/docs)
- [Documentación Flask](https://flask.palletsprojects.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

## 👥 Autor

Sistemas Distribuidos - Práctica 7
© 2026

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `gcloud app logs tail -s default`
2. Consulta la documentación de Google Cloud
3. Verifica el estado de los servicios: https://status.cloud.google.com/
