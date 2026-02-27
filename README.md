# 🚗 API REST — Coches & Marcas

API REST desarrollada con **Node.js + Express + MongoDB Atlas** para gestionar un catálogo de coches y sus marcas.

---

## 🛠️ Tech Stack

| Tecnología | Para qué sirve |
|---|---|
| Node.js | Entorno de ejecución |
| Express | Framework HTTP y enrutado |
| Mongoose | ODM para MongoDB |
| dotenv | Variables de entorno |
| cors | Permitir peticiones cross-origin |
| nodemon | Reinicio automático en desarrollo |

---

## 📁 Estructura del Proyecto

```
proyecto-coches/
│
├── .env                          ← Variables de entorno (no subir a Git)
├── .gitignore
├── index.js                      ← Punto de entrada del servidor
├── package.json
│
└── src/
    ├── api/
    │   ├── controllers/
    │   │   ├── coches.js         ← Lógica CRUD de coches
    │   │   └── marcas.js         ← Lógica CRUD de marcas
    │   ├── models/
    │   │   ├── Coche.js          ← Schema Mongoose de Coche
    │   │   └── Marca.js          ← Schema Mongoose de Marca (con relación)
    │   └── routes/
    │       ├── coches.js         ← Endpoints /api/v1/coches
    │       └── marcas.js         ← Endpoints /api/v1/marcas
    ├── config/
    │   └── db.js                 ← Conexión a MongoDB
    └── data/
        └── seed.js               ← Semilla con datos de prueba
```

---

## ⚙️ Instalación y Puesta en Marcha

### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repo>
cd proyecto-coches
npm install
```

### 2. Configurar variables de entorno

Crea el archivo `.env` en la raíz del proyecto:

```env
BD_URL=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.xxxxx.mongodb.net/cochesDB
PORT=3000
```

### 3. Cargar la semilla

```bash
npm run seed
```

Carga 3 marcas (Ferrari, BMW, Toyota) y 6 coches de ejemplo.

### 4. Arrancar el servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor arranca en `http://localhost:3000`

---

## 🗄️ Modelos de Datos

### Coche

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| modelo | String | ✅ | Nombre del modelo |
| imagen | String | ✅ | URL de la imagen |
| precio | Number | ✅ | Precio en euros |
| año | Number | ✅ | Año de fabricación |
| potencia | Number | ✅ | Potencia en CV |
| categoria | String (enum) | ✅ | `deportivo` `familiar` `SUV` `berlina` `compacto` `eléctrico` |
| combustible | String (enum) | ✅ | `gasolina` `diésel` `eléctrico` `híbrido` |

### Marca

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| nombre | String | ✅ | Nombre de la marca (único) |
| pais | String | ✅ | País de origen |
| fundacion | Number | ✅ | Año de fundación |
| logo | String | ❌ | URL del logo |
| coches | [ObjectId] | ❌ | Array de referencias a Coches |

> **Relación:** Una Marca tiene un array de IDs de Coches. Al hacer GET de una marca los coches se devuelven completos gracias a `.populate()`.

---

## 🛣️ Endpoints

### COCHES — `/api/v1/coches`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/coches` | Obtiene todos los coches |
| GET | `/api/v1/coches/:id` | Obtiene un coche por su ID |
| GET | `/api/v1/coches/categoria/:categoria` | Filtra coches por categoría |
| GET | `/api/v1/coches/combustible/:combustible` | Filtra coches por combustible |
| POST | `/api/v1/coches` | Crea un nuevo coche |
| PUT | `/api/v1/coches/:id` | Actualiza un coche existente |
| DELETE | `/api/v1/coches/:id` | Elimina un coche |

#### Ejemplo POST /api/v1/coches

```json
{
  "modelo": "Porsche 911 GT3",
  "imagen": "https://ejemplo.com/porsche.jpg",
  "precio": 185000,
  "año": 2023,
  "potencia": 510,
  "categoria": "deportivo",
  "combustible": "gasolina"
}
```

---

### MARCAS — `/api/v1/marcas`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/v1/marcas` | Obtiene todas las marcas con sus coches |
| GET | `/api/v1/marcas/:id` | Obtiene una marca por ID con sus coches |
| POST | `/api/v1/marcas` | Crea una nueva marca |
| PUT | `/api/v1/marcas/:id` | Actualiza una marca |
| DELETE | `/api/v1/marcas/:id` | Elimina una marca |

#### Ejemplo POST /api/v1/marcas

```json
{
  "nombre": "Porsche",
  "pais": "Alemania",
  "fundacion": 1931,
  "logo": "https://ejemplo.com/porsche-logo.svg"
}
```

#### Ejemplo PUT /api/v1/marcas/:id

> ⚠️ Los coches existentes **nunca se borran** al actualizar. Los nuevos IDs se **añaden** al array sin duplicados gracias a `$addToSet`.

```json
{
  "nombre": "Porsche",
  "coches": ["ID_DEL_COCHE"]
}
```

---

## 🔑 Variables de Entorno

| Variable | Descripción |
|---|---|
| `BD_URL` | URL de conexión a MongoDB Atlas |
| `PORT` | Puerto del servidor (por defecto 3000) |

---

## 👨‍💻 Autor

Fernando — Bootcamp Full Stack