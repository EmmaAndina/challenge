# Descripción del Proyecto

Este proyecto automatiza el flujo de trabajo de la gestión de un club deportivo en el Sistema de Gestión de Clubes Deportivos Qubika utilizando Playwright. El objetivo es realizar pruebas de extremo a extremo (e2e) que incluyan tanto la automatización de la API como la interfaz de usuario (UI) en la misma prueba. Las pruebas incluyen:

- Creación de un usuario nuevo a través de la API.
- Validación de la página de inicio de sesión.
- Inicio de sesión.
- Creación y validación de categorías y subcategorías.
- Creacion de categorias y subcategorias.
- Validacion de creacion de categorias.

# Estructura de Archivos aplicando POM

src
├── data
│ └── userData.json
├── pages
│ ├── apiPage.ts
│ ├── categoryPage.ts
│ └── loginPage.ts
├── selectors
│ ├── categorySelectors.ts
│ ├── dashboardSelectors.ts
│ └── loginSelectors.ts
├── tests
│ └── qubikaTest.spec.ts
├── utils
│ ├── apiClient.ts
│ └── fileManager.ts
├── test-results
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md

# Descripción de Clases y Funciones

## apiPage.ts

Esta clase gestiona la creación de usuarios a través de la API.

### Funciones

- **generateRandomEmail(domain: string): string**
  - Genera un correo electrónico aleatorio.
- **registerUserWithRandomEmail(password: string, domain: string)**
  - Registra un usuario con un correo electrónico generado aleatoriamente.
- **registerUser(email: string, password: string)**
  - Registra un usuario con un correo y contraseña específicos.

## categoryPage.ts

Esta clase gestiona la creación y validación de categorías y subcategorías en la UI.

### Funciones

- **navigate()**
  - Navega a la página de categorías.
- **createCategory(name: string)**
  - Crea una nueva categoría.
- **validateCategoryAndSubExists()**
  - Valida que la categoría y subcategoría existan.
- **createSubCategory(categoryName: string, subCategoryName: string)**
  - Crea una nueva subcategoría.
- **validateNewCategoryAdded(expectedParentCategory: string, expectedSubCategory: string)**
  - Valida que se haya añadido una nueva categoría y subcategoría.
- **selectLastPaginationItem()**
  - Selecciona el último elemento de la paginación.

## loginPage.ts

Esta clase gestiona la interacción con la página de inicio de sesión.

### Funciones

- **navigate()**
  - Navega a la página de inicio de sesión.
- **validateLoginPage()**
  - Valida que la página de inicio de sesión se muestra correctamente.
- **login(email: string, password: string)**
  - Inicia sesión con el correo y la contraseña proporcionados.

## apiClient.ts

Esta clase gestiona las solicitudes API.

### Funciones

- **registerUser(email: string, password: string)**
  - Registra un usuario a través de la API.

## fileManager.ts

Esta clase gestiona la lectura y escritura de archivos.

### Funciones

- **saveUser(data: any)**
  - Guarda la información del usuario en un archivo JSON.
- **readUser(): any**
  - Lee la información del usuario desde un archivo JSON.

## playwright.config.ts

Configuración de Playwright para el proyecto, incluyendo el tiempo de espera, configuración del navegador y otras opciones.

## Setup

1. Clonar el repositorio.
2. Instalar dependencias:

```sh
    npm install
```

3. Crear archivo `.env` en el root y agregar las siguientes variables:

   BASE_URL=https://api.club-administration.qa.qubika.com
   WEB_URL="https://club-administration.qa.qubika.com/#/auth/login"
   USER_DATA_PATH=src/data/userData.json

## Ejecucion de pruebas

Para correr la prueba ejecutar el siguiente comando:

```sh
npx playwright test
```
