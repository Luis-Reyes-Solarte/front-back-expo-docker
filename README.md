# 🐳 Proyecto de Ejemplo con Docker

Este proyecto demuestra cómo empaquetar y ejecutar una aplicación utilizando **Docker**. Incluye una configuración automatizada basada en un `Dockerfile` para garantizar que el entorno de desarrollo y producción sea exactamente el mismo.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

1. Docker Desktop: [Docker Desktop](https://docker.com) (disponible para Windows, macOS y Linux)
2. Un cliente Git para clonar el repositorio.

---

## 🚀 Instrucciones de Uso

Sigue estos pasos para compilar la imagen y poner en marcha el contenedor.

### 1. Clonar el repositorio

```bash
git clone https://github.com
cd tu-repositorio
```

### 2. Construir la imagen de Docker

Utiliza el comando `docker build` para crear la imagen a partir del `Dockerfile`. No olvides el punto (`.`) al final, que indica el contexto de construcción actual:

```bash
docker build -t mi-aplicacion-docker:latest .
```

### 3. Ejecutar el contenedor

Una vez creada la imagen, inicia el contenedor asociando los puertos necesarios (por ejemplo, mapeando el puerto interno `8080` del contenedor al puerto `8080` de tu máquina local):

```bash
docker run -d -p 8080:8080 --name contenedor-app mi-aplicacion-docker:latest
```

1. **`-d`**: Ejecuta el contenedor en segundo plano (modo detached).
2. **`-p 8080:8080`**: Mapea el puerto del host al puerto del contenedor.
3. **`--name`**: Asigna un nombre amigable al contenedor para identificarlo fácilmente.

---

## 🔍 Comandos Útiles de Verificación

Si necesitas revisar el estado del contenedor, puedes usar estos comandos básicos de la [Documentación Oficial de Docker](https://docker.com):

1. **Ver contenedores activos:**

    ```bash
    docker ps
    ```

2. **Ver los logs de la aplicación:**

    ```bash
    docker logs -f contenedor-app
    ```

3. **Detener el contenedor:**

    ```bash
    docker stop contenedor-app
    ```

4. **Eliminar el contenedor:**

    ```bash
    docker rm contenedor-app
    ```

---

## 🛠️ Estructura del Dockerfile

El archivo `Dockerfile` incluido en este repositorio realiza las siguientes acciones:

1. **`FROM`**: Define la imagen base ligera optimizada para el lenguaje del proyecto.
2. **`WORKDIR`**: Establece el directorio de trabajo dentro del contenedor.
3. **`COPY` / `RUN`**: Copia los archivos de dependencias e instala las librerías necesarias sin almacenar caché.
4. **`EXPOSE`**: Informa el puerto en el que la aplicación escucha peticiones.
5. **`CMD`**: Define el comando por defecto que arranca el servidor o script principal.
