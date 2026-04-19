# 🍦 Sistema de Gestión para Heladería

Aplicación web desarrollada para la administración integral de una heladería, permitiendo gestionar ventas, stock, caja diaria y generación de reportes de forma simple y eficiente.

---

## 🚀 Funcionalidades principales

### 📦 Control de Stock
- Alta, baja y modificación de productos
- Control automático de stock al realizar ventas
- Alertas de stock bajo
- Gestión de categorías (helados, toppings, bebidas, etc.)

### 💳 Métodos de Pago
- Selección de múltiples formas de pago:
  - Efectivo
  - Tarjeta (débito/crédito)
  - Transferencia
- Registro de cada operación de venta
- Posibilidad de combinar métodos de pago

### 💰 Cierre de Caja Diario
- Registro automático de ingresos del día
- Resumen de ventas por método de pago
- Cálculo de total diario
- Historial de cierres de caja
- Control de diferencias (ideal vs real)

### 📄 Generación de Reportes
- Exportación de información en:
  - PDF (resúmenes de ventas, cierres de caja)
  - Excel (control de stock, reportes detallados)
- Reportes descargables y listos para administración

---

## 🛠️ Tecnologías utilizadas

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js + Express
- Base de datos: MongoDB
- Librerías:
  - jsPDF (generación de PDF)
  - SheetJS / XLSX (exportación a Excel)
  - Toastify (notificaciones)
- Persistencia: localStorage / Base de datos

---

## 📁 Estructura del proyecto

📦 heladeria-app
┣ 📂 public
┃ ┣ 📂 css
┃ ┣ 📂 js
┃ ┗ 📂 assets
┣ 📂 src
┃ ┣ 📂 routes
┃ ┣ 📂 controllers
┃ ┣ 📂 models
┃ ┗ 📂 services
┣ 📂 database
┣ 📄 app.js
┣ 📄 package.json
┗ 📄 README.md
