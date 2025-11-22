# Josep Martínez Boix - Portfolio Personal

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-13+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-blue)

## 🌐 Demo en Vivo

**[https://www.josepmartinezboix.com/](https://www.josepmartinezboix.com/)**

## 📋 Descripción

Portfolio personal moderno con diseño "liquid glass" (vidrio líquido) estilo Apple, efectos de animación de texto tipo "decoding", y un fondo 3D de estrellas animadas. Construido con Next.js 13+ y Tailwind CSS para máximo rendimiento y experiencia visual premium.

## ✨ Características Principales

- **🎨 Diseño Liquid Glass**: Efecto de vidrio esmerilado sutil inspirado en el diseño de Apple
- **⭐ Fondo 3D Animado**: Starfield con perspectiva 3D, colores variados y efecto de parpadeo
- **🔤 Animaciones de Texto**: Efecto "decoding" en palabras clave y nombre principal
- **📱 Totalmente Responsive**: Optimizado para móviles, tablets y desktop
- **� Multiidioma**: Soporte para inglés y español con transiciones suaves
- **⚡ Alto Rendimiento**: Next.js con optimización automática de imágenes y código
- **� Navegación Intuitiva**: Menú móvil con overlay, scroll automático al cambiar página

## 🛠️ Tecnologías Utilizadas

### Core
- **Next.js 13+** - App Router, Server Components
- **React 18** - Hooks, Context API
- **Tailwind CSS** - Utility-first styling
- **Google Fonts** - Outfit, Inter, Martian Mono

### Componentes Clave
- `StarBackground.js` - Fondo 3D de estrellas con Canvas API
- `AnimatedWord.js` - Efecto de texto "decoding"
- `Header.js` - Navegación con efecto liquid glass
- `ProjectModal.js` - Modal de proyectos con glassmorphism
- `LanguageContext.js` - Sistema de internacionalización

## 📁 Estructura del Proyecto

```
web_cv/
├── app/
│   ├── components/
│   │   ├── AnimatedWord.js          # Animación de texto decoding
│   │   ├── StarBackground.js        # Fondo 3D de estrellas
│   │   ├── ProjectModal.js          # Modal de proyectos
│   │   └── LanguageTransitionProvider.js
│   ├── contact/                     # Página de contacto
│   ├── projects/                    # Página de proyectos
│   ├── works/                       # Página de experiencia
│   ├── data/
│   │   └── projectsData.js          # Datos de proyectos
│   ├── globals.css                  # Estilos globales + Tailwind
│   ├── header.js                    # Header con liquid glass
│   ├── layout.js                    # Layout raíz
│   ├── page.js                      # Página principal
│   ├── LanguageButton.js            # Selector de idioma
│   └── LanguageContext.js           # Contexto de idiomas
├── public/
│   ├── foto_cv.png                  # Foto de perfil
│   └── ...                          # Imágenes de proyectos
├── tailwind.config.mjs              # Configuración de Tailwind
└── package.json
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18.0 o superior
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/josep-martinez/web_cv.git
cd web_cv
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev        # Modo desarrollo (puerto 3000)
npm run build      # Build de producción
npm run start      # Ejecutar build de producción
npm run lint       # Linter ESLint
```

## 🎨 Personalización

### Modificar Animación de Palabras

En `app/page.js`, línea 86:
```javascript
setGlobalInterval(150); // Aumentar para más lento, disminuir para más rápido
```

En `app/components/AnimatedWord.js`, línea 49:
```javascript
if (Math.random() > 0.6) {  // Cambiar 0.6 para ajustar velocidad de decodificación
  currentIndex++;
}
```

### Modificar Fondo de Estrellas

En `app/components/StarBackground.js`:
```javascript
const numStars = 800;  // Cantidad de estrellas
const starColors = ["#ffffff", "#64ffda", "#8892b0", "#a8b2d1"];  // Colores
this.speed = Math.random() * 0.5 + 0.1;  // Velocidad de movimiento
this.twinkleSpeed = Math.random() * 0.05 + 0.01;  // Velocidad de parpadeo
```

### Modificar Efecto Liquid Glass

En `app/header.js` y `app/components/ProjectModal.js`:
```javascript
bg-navy-900/30        // Opacidad del fondo (aumentar para más opaco)
backdrop-blur-xl      // Intensidad del blur (sm, md, lg, xl, 2xl)
border-white/10       // Opacidad del borde
```

### Cambiar Colores del Tema

En `tailwind.config.mjs`:
```javascript
colors: {
  navy: {
    900: '#0a192f',  // Fondo principal
    800: '#112240',
    700: '#1d2d50',
  },
  electric: '#64ffda',  // Color de acento
  slate: {
    light: '#ccd6f6',
    dark: '#8892b0',
  }
}
```

### Ajustar Foto de Perfil

En `app/page.js`, línea 186:
```javascript
className="object-cover object-top ..."  // object-top alinea la parte superior
// Cambiar a: object-center, object-bottom, etc.
```

## 🌍 Añadir Nuevo Idioma

1. En `app/LanguageContext.js`, añadir el nuevo idioma:
```javascript
const [language, setLanguage] = useState('es'); // Cambiar idioma por defecto
```

2. En cada página/componente, añadir traducciones:
```javascript
const texts = {
  EN: { ... },
  ES: { ... },
  FR: { ... }  // Nuevo idioma
};
```

## 📱 Secciones del Portfolio

### 🏠 **Inicio** (`/`)
- Presentación con animación de nombre tipo "Matrix"
- Descripción con palabras clave animadas
- Foto de perfil con efecto hover

### 💼 **Experiencia** (`/works`)
- Timeline de experiencia profesional
- Detalles de roles y tecnologías

### 🚀 **Proyectos** (`/projects`)
- Galería de proyectos con modales
- Videos demostrativos
- Enlaces a GitHub y demos en vivo

### 📞 **Contacto** (`/contact`)
- Terminal interactivo con animación typewriter
- Enlaces a redes sociales
- Email y ubicación

## 🔧 Troubleshooting

### Las animaciones van muy rápido/lento
- Ajustar `globalInterval` en `app/page.js` (línea 86)
- Modificar probabilidad en `AnimatedWord.js` (línea 49)

### El fondo de estrellas no se ve
- Verificar que `StarBackground` está importado en `layout.js`
- Comprobar z-index: debe ser `z-[-1]`
- Revisar opacidad del canvas en `StarBackground.js`

### El header no se ve transparente
- Asegurarse de que `backdrop-blur-xl` está aplicado
- Verificar que la opacidad del fondo es baja (ej: `/30`)
- Comprobar que no hay otros elementos bloqueando

### La foto se corta
- Ajustar `object-position` en el componente Image
- Usar `object-top`, `object-center`, o `object-bottom`

### El menú móvil no funciona
- Verificar que el estado `mobileMenuOpen` está definido
- Comprobar que el overlay tiene `z-40` o superior
- Revisar que `useEffect` cierra el menú al cambiar pathname

## 📊 Rendimiento

- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Optimización de imágenes**: Next.js Image component
- **Code splitting**: Automático con Next.js App Router

## 📞 Contacto

**Josep Martínez Boix**
- 🌐 **Website**: [josepmartinezboix.com](https://www.josepmartinezboix.com/)
- 💼 **LinkedIn**: [linkedin.com/in/josepmartinezboix](https://linkedin.com/in/josepmartinezboix)
- 📧 **Email**: contact@josepmartinezboix.com
- 🐙 **GitHub**: [github.com/Josep-martinez](https://github.com/Josep-martinez)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!** ⭐

---

*Desarrollado con ❤️ por Josep Martínez Boix*
