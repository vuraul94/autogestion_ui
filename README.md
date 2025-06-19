# Project Overview

This project uses **Vue 3**, **React**, and **NX** to manage the frontend. It includes support for **Storybook** and development tools like **ESLint**, **Prettier**, and **Tailwind CSS**.

## Prerequisites

- **Node.js** (recommended version: >= 18)  
- **npm** (comes with Node.js)  
- **NX CLI** (optional but recommended)

To install NX CLI globally (optional):

```bash
npm install -g nx
```

## Installation

To install all project dependencies, run:

```bash
npm install
```

This will install all production and development dependencies listed in `package.json`.

## Available Scripts

Here are some of the most relevant scripts you can use in this project.

### 1. Start Storybook

To launch Storybook and view your UI components in an isolated environment, run:

```bash
npm run ui:storybook
```

This command will start **Storybook**, and you'll be able to browse the UI components in your browser.

## Additional Notes

This project uses several third-party libraries including:

- **FontAwesome** for icons  
- **Tailwind CSS** for styling  
- **Vite** for application bundling  
- **Vitest** for unit testing  

Refer to configuration files like `nx.json`, `vite.config.js`, and `tailwind.config.js` for more details on how the project infrastructure is set up.