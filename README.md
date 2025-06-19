Este proyecto utiliza **Vue 3**, **React**, y **NX** para gestionar el frontend. Incluye soporte para **Storybook** y herramientas de desarrollo como **ESLint**, **Prettier**, y **Tailwind CSS**.

Requisitos Previos
------------------

-   **Node.js** (versión recomendada: >= 18)
-   **npm** (instalado con Node.js)
-   **NX CLI** (opcional pero recomendado)

Para instalar NX CLI de manera global (opcional):

`npm install -g nx`

Instalación
-----------

Para instalar todas las dependencias del proyecto, ejecuta el siguiente comando:

`npm install`

Esto instalará todas las dependencias incluidas en `package.json`, tanto las de producción como las de desarrollo.

Scripts disponibles
-------------------

A continuación, se listan algunos de los scripts más importantes que puedes utilizar en este proyecto.

### 1\. Servir el Frontend

Para levantar el servidor de desarrollo del frontend, ejecuta:

`npm run frontend:serve`

Este comando inicia el servidor de desarrollo del frontend utilizando **NX**. El servidor estará disponible localmente, y podrás hacer cambios en tiempo real.

### 2\. Ejecutar pruebas del Frontend

Para ejecutar las pruebas del frontend:

`npm run frontend:test`

Este comando ejecuta las pruebas configuradas para el frontend.

### 3\. Iniciar Storybook

Para levantar Storybook y ver tus componentes de UI en un entorno aislado, ejecuta:

`npm run ui:storybook`

Este comando iniciará **Storybook**, y podrás visualizar la interfaz de usuario en un navegador.


Notas adicionales
-----------------

Este proyecto utiliza varias bibliotecas de terceros como:

-   **FontAwesome** para los íconos.
-   **Tailwind CSS** para estilos.
-   **Vite** para el *bundling* de la aplicación.
-   **Vitest** para pruebas unitarias.

Revisa los archivos de configuración como `nx.json`, `vite.config.js`, y `tailwind.config.js` para más información sobre la configuración de la infraestructura del proyecto.