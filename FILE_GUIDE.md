# Complete File Guide

This guide explains every file and directory in the ALGO-VISUALIZATION project.

## 📁 Root Directory

### Configuration Files

**`.gitignore`**
- Ignores build outputs, dependencies, IDE files
- Prevents committing `node_modules/`, `build/`, `*.exe`, etc.

**`.clang-format`**
- C code formatting rules for backend algorithms
- Based on LLVM style, 100 char line limit
- Usage: `make format` in backend/

**`LICENSE`**
- Project license file

### Documentation

**`README.md`** ⭐
- Main project documentation (GitHub homepage)
- Quick start, features, structure overview

**`SETUP.md`** ⭐
- Detailed setup instructions
- Installation steps, commands, troubleshooting

**`FILE_GUIDE.md`** ⭐ (this file)
- Explains all files in the project

---

## 📁 `.github/`

### `.github/workflows/`

**`ci.yml`**
- GitHub Actions CI/CD pipeline
- Runs on push/PR to main/develop
- Jobs:
  - **Frontend**: ESLint, Prettier, build, tests (Node 18.x & 20.x)
  - **Backend**: C build, clang-format check, smoke tests
  - **Security**: npm audit for vulnerabilities

---

## 📁 `backend/`

Backend contains Node.js API server + C algorithm implementations.

### Root Files

**`package.json`**
- Node.js dependencies: express, cors, body-parser
- Scripts:
  - `npm start` - Run server
  - `npm run dev` - Watch mode
  - `npm run build` - Build all C programs
  - `npm run build:dev` - Debug build with sanitizers
  - `npm test` - Smoke tests

**`server.js`**
- Node.js Express API server
- Executes C programs and returns results
- Endpoints for algorithm visualization

**`Makefile`**
- Build configuration for C programs
- Targets:
  - `make all` - Build everything
  - `make dev` - Debug build with sanitizers
  - `make prod` - Optimized production build
  - `make test` - Run smoke tests
  - `make format` - Format C code
  - `make clean` - Remove builds

**`build.bat`**
- Windows batch script for building C programs
- Alternative to Makefile for Windows users

### `backend/include/`

**`logger.h`**
- Header file for logging utilities
- Macros for debug output, step logging, errors

### `backend/src/`

C source files for algorithms. Each file is a standalone program.

#### Sorting Algorithms
- `bubble_sort.c` - O(n²) comparison sort
- `selection_sort.c` - O(n²) in-place sort
- `insertion_sort.c` - O(n²) adaptive sort
- `merge_sort.c` - O(n log n) divide-and-conquer
- `quick_sort.c` - O(n log n) average, pivot-based
- `randomized_quick_sort.c` - Randomized pivot selection
- `counting_sort.c` - O(n+k) non-comparison sort
- `radix_sort.c` - O(d*(n+k)) for integers

#### Searching
- `binary_search.c` - O(log n) on sorted arrays
- `bst_search.c` - Binary search tree search

#### Data Structures
- `stack_ll.c` - Stack using linked list
- `queue_ll.c` - Queue using linked list
- `deque_ll.c` - Double-ended queue
- `doubly_linked_list.c` - Doubly linked list ops
- `reverse_linked_list.c` - Reverse linked list

#### Trees & Graphs
- `binary_tree_level_order.c` - BFS level-order traversal
- `bfs_graph.c` - Breadth-first search on graphs

#### Dynamic Programming & Recursion
- `fibonacci_dp.c` - Fibonacci with memoization
- `factorial.c` - Recursive factorial
- `recursion_fib.c` - Recursive Fibonacci

#### Backtracking
- `n_queens.c` - N-Queens problem solver

#### LeetCode-Style Problems
- `two_sum.c` - Find two numbers summing to target
- `three_sum.c` - Find triplets summing to zero
- `valid_parentheses.c` - Check balanced brackets
- `valid-parentheses.c` - (duplicate, can remove)
- `longest_substring.c` - Longest substring without repeating chars

#### Utility
- `logger.c` - Implementation of logging functions

---

## 📁 `frontend/`

React + Vite frontend for algorithm visualization.

### Root Files

**`package.json`**
- Dependencies: react, framer-motion, lucide-react, tailwindcss
- DevDependencies: vite, eslint, prettier, vitest
- Scripts:
  - `npm run dev` - Start dev server (port 5173)
  - `npm run build` - Production build
  - `npm run lint` - Run ESLint
  - `npm run format` - Auto-format with Prettier
  - `npm run format:check` - Check formatting
  - `npm test` - Run Vitest tests

**`vite.config.js`**
- Vite bundler configuration
- React plugin setup
- Dev server settings

**`vitest.config.js`**
- Vitest test configuration
- jsdom environment for React testing
- Test setup file location

**`eslint.config.js`**
- ESLint configuration
- React-specific rules
- Code quality checks

**`.prettierrc`**
- Prettier formatting rules
- Semi-colons, single quotes, 100 char limit

**`postcss.config.js`**
- PostCSS configuration for Tailwind

**`tailwind.config.js`**
- Tailwind CSS customization
- Theme, colors, plugins

**`index.html`**
- Entry HTML file
- Vite dev server root

**`README.md`**
- Frontend-specific readme (if exists)

### `frontend/.gitignore`

- Frontend-specific ignore patterns
- `node_modules/`, `dist/`, `.env`

### `frontend/public/`

Static assets served as-is:
- Images, icons, fonts
- Anything referenced in HTML

### `frontend/src/`

React application source code.

**`main.jsx`**
- Entry point for React app
- Renders root component
- Imports global CSS

**`App.jsx`**
- Root React component
- Manages global state
- Routes between Dashboard and Visualizer

**`index.css`**
- Global CSS styles
- Tailwind directives
- CSS variables for theming

### `frontend/src/components/`

React components.

**`Dashboard.jsx`**
- Main landing page
- Displays problem cards
- Category filtering
- Handles problem selection

**`VisualizerEngine.jsx`**
- Core visualization component
- Renders algorithm execution steps
- Controls: play, pause, step, speed
- Displays array/data structure visually

**`InterviewMode.jsx`**
- Interview practice mode
- Timer, hints, code editor integration

### `frontend/src/components/ui/`

**`common.jsx`**
- Reusable UI components
- Card, Button, Input, etc.
- Shared styling utilities

### `frontend/src/data/`

**`problems.js`**
- Problem definitions export
- Categories constant
- Array of problem objects with:
  - `id` - Unique identifier (must be unique!)
  - `title` - Display name
  - `category` - From CATEGORIES constant
  - `difficulty` - Easy/Medium/Hard
  - `timeComplexity` - Big O notation
  - `spaceComplexity` - Big O notation
  - `description` - What the algorithm does
  - `codeSnippet` - Example code
  - `inputs` - Input field definitions
  - `runCommand` - Backend C program name

### `frontend/src/assets/`

React-imported assets:
- Images, SVGs, icons used in components

### `frontend/src/test/`

**`setup.js`**
- Vitest global setup
- Imports testing-library matchers
- Test environment configuration

**`Dashboard.test.jsx`**
- Unit tests for Dashboard component
- Tests rendering, filtering, categories

**`problems.test.js`**
- Validates problems.js data
- Checks unique IDs, required fields
- Ensures data integrity

---

## 🔧 How Files Connect

### Startup Flow

1. **Frontend Dev**: `npm run dev` → vite.config.js → main.jsx → App.jsx → Dashboard.jsx
2. **Backend Dev**: `npm start` → server.js (listening on port)
3. **User Action**: Click problem → Dashboard passes to VisualizerEngine
4. **Visualization**: VisualizerEngine → fetch API → server.js → exec C program → return steps
5. **Display**: VisualizerEngine renders animation from steps

### Build Flow

1. **Frontend**: `npm run build` → vite builds → `dist/` (static files)
2. **Backend**: `npm run build` → runs `make all` → compiles C → `build/` directory
3. **Production**: Serve `dist/` + run `server.js` with `build/` programs

### Test Flow

1. **Frontend**: `npm test` → vitest.config.js → loads test/setup.js → runs *.test.{js,jsx}
2. **Backend**: `npm test` → runs `make test` → executes built programs with test inputs

### CI Flow

1. **Push/PR** → GitHub Actions → `.github/workflows/ci.yml`
2. **Frontend job**: install → lint → format check → build → test
3. **Backend job**: install → build C → format check → smoke test
4. **Security job**: npm audit

---

## 📊 File Count Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| Root | 5 | Config + Docs |
| .github/ | 1 | CI/CD |
| backend/ | 32 | API + Algorithms |
| frontend/ | 18+ | React App |
| **Total** | **50+** | Full Project |

---

## 🎯 Key Files for Common Tasks

### Adding a New Algorithm

1. Create `backend/src/algorithm_name.c`
2. Add to `backend/Makefile` ALGORITHMS list
3. Add entry to `frontend/src/data/problems.js`
4. Test: `make algorithm_name`, then run it

### Changing Styles

1. Edit `frontend/src/index.css` (global)
2. Or edit component files (scoped)
3. Or modify `frontend/tailwind.config.js` (theme)

### Adding Tests

1. Create `frontend/src/test/ComponentName.test.jsx`
2. Follow pattern in existing test files
3. Run `npm test` to verify

### Modifying API

1. Edit `backend/server.js`
2. Add/modify Express routes
3. Update frontend fetch calls in VisualizerEngine

### Changing Build

1. Frontend: Edit `vite.config.js`
2. Backend: Edit `Makefile` or `build.bat`

---

## 🚨 Critical Files (Don't Delete!)

- `package.json` (both frontend & backend)
- `vite.config.js` - Frontend won't build
- `server.js` - Backend won't run
- `main.jsx` - React entry point
- `problems.js` - Problem data
- `Makefile` - C builds

---

## 🔄 File Modification Frequency

**High** (change often):
- `frontend/src/components/*.jsx` - Adding features
- `backend/src/*.c` - Adding algorithms
- `frontend/src/data/problems.js` - New problems

**Medium** (occasional):
- `frontend/src/index.css` - Styling updates
- `backend/server.js` - API changes
- Test files - As code changes

**Low** (rarely):
- Config files (vite, eslint, prettier)
- `README.md`, `SETUP.md`
- `.github/workflows/ci.yml`

---

*Last updated: January 18, 2026*
