# FreelanceHub API

API desarrollada con NestJS para publicar y consultar servicios freelance. Los usuarios autenticados pueden iniciar sesion y publicar servicios, mientras que cualquier visitante puede consultar el catalogo publico.

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- JWT
- Swagger

## Requisitos

- Node.js
- PostgreSQL
- npm

## Instalacion

```bash
npm install
```

Si usas PowerShell en Windows y `npm` da problemas por la politica de ejecucion:

```powershell
npm.cmd install
```

## Variables de entorno

Crea un archivo `.env` basado en `.env.example`.

Ejemplo:

```env
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=freelance-hub

# JWT
JWT_SECRET=freelance-hub_dev_secret_2026
JWT_EXPIRES_IN=1h
```

## Base de datos

Crear la base de datos:

```sql
CREATE DATABASE "freelance-hub";
```

La aplicacion usa `synchronize: true`, por lo que Nest crea las tablas al iniciar.

Si necesitas limpiar las tablas:

```sql
TRUNCATE TABLE services, users RESTART IDENTITY CASCADE;
```

## Usuario de prueba

Inserta un usuario para probar el login:

```sql
INSERT INTO users (email, name, password)
VALUES ('freelancer@demo.com', 'Oscar Pleites', '123456');
```

## Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```

En PowerShell:

```powershell
npm.cmd run start:dev
```

La API quedara disponible en:

```text
http://localhost:3000
```

## Swagger

Swagger esta disponible en:

```text
http://localhost:3000/api
```

## Endpoints principales

### Login

`POST /auth/login`

Body:

```json
{
  "email": "freelancer@demo.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "accessToken": "JWT_AQUI",
  "user": {
    "id": 1,
    "email": "freelancer@demo.com",
    "name": "Juan Freelancer"
  }
}
```

### Crear servicio

`POST /services`

Header:

```text
Authorization: Bearer JWT_AQUI
```

Body:

```json
{
  "title": "Diseno de landing page",
  "category": "Diseno",
  "description": "Creacion de landing page para campana digital",
  "price": 150
}
```

### Listar servicios

`GET /services`

No requiere autenticacion.

## Scripts utiles

```bash
npm run build
npm run test
npm run start:dev
```

## Estado actual

- Login con JWT funcionando
- Creacion de servicios protegida con `JwtAuthGuard`
- Listado publico de servicios disponible
- Swagger activo en `/api`
- Validacion global con DTOs
