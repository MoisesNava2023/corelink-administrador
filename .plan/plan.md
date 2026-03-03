

# Admin Backoffice Panel - Plan de Implementación

## Resumen
Panel de administración (backoffice) para gestionar productos, clientes y ventas de una app móvil. Estilo gris oscuro con verde bosque, arquitectura escalable con Context API y datos mock listos para conectar a API real.

---

## 🎨 Diseño y Estilo
- **Fondo principal:** Gris oscuro (#1a1e20)
- **Color acento:** Verde bosque/monte (#2d6a4f)
- **Textos:** Blancos y grises claros
- **Layout:** Sidebar izquierda + Header global arriba + contenido principal

---

## 🔐 1. Login de Administrador
- Pantalla de login simple con email y contraseña
- Autenticación simulada (mock) con AuthContext
- Redirección al dashboard tras login exitoso
- Botón de cerrar sesión en el header global

## 🛡️ 2. Protección de Rutas
- Componente ProtectedRoute que verifica si hay usuario autenticado
- Si no hay sesión → redirige automáticamente a /login

## 🏗️ 3. Layout Global (AdminLayout)
- **Header global** fijo arriba (fuera del contenido de páginas) con nombre del admin y botón cerrar sesión
- **Sidebar** de navegación izquierda con links a: Dashboard, Productos, Clientes, Ventas
- **Área de contenido** que renderiza la página activa

## 📊 4. Dashboard Principal
- Tarjetas con estadísticas dinámicas calculadas desde los Contexts:
  - Total de productos
  - Total de clientes
  - Total de ventas
  - Total de ingresos (suma automática)
- Se actualiza automáticamente al agregar/editar/eliminar datos en cualquier sección

## 📦 5. Gestión de Productos (CRUD)
- Tabla con listado de productos
- Crear, editar y eliminar productos
- Campos: Nombre (obligatorio), Precio (obligatorio), Categoría (obligatoria)
- **3 categorías fijas** (no editables): Ferretería, Alimentos, Hogar
- Categoría se selecciona con dropdown, sin opción de crear nuevas
- Modal/formulario para agregar y editar

## 👥 6. Gestión de Clientes (CRUD)
- Tabla con listado de clientes
- Crear, editar y eliminar clientes
- Eliminación con diálogo de confirmación
- Campos: Nombre, Email, Teléfono

## 💰 7. Ventas e Ingresos
- Tabla de ventas con filas clickeables
- Al hacer click → vista de detalle de venta (/dashboard/sales/:id)
- Crear venta: seleccionar cliente, agregar productos, cálculo automático del total
- Dashboard refleja total de ventas e ingresos en tiempo real

## 🗂️ Arquitectura
- **Context API** para estado global: AuthContext, ProductContext, ClientContext, SalesContext
- **Datos mock** en archivo centralizado (data/mockData.ts)
- **Types** definidos para Product, Client y Sale
- **Services** preparados como capa de abstracción para futura conexión con API real
- Sin backend por ahora — todo funciona con datos en memoria

## 📁 Estructura de Archivos
Siguiendo la estructura que proporcionaste: layout separado, contexts, pages organizadas por sección, services y types independientes.

