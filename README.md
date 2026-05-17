# Cusco Eterno — Sitio Turístico

Sitio web turístico profesional sobre la región del Cusco, Perú. Construido con React.

## Stack

- **React 18** — Framework principal
- **CSS puro** — Sin librerías de estilos externas
- **Fuentes:** Cormorant Garamond + Josefin Sans (Google Fonts)
- **Imágenes:** Unsplash (libres de uso)

## Estructura

```
cusco-turismo/
├── public/
│   └── index.html
├── src/
│   ├── App.js       ← Componentes y datos
│   ├── App.css      ← Todos los estilos
│   └── index.js     ← Entry point
├── vercel.json
└── package.json
```

## Desarrollo local

```bash
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000)

## Despliegue en Vercel

### Opción 1 — Vercel CLI (más rápido)

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones. En la primera vez te pedirá login.

### Opción 2 — GitHub + Vercel (recomendado)

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Cusco Eterno"
git remote add origin https://github.com/TU_USUARIO/cusco-turismo.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com) → **New Project**
3. Importa tu repositorio de GitHub
4. Vercel detecta automáticamente que es un proyecto Create React App
5. Haz clic en **Deploy** — ¡listo!

### Configuración de Vercel

| Campo | Valor |
|---|---|
| Framework Preset | Create React App |
| Build Command | `npm run build` |
| Output Directory | `build` |
| Install Command | `npm install` |

Todo se configura automáticamente.

## Personalización

### Cambiar destinos
Edita el array `destinations` en `src/App.js`:
```js
const destinations = [
  {
    name: 'Tu Destino',
    image: 'URL_DE_IMAGEN',
    description: '...',
    // ...
  }
]
```

### Cambiar colores
Edita las variables CSS en `src/App.css`:
```css
:root {
  --gold: #c8860a;       /* Color principal */
  --dark: #1a0d00;       /* Fondo oscuro */
  --cream: #f7f0e6;      /* Fondo claro */
}
```

### Cambiar imágenes del Hero
En `src/App.css`, busca la clase `.hero` y cambia la URL:
```css
background-image: url('TU_URL_AQUI');
```

## Secciones incluidas

- ✅ Navbar fija con efecto scroll
- ✅ Hero con parallax y partículas
- ✅ Barra de estadísticas animada
- ✅ Grid de 6 destinos con hover effects
- ✅ Sección de experiencias
- ✅ Información práctica (temporadas, consejos, transporte)
- ✅ Formulario de contacto
- ✅ Footer completo
- ✅ Totalmente responsive (móvil, tablet, escritorio)
