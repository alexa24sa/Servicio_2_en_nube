# Pasos para Subir a Google Cloud - Resumen Rápido

## ✅ PASO 1: Instalar Google Cloud SDK
1. Descarga: https://cloud.google.com/sdk/docs/install
2. Instala y reinicia la terminal
3. Verifica: `gcloud --version`

## ✅ PASO 2: Configurar Google Cloud
```powershell
# Iniciar sesión
gcloud init

# Crear proyecto (reemplaza el nombre si quieres)
gcloud projects create servicio-productos-2026

# Configurar proyecto
gcloud config set project servicio-productos-2026

# Habilitar servicios
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Crear App Engine (solo primera vez)
gcloud app create --region=us-central
```

## ✅ PASO 3: Preparar el Repositorio

```powershell
# Ir a tu carpeta de descargas
cd C:\Users\vale_\Downloads

# Clonar el repo de GitHub
git clone https://github.com/alexa24sa/Servicio_2_en_nube.git

# Entrar al repo
cd Servicio_2_en_nube

# Copiar archivos del microservicio al repo
xcopy "C:\Users\vale_\Downloads\Sistemas Distribuidos\Sistemas Distribuidos\Practica7\microservicio\*" . /E /I /Y

# Agregar archivos a git
git add .

# Hacer commit
git commit -m "Agregar microservicio completo con frontend"

# Subir a GitHub
git push origin main
```

## ✅ PASO 4: Desplegar a Google Cloud

```powershell
# Asegúrate de estar en el directorio del proyecto
cd C:\Users\vale_\Downloads\Servicio_2_en_nube

# Desplegar
gcloud app deploy

# Confirma con 'Y' cuando pregunte
```

## ✅ PASO 5: Ver tu Aplicación

```powershell
# Abrir en navegador automáticamente
gcloud app browse

# O ve manualmente a:
# https://servicio-productos-2026.uc.r.appspot.com
```

## 📊 COMANDOS ÚTILES

```powershell
# Ver logs en tiempo real
gcloud app logs tail -s default

# Ver información de la app
gcloud app describe

# Ver versiones
gcloud app versions list

# Detener app (para no gastar créditos)
gcloud app versions stop VERSION-ID
```

## 🚨 SI ALGO FALLA

1. **Error de autenticación**
   ```powershell
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Proyecto no existe**
   ```powershell
   gcloud projects list
   gcloud config set project TU-PROJECT-ID
   ```

3. **App Engine no inicializado**
   ```powershell
   gcloud app create --region=us-central
   ```

4. **Ver errores**
   ```powershell
   gcloud app logs tail -s default
   ```

## 📝 NOTAS IMPORTANTES

- La primera vez puede tardar 5-10 minutos en desplegar
- Google Cloud te da $300 de crédito gratis
- App Engine tiene nivel gratuito suficiente para este proyecto
- Tu URL será: https://[PROJECT-ID].uc.r.appspot.com
- El frontend estará en la raíz (/)
- La API está en /productos

## 🎉 ¡LISTO!

Una vez desplegado, tu aplicación estará disponible en internet con:
- ✅ Frontend completo con interfaz visual
- ✅ API REST funcional
- ✅ Base de datos en memoria
- ✅ Escalabilidad automática
