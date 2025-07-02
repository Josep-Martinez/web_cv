# Josep Martínez Boix - Portfolio Personal

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-13+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-blue)

## 🌐 Demo en Vivo

**[https://www.josepmartinezboix.com/](https://www.josepmartinezboix.com/)**

## 📋 Descripción

Portafolio personal moderno y responsive de Josep Martínez Boix, Ingeniero Informático. Este sitio web presenta mi trayectoria profesional, proyectos destacados, habilidades técnicas y experiencia laboral de manera elegante e interactiva.

## ✨ Características Principales

- **🎨 Diseño Moderno**: Interfaz limpia y minimalista con animaciones suaves
- **📱 Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **🌓 Modo Oscuro/Claro**: Tema adaptable según preferencias del usuario
- **⚡ Alto Rendimiento**: Construido con Next.js para carga rápida y SEO optimizado
- **🎯 Componentes Interactivos**: Elementos animados y efectos visuales atractivos
- **🌍 Multiidioma**: Soporte para inglés y español
- **📊 Secciones Dinámicas**: Carrusel de certificaciones, terminal de habilidades interactivo

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 13+** - Framework de React con App Router
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones fluidas y transiciones

### Componentes Destacados
- **AnimatedWord.js** - Animaciones de texto dinámicas
- **CertificatesCarousel.js** - Carrusel interactivo de certificaciones
- **ExperienceItem.js** - Timeline de experiencia profesional
- **ProjectCard.js** - Tarjetas de proyectos con modal
- **SkillsTerminal.js** - Terminal interactivo para mostrar habilidades
- **ProjectModal.js** - Modal detallado para proyectos
- **LanguageButton.js** - Selector de idioma
- **LanguageContext.js** - Contexto global para internacionalización

### Configuración y Herramientas
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Tailwind Config** - Configuración personalizada de Tailwind

## 📁 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── components/          # Componentes reutilizables
│   ├── contact/            # Página de contacto
│   ├── data/              # Datos del portafolio
│   ├── projects/          # Página de proyectos
│   └── works/             # Página de trabajos
├── public/                # Recursos estáticos
├── globals.css           # Estilos globales
├── header.js            # Componente de header
├── LanguageButton.js    # Selector de idioma
├── LanguageContext.js   # Contexto de idiomas
├── layout.js           # Layout principal
└── page.js             # Página principal
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18.0 o superior
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/josep-martinez-boix/portfolio.git
cd portfolio
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev        # Ejecuta en modo desarrollo
npm run build      # Construye para producción
npm run start      # Ejecuta la aplicación en producción
npm run lint       # Ejecuta ESLint
```

## 📱 Secciones del Portfolio

### 🏠 **Inicio**
- Presentación personal animada
- Call-to-action hacia proyectos y contacto
- Diseño hero con efectos visuales

### 👨‍💻 **Sobre Mí**
- Información profesional detallada
- Trayectoria académica y profesional
- Habilidades y competencias técnicas

### 💼 **Experiencia Profesional**
- Timeline interactivo de experiencia laboral
- Detalles de roles y responsabilidades
- Tecnologías utilizadas en cada posición

### 🚀 **Proyectos**
- Galería de proyectos destacados
- Modal con información detallada
- Enlaces a repositorios y demos en vivo
- Tecnologías utilizadas en cada proyecto

### 🎓 **Certificaciones**
- Carrusel dinámico de certificaciones
- Certificados de tecnologías y cursos
- Enlaces a credenciales verificables

### 📞 **Contacto**
- Formulario de contacto funcional
- Enlaces a redes sociales profesionales
- Información de ubicación

## 🎨 Características Técnicas

### Animaciones y UX
- **Scroll suave** entre secciones
- **Lazy loading** de imágenes y componentes
- **Transiciones fluidas** en navegación
- **Efectos hover** interactivos
- **Loading states** para mejor UX

### Optimización
- **Imágenes optimizadas** con Next.js Image
- **Bundle splitting** automático
- **Caching** de recursos estáticos
- **SEO optimizado** con meta tags dinámicos

### Accesibilidad
- **Navegación por teclado** completa
- **Texto alternativo** en imágenes
- **Contraste adecuado** en colores
- **Semántica HTML** correcta

## 🌟 Funcionalidades Destacadas

### Terminal Interactivo de Habilidades
```javascript
// Ejemplo de uso del SkillsTerminal
const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
  tools: ['Git', 'Docker', 'AWS', 'Figma']
}
```

### Carrusel de Certificaciones
- Navegación automática y manual
- Responsive design
- Lazy loading de imágenes
- Indicadores de progreso

### Sistema de Internacionalización
```javascript
// Contexto de idiomas
const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key
});
```

## 📊 Datos del Portfolio

Los datos del portfolio se gestionan de forma centralizada en `data/projectsData.js`, facilitando las actualizaciones y mantenimiento del contenido.


## 📞 Contacto

**Josep Martínez Boix**
- 🌐 **Website**: [josepmartinezboix.com](https://www.josepmartinezboix.com/)
- 💼 **LinkedIn**: [linkedin.com/in/josepmartinezboix](https://linkedin.com/in/josepmartinezboix)
- 📧 **Email**: contacto@josepmartinezboix.com
- 🐙 **GitHub**: [github.com/josep-martinez-boix](https://github.com/josep-martinez-boix)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!** ⭐

---

*Desarrollado con ❤️ por Josep Martínez Boix*
