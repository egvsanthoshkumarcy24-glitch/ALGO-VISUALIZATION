# Algorithm Visualization Platform

Interactive platform for visualizing data structures and algorithms with step-by-step execution. Perfect for interview preparation and learning CS fundamentals.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-16%2B-blue.svg)

---

## 🚀 Quick Start

```powershell
# Install dependencies first
cd frontend
npm install

cd ../backend  
npm install

# Then start (use 2 terminals)
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev        # http://localhost:5173
```

**⚠️ First time?** Run `npm install` in both directories before starting!

**Full setup instructions**: See [SETUP.md](SETUP.md)

---

## 📋 Project Structure

```
ALGO-VISUALIZATION/
├── frontend/          # React + Vite visualization UI
│   ├── src/
│   │   ├── components/    # Dashboard, VisualizerEngine
│   │   ├── data/          # problems.js (50+ algorithms)
│   │   └── test/          # Vitest unit tests
│   └── package.json
│
├── backend/           # Node.js API + C implementations
│   ├── src/              # 30+ C algorithm files
│   ├── server.js         # Express API
│   ├── Makefile          # Build configuration
│   └── package.json
│
├── .github/workflows/ # CI/CD pipeline
├── SETUP.md          # Complete setup guide
└── FILE_GUIDE.md     # Explains all files
```

**Detailed file explanations**: See [FILE_GUIDE.md](FILE_GUIDE.md)

---

## ✨ Features

- **50+ Algorithms**: Sorting, searching, trees, graphs, DP, backtracking
- **Step-by-Step Visualization**: Watch algorithms execute with visual feedback
- **Multiple Categories**: Arrays, Two Pointers, Sliding Window, Trees, Graphs, etc.
- **Interview Mode**: Curated problem sets by topic
- **Complexity Info**: Time and space complexity for each algorithm

---

## 🎯 Algorithm Categories

| Category | Algorithms | Examples |
|----------|-----------|----------|
| **Sorting** | 8 | Bubble, Merge, Quick, Radix |
| **Searching** | 2 | Binary Search, BST Search |
| **Data Structures** | 5 | Stack, Queue, Linked Lists |
| **Trees** | 2 | Level Order, BST |
| **Graphs** | 1 | BFS Traversal |
| **Dynamic Programming** | 2 | Fibonacci DP, Memoization |
| **Backtracking** | 1 | N-Queens |
| **LeetCode Style** | 10+ | Two Sum, Three Sum, Valid Parentheses |

---

## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Tailwind CSS, Framer Motion  
**Backend**: Node.js, Express, C (GCC)  
**Testing**: Vitest, React Testing Library  
**Code Quality**: ESLint, Prettier, clang-format  
**CI/CD**: GitHub Actions

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Installation, running, troubleshooting
- **[FILE_GUIDE.md](FILE_GUIDE.md)** - Complete file structure explanation
- **[LICENSE](LICENSE)** - Project license

---

## 🧪 Development

### Commands

**Frontend** (`frontend/`):
```powershell
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier auto-format
npm test             # Run tests
```

**Backend** (`backend/`):
```powershell
npm start            # Start server
npm run build        # Build C programs
make all             # Build all (Unix/WSL)
make format          # Format C code
npm test             # Smoke tests
```

### Adding New Algorithm

1. Create `backend/src/algorithm.c`
2. Add to `backend/Makefile` ALGORITHMS list
3. Add problem definition to `frontend/src/data/problems.js`
4. Build & test: `make algorithm && ./build/algorithm <input>`

See [FILE_GUIDE.md](FILE_GUIDE.md) for details.

---

## ✅ Code Quality

- **ESLint + Prettier**: Automatic code formatting
- **Unit Tests**: Vitest with React Testing Library
- **CI Pipeline**: Automated testing on push/PR
- **C Formatting**: clang-format with LLVM style
- **Memory Safety**: Sanitizers available (`make dev`)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Follow code style (auto-format with Prettier/clang-format)
4. Add tests for new features
5. Ensure CI passes: `npm run lint && npm test`
6. Submit pull request

---

## 📊 CI/CD

GitHub Actions runs on every push/PR:
- ✅ ESLint + Prettier checks
- ✅ Build verification (frontend & backend)
- ✅ Unit tests (Vitest)
- ✅ C code format check (clang-format)
- ✅ Security audit (npm audit)

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

---

## 🐛 Troubleshooting

**Backend won't start**: Check if port 3000 is free  
**Frontend build fails**: Clear `node_modules`, reinstall  
**C programs won't compile**: Install GCC or use WSL on Windows  
**Tests failing**: Run `npm test -- --clearCache`

See [SETUP.md](SETUP.md) → Troubleshooting section.

---

## 📄 License

See [LICENSE](LICENSE) file.

---

## 🎓 Resources

- **Project Setup**: [SETUP.md](SETUP.md)
- **File Structure**: [FILE_GUIDE.md](FILE_GUIDE.md)
- **React Docs**: [react.dev](https://react.dev)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)

---

**Made with ❤️ for algorithm learners and interview prep**
