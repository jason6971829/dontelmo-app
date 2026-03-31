# 🍽️ Don Telmo — Sistema de Reservas

App React para gestión de reservas de Don Telmo Company.

## 🚀 Inicio rápido

```bash
# 1. Clonar
git clone https://github.com/TU_USUARIO/dontelmo-reservas.git
cd dontelmo-reservas

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
# Abre http://localhost:5173
```

## 📁 Estructura del proyecto

```
src/
├── App.jsx          ← Componente principal (toda la lógica)
├── constants.js     ← Estilos, utilidades, colores
├── data.js          ← Sedes, productos, reservas iniciales
├── main.jsx         ← Punto de entrada React
└── components/      ← (Futuro) Componentes separados
```

## 🌐 Deploy en Vercel

1. Sube el proyecto a GitHub
2. Ve a vercel.com → New Project → importa el repo
3. Vercel detecta Vite automáticamente
4. ¡Listo! URL pública en segundos

## 🤖 Conectar con el Bot de WhatsApp

1. Despliega el bot en Railway (carpeta `dontelmo-bot/`)
2. En la app → Reservas → **🤖 Sync WhatsApp**
3. Ingresa la URL de Railway
4. Las reservas del bot se importan automáticamente

## 🛠️ Variables de entorno

```bash
cp .env.example .env
# Edita .env con tus valores
```

| Variable | Descripción |
|----------|-------------|
| `VITE_BOT_URL` | URL del bot en Railway |

## 💡 Tips para trabajar con Claude en VS Code

- Instala la extensión **Claude Dev** (anthropics.claude-dev)
- Describe qué quieres cambiar en lenguaje natural
- Claude puede modificar directamente los archivos del proyecto

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |

## 🔧 Tecnologías

- **React 18** + Vite
- **Recharts** para gráficas
- **EmailJS** para correos automáticos
- **Meta WhatsApp Cloud API** para el bot
- **Anthropic Claude** para IA

---
*Don Telmo Company · 1958*

