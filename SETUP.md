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

## ✨ New Features (v2.0)

### 🎯 Interactive Learning
- **Guided Tutorials**: Step-by-step walkthroughs for Bubble Sort, Merge Sort, and Binary Search
- **Checkpoint Questions**: Verify understanding at each step
- **Beginner Tips**: Every algorithm includes learning guides
- **Terms Glossary**: Quick explanations of technical terms

### ♿ Accessibility
- **Full Keyboard Navigation**: 
  - Space/Enter: Play/Pause
  - Arrow keys: Navigate steps  
  - Ctrl+R: Reset, Ctrl+T: Tutorial
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Indicators**: Clear visual feedback
- **WCAG 2.1 AA Compliant**: Accessible for all users

### 🎨 Visual Improvements
- **Rich Lavender Light Mode**: Beautiful colored theme (not plain white)
- **Smooth Animations**: Framer Motion transitions
- **Speed Control**: 0.25x to 3x playback speed
- **Current Step Display**: See what's happening in real-time

### 🔒 Security & Reliability
- **Input Validation**: Protection against malicious inputs
- **Execution Timeouts**: 5-second limit prevents infinite loops
- **Resource Limits**: Memory and buffer protections
- **Clear Error Messages**: User-friendly feedback

### 📚 Complete Code Examples
- **Full Implementations**: All 15 algorithms include complete code
- **Helper Functions**: See merge(), partition(), and other utilities
- **Copy-Paste Ready**: Use in your own projects

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
## ⌨️ Keyboard Shortcuts

Once the app is running, you can use these shortcuts:

| Shortcut | Action |
|----------|--------|
| **Space** or **Enter** | Play / Pause visualization |
| **Right Arrow** → | Next step |
| **Left Arrow** ← | Previous step |
| **Ctrl/Cmd + R** | Reset to beginning |
| **Ctrl/Cmd + T** | Open interactive tutorial |

**Note**: Shortcuts are disabled when typing in input fields.

### Using Guided Tutorials

1. Click **"Start Interactive Tutorial"** button in sidebar, or
2. Press **Ctrl/Cmd + T**
3. Follow step-by-step instructions
4. Answer checkpoint questions to verify understanding
5. Tutorial can trigger visualizations automatically

Available tutorials:
- Bubble Sort (5 steps)
- Merge Sort (5 steps)  
- Binary Search (5 steps)

---

## ♿ Accessibility Testing

### Keyboard Navigation Test
1. Open app in browser
2. Press **Tab** to navigate through elements
3. Use **Space/Enter** on focused buttons
4. Use **Arrow keys** to control visualization
5. All interactive elements should have visible focus indicators

### Screen Reader Test
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through interface
3. All buttons, inputs, and sections should be announced
4. ARIA labels provide context for controls

---

## 🔒 Security Features

### Input Validation
The backend validates all inputs:
- **Empty inputs**: Rejected with clear message
- **Max length**: 1000 characters per input
- **Max count**: 100 inputs maximum

### Execution Protection
- **Timeout**: Algorithm execution limited to 5 seconds
- **Memory limits**: 1MB buffer limit
- **Safe execution**: Prevents resource exhaustion

### Testing Security
```powershell
# Test empty input
curl -X POST http://localhost:3001/run/bubble_sort \
  -H "Content-Type: application/json" \
  -d '{"inputs": []}'
# Should return: "Please provide input values..."

# Test timeout (create infinite loop)
# Should return: "Algorithm took longer than 5 seconds."
```

---

## 📊 Complete Feature List

### Visualization Features
- [x] 50+ algorithm implementations
- [x] Step-by-step execution
- [x] Adjustable playback speed (0.25x - 3x)
- [x] Play/Pause/Reset controls
- [x] Current step explanations
- [x] Visual highlighting

### Educational Features  
- [x] Guided interactive tutorials
- [x] Beginner tips for each algorithm
- [x] Quick terms glossary
- [x] Time/space complexity info
- [x] Complete code examples
- [x] Helper function implementations

### Accessibility Features
- [x] Full keyboard navigation
- [x] ARIA labels and semantic HTML
- [x] Screen reader support
- [x] Focus indicators
- [x] WCAG 2.1 AA compliant
- [x] Keyboard shortcuts display

### Security Features
- [x] Input validation (empty, length, count)
- [x] Execution timeouts (5 seconds)
- [x] Resource limits (memory, buffer)
- [x] Clear error messages

### UI/UX Features
- [x] Dark mode and light mode
- [x] Rich lavender light theme
- [x] Smooth animations
- [x] Responsive design
- [x] Category filtering
- [x] Difficulty levels

---

## 📝 Documentation

- **[README.md](README.md)**: Project overview and features
- **[SETUP.md](SETUP.md)**: This file - setup and usage
- **[FILE_GUIDE.md](FILE_GUIDE.md)**: File structure details
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)**: Recent improvements log

---

## 💻 Development Best Practices

### Code Quality
1. **Format before commit**: `npm run format`
2. **Check linting**: `npm run lint`
3. **Run tests**: `npm test`
4. **Test accessibility**: Tab navigation, screen reader
5. **Test keyboard shortcuts**: All shortcuts should work

### Adding New Features
1. Follow existing code structure
2. Add ARIA labels for accessibility
3. Include keyboard support where appropriate
4. Add tests for new functionality
5. Update documentation

---

## 📊 Performance Tips

### Frontend Optimization
- Visualizations use SVG for smooth rendering
- Animations powered by Framer Motion (hardware accelerated)
- Speed slider allows users to control performance
- CSS variables for instant theme switching

### Backend Optimization  
- C programs compiled with optimizations
- Execution timeout prevents resource exhaustion
- Input validation reduces processing overhead
- Buffer limits prevent memory issues

---

## 📝 Changelog (v2.0)

### January 2026
- ➕ Added guided interactive tutorials (3 algorithms)
- ➕ Implemented full keyboard navigation
- ➕ Added comprehensive ARIA labels
- ➕ Added backend input validation
- ➕ Added execution timeout protection
- ➕ Complete code examples for all 15 algorithms
- 🎨 Rich lavender light mode theme
- 🔒 Security hardening (validation, timeouts, limits)
- ♿ WCAG 2.1 AA accessibility compliance

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

**For more information**:
- Features: [README.md](README.md)
- Recent improvements: [IMPROVEMENTS.md](IMPROVEMENTS.md)
- File structure: [FILE_GUIDE.md](FILE_GUIDE.md)

---

*Last updated: January 20, 2026*
