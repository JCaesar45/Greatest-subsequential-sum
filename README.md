# Maximum Subsequence Sum — Kadane's Algorithm

> A luxurious, interactive visualization of the classic maximum subarray problem, implementing Kadane's O(n) algorithm across JavaScript, TypeScript, and Python.

[![Algorithm](https://img.shields.io/badge/Algorithm-Kadane's-gold)](https://en.wikipedia.org/wiki/Maximum_subarray_problem)
[![Complexity](https://img.shields.io/badge/Time-O(n)-cyan)](https://en.wikipedia.org/wiki/Time_complexity)
[![Space](https://img.shields.io/badge/Space-O(1)-green)](https://en.wikipedia.org/wiki/Space_complexity)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## 🎯 Problem Statement

Given a sequence of integers, find a **continuous subsequence** which maximizes the sum of its elements. An empty subsequence is considered to have sum `0`; thus if all elements are negative, the result must be the empty sequence.

### Example
```
Input:  [1, 2, -1, 3, 10, -10]
Output: [1, 2, -1, 3, 10]  // Sum = 15
```

---

## 🧠 Algorithm: Kadane's Algorithm

This implementation uses **Kadane's algorithm**, a dynamic programming approach that solves the maximum subarray problem in **linear time O(n)** with **constant auxiliary space O(1)**.

### The Insight

The algorithm scans the array once, maintaining a running sum. The key insight is: **if the running sum ever drops below zero, we reset the window**. Why? Because any extension of a negative-sum window would only decrease the total — starting fresh from the next element is always better.

### Algorithm Steps

1. **Initialize**: `maxSum = 0`, `currentSum = 0`, track window boundaries
2. **Iterate**: For each element, add it to `currentSum`
3. **Update Maximum**: If `currentSum > maxSum`, record new best window
4. **Reset on Negative**: If `currentSum < 0`, reset to 0 and move window start
5. **Return**: Extract subsequence from `arr[maxStart:maxEnd]`

### Pseudocode
```
function maximumSubsequence(arr):
    maxSum ← 0
    currentSum ← 0
    maxStart ← 0, maxEnd ← 0
    currentStart ← 0

    for i from 0 to arr.length - 1:
        currentSum ← currentSum + arr[i]

        if currentSum > maxSum:
            maxSum ← currentSum
            maxStart ← currentStart
            maxEnd ← i + 1

        if currentSum < 0:
            currentSum ← 0
            currentStart ← i + 1

    return arr[maxStart:maxEnd]
```

---

## 📁 Project Structure

```
maximum-subsequence-sum/
├── maximum_subsequence_sum.html    # Interactive web visualizer
├── maximumSubsequence.js           # JavaScript implementation + tests
├── maximumSubsequence.ts           # TypeScript implementation + types
├── maximum_subsequence.py          # Python implementation + tests
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Web Visualizer (Recommended)

Open `maximum_subsequence_sum.html` in any modern browser:

```bash
# macOS
open maximum_subsequence_sum.html

# Linux
xdg-open maximum_subsequence_sum.html

# Windows
start maximum_subsequence_sum.html
```

Features:
- **Step-by-step animation** of Kadane's algorithm
- **6 preset test cases** from the specification
- **Real-time state visualization** (current sum, max sum, window boundaries)
- **Adjustable animation speed** (100ms - 2000ms)
- **Interactive array visualization** with highlighted windows
- **Code tabs** showing JavaScript, TypeScript, and Python implementations

### JavaScript / Node.js

```javascript
const { maximumSubsequence } = require('./maximumSubsequence');

const result = maximumSubsequence([1, 2, -1, 3, 10, -10]);
console.log(result); // [1, 2, -1, 3, 10]

// Run test suite
const { runTests } = require('./maximumSubsequence');
runTests();
```

### TypeScript

```typescript
import { maximumSubsequence, maximumSubsequenceDetailed } from './maximumSubsequence';

const result = maximumSubsequence([1, 2, -1, 3, 10, -10]);
// result: number[] = [1, 2, -1, 3, 10]

const detailed = maximumSubsequenceDetailed([1, 2, -1, 3, 10, -10]);
// detailed: { sequence, sum, startIndex, endIndex, length }
```

### Python

```python
from maximum_subsequence import maximum_subsequence

result = maximum_subsequence([1, 2, -1, 3, 10, -10])
print(result)  # [1, 2, -1, 3, 10]

# Run tests
from maximum_subsequence import run_tests
run_tests()
```

---

## ✅ Test Results

All 6 test cases from the specification pass:

| Test | Input | Expected | Status |
|------|-------|----------|--------|
| 1 | `[1, 2, -1, 3, 10, -10]` | `[1, 2, -1, 3, 10]` | ✅ PASS |
| 2 | `[0, 8, 10, -2, -4, -1, -5, -3]` | `[0, 8, 10]` | ✅ PASS |
| 3 | `[9, 9, -10, 1]` | `[9, 9]` | ✅ PASS |
| 4 | `[7, 1, -5, -3, -8, 1]` | `[7, 1]` | ✅ PASS |
| 5 | `[-3, 6, -1, 4, -4, -6]` | `[6, -1, 4]` | ✅ PASS |
| 6 | `[-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1]` | `[3, 5, 6, -2, -1, 4]` | ✅ PASS |

---

## 🎨 Web Visualizer Features

### Design Philosophy
The visualizer follows a **dark luxury aesthetic** with:
- **Gold accent palette** (`#d4a853`) for maximum values and highlights
- **Cyan accents** (`#5ce1e6`) for current state and code
- **Animated particle background** with mouse interaction
- **Glassmorphism cards** with subtle borders and glow effects
- **Monospace typography** (JetBrains Mono) for code and data
- **Geometric sans-serif** (Space Grotesk) for headings

### Interactive Elements
- **Preset buttons** load each test case instantly
- **Speed slider** controls animation pace (100ms - 2000ms)
- **Step visualization** shows algorithm state at each iteration
- **Progress bar** tracks scan progress
- **Result animation** with staggered element reveals
- **Clickable test cases** that auto-load into the visualizer

---

## 📚 Academic References

This implementation is grounded in the following scholarly sources:

- **Bentley, J. (1984).** Algorithm Design Techniques. *Communications of the ACM*, 27(9), 865-871. https://doi.org/10.1145/358234.381162
  - The canonical "Programming Pearls" column that introduced and popularized this problem.

- **Kadane, J. B. (2023).** Two Kadane Algorithms for the Maximum Sum Subarray Problem. *Algorithms*, 16(11), 519. https://doi.org/10.3390/a16110519
  - The original author's retrospective, clarifying two variants of the algorithm and their historical context.

- **Gries, D. (1982).** A Note on the Standard Strategy for Developing Loop Invariants and Loops. *Science of Computer Programming*, 2(3), 207-241.
  - Formal verification approach using Dijkstra's standard strategy, arriving at the same O(n) solution.

- **Bird, R. S. (1989).** Algebraic Identities for Program Calculation. *The Computer Journal*, 32(2), 122-126.
  - Derivation of the algorithm through purely algebraic manipulation using the Bird-Meertens formalism.

- **Grenander, U. (1977).** Pattern Analysis for the Maximum Likelihood Estimation of Patterns in Digitized Images. *Brown University Technical Report*.
  - Original formulation of the problem as a simplified 1D model for 2D image pattern recognition.

---

## 🔧 Technical Specifications

| Aspect | Specification |
|--------|---------------|
| **Algorithm** | Kadane's Algorithm (modified for subsequence extraction) |
| **Time Complexity** | O(n) — single pass |
| **Space Complexity** | O(1) auxiliary, O(k) for result |
| **Paradigm** | Dynamic Programming |
| **Empty Handling** | Returns `[]` (sum = 0) when all elements negative |
| **Language Support** | JavaScript (ES6+), TypeScript (4.0+), Python (3.7+) |
| **Browser Support** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

---

## 📝 License

MIT License — free for personal and commercial use.

---

<p align="center">
  <sub>Built with precision. Inspired by the elegance of linear algorithms.</sub>
</p>
