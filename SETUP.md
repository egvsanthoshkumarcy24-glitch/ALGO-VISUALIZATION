# Setup Guide

Complete setup instructions for ALGO-VISUALIZATION project.

---

## ⚡ Quick Start (5 minutes)

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **C Compiler** (gcc/clang) - Optional for building C programs

### Install & Run

```powershell
# Clone/navigate to project
cd ALGO-VISUALIZATION

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Start backend (Terminal 1)
npm start

# Start frontend (Terminal 2 - new window)
cd ../frontend
npm run dev
```

**Open browser**: `http://localhost:5173`

Done! 🎉

---

## 📦 Detailed Installation

### 1. Install Node.js Dependencies

#### Frontend
```powershell
cd frontend
npm install
```

**Installs**:
- React, React DOM
- Vite (dev server & bundler)
- Framer Motion (animations)
- Tailwind CSS (styling)
- Lucide React (icons)
- ESLint, Prettier (code quality)
- Vitest (testing)

#### Backend
```powershell
cd backend
npm install
```

**Installs**:
- Express (web server)
- CORS (cross-origin requests)
- Body Parser (request parsing)

### 2. Build C Programs (Optional)

#### Windows
```powershell
cd backend
.\build.bat
```

#### Unix/Linux/macOS
```bash
cd backend
make all
```

**Builds**: All algorithm executables in `backend/build/` directory.

**Note**: C programs are optional during development. The visualizer can work with mock data initially.

---

## 🚀 Running the Project

### Development Mode

**Backend Server**:
```powershell
cd backend
npm start
```
- Starts Express server (default port: 3000)
- Watch mode: `npm run dev`

**Frontend Dev Server**:
```powershell
cd frontend
npm run dev
```
- Starts Vite dev server at `http://localhost:5173`
- Hot reload enabled
- Fast refresh for React components

### Production Build

**Frontend**:
```powershell
cd frontend
npm run build      # Creates dist/ folder
npm run preview    # Preview production build
```

**Backend**:
```powershell
cd backend
npm run build:prod  # Optimized C builds
node server.js      # Run production server
```

---

## 🧪 Running Tests

### Frontend Tests
```powershell
cd frontend
npm test           # Run all tests
npm test -- --ui   # Interactive UI
```

### Backend Tests
```powershell
cd backend
npm test           # Smoke tests for C programs
```

### Run CI Locally (Before Push)
```powershell
# Frontend checks
cd frontend
npm run lint
npm run format:check
npm run build
npm test

# Backend checks
cd ../backend
make format-check
make test
```

---

## 🛠️ Development Workflow

### Daily Development

1. **Start servers** (backend + frontend in separate terminals)
2. **Make changes** to code
3. **Auto-reload** happens automatically
4. **Test manually** in browser
5. **Run tests**: `npm test`
6. **Format code**: `npm run format`

### Before Committing

```powershell
# Frontend
cd frontend
npm run format     # Auto-format
npm run lint       # Check code
npm test           # Run tests

# Backend
cd ../backend
make format        # Format C code
make test          # Smoke tests
```

### Adding New Algorithm

1. **Create C file**: `backend/src/my_algorithm.c`
2. **Add to Makefile**: In ALGORITHMS list
3. **Add to problems**: `frontend/src/data/problems.js`
4. **Test**:
   ```bash
   cd backend
   make my_algorithm
   ./build/my_algorithm <test_input>
   ```
5. **Add frontend test** in `frontend/src/test/`

---

## 🐛 Troubleshooting

### Backend won't start

**Error**: Port already in use
```powershell
# Find process on port 3000
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
```

**Error**: Cannot find module
```powershell
cd backend
rm -rf node_modules
npm install
```

### Frontend won't start

**Error**: EADDRINUSE port 5173
```powershell
# Vite will try next port automatically (5174, 5175, etc.)
# Or kill process:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Error**: Module not found
```powershell
cd frontend
rm -rf node_modules
npm install
```

### C Programs won't build

**Windows**: Install MinGW or use WSL
```powershell
# Check if gcc is available
gcc --version

# If not, install MinGW or use WSL
wsl
cd /mnt/c/Coding/ALGO-VISUALIZATION/backend
make all
```

**Unix**: Install build tools
```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# macOS
xcode-select --install
```

### Tests failing

**Clear cache**:
```powershell
cd frontend
npm test -- --clearCache
npm test
```

**Update snapshots**:
```powershell
npm test -- -u
```

### Format/Lint errors

**Auto-fix**:
```powershell
cd frontend
npm run format     # Fix Prettier
npm run lint       # Check ESLint

cd ../backend
make format        # Fix C code
```

---

## 🔧 Configuration

### Change Backend Port

Edit `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000
```

### Change Frontend Proxy

Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'  // Match backend port
    }
  }
})
```

### Disable Type Checking

Already using JavaScript (no TypeScript). ESLint provides basic checks.

---

## 📚 Command Reference

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Auto-format code |
| `npm run format:check` | Check formatting |
| `npm test` | Run tests |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start server |
| `npm run dev` | Watch mode |
| `npm run build` | Build C programs |
| `npm run build:dev` | Debug build with sanitizers |
| `npm run build:prod` | Optimized build |
| `npm test` | Smoke tests |
| `make all` | Build all C programs |
| `make dev` | Debug build |
| `make clean` | Remove builds |
| `make format` | Format C code |
| `make test` | Run smoke tests |

---

## 💡 Tips

1. **Use two terminals**: One for backend, one for frontend
2. **Hot reload**: Changes appear automatically in browser
3. **Check console**: Browser console shows React errors
4. **Check terminal**: Backend terminal shows API errors
5. **Format often**: Run `npm run format` before committing
6. **Test locally**: Run full CI checks before pushing

---

## 🎓 Next Steps

After setup:
1. **Explore the code**: See [FILE_GUIDE.md](FILE_GUIDE.md)
2. **Try algorithms**: Click problems in Dashboard
3. **Add new problem**: Follow [FILE_GUIDE.md](FILE_GUIDE.md) → Adding Algorithm
4. **Contribute**: Follow code quality standards

---

## 🆘 Still Having Issues?

1. Check [FILE_GUIDE.md](FILE_GUIDE.md) for file explanations
2. Check [README.md](README.md) for project overview
3. Ensure Node.js version 16+: `node --version`
4. Clear all: `rm -rf node_modules && npm install`

---

*Last updated: January 18, 2026*
