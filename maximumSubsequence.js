/**
 * Maximum Subsequence Sum — Kadane's Algorithm
 * 
 * A linear-time solution to the maximum subarray problem using dynamic programming.
 * Scans the input array once, maintaining a running sum and tracking the optimal
 * window boundaries. When the running sum drops below zero, the window resets
 * because any extension would only decrease the total.
 * 
 * Time Complexity: O(n) — single pass
 * Space Complexity: O(1) auxiliary, O(k) for result
 * 
 * Historical Context:
 * This problem was first proposed by Ulf Grenander in 1977 as a simplified model
 * for maximum likelihood estimation in digitized images. Grenander derived an O(n²)
 * algorithm. Michael Shamos improved this to O(n log n) using divide-and-conquer.
 * Jay Kadane, attending a CMU seminar where Shamos described the problem, designed
 * the O(n) solution within a minute (Bentley, 1984; Kadane, 2023).
 * 
 * References:
 * Bentley, J. (1984). Algorithm Design Techniques. Communications of the ACM, 27(9), 865-871.
 * Kadane, J. B. (2023). Two Kadane Algorithms for the Maximum Sum Subarray Problem. 
 *     Algorithms, 16(11), 519. https://doi.org/10.3390/a16110519
 * Gries, D. (1982). A Note on the Standard Strategy for Developing Loop Invariants 
 *     and Loops. Science of Computer Programming, 2(3), 207-241.
 */

/**
 * Finds the continuous subsequence with maximum sum.
 * 
 * @param {number[]} arr - Input sequence of integers
 * @returns {number[]} The maximum sum subsequence (empty if all negative)
 */
function maximumSubsequence(arr) {
    // Guard clause: empty input returns empty array
    if (!arr || arr.length === 0) {
        return [];
    }

    // State variables for Kadane's algorithm
    let maxSum = 0;          // Best sum found so far
    let currentSum = 0;    // Running sum of current window
    let maxStart = 0;      // Start index of best window
    let maxEnd = 0;        // End index (exclusive) of best window
    let currentStart = 0;  // Start index of current window

    // Single-pass scan — the heart of Kadane's algorithm
    for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];

        // Update maximum if current window exceeds best found
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = currentStart;
            maxEnd = i + 1;
        }

        // Reset when running sum goes negative — any extension would only decrease total
        if (currentSum < 0) {
            currentSum = 0;
            currentStart = i + 1;
        }
    }

    // Extract and return the optimal subsequence
    return arr.slice(maxStart, maxEnd);
}

// ============================================
// TEST SUITE
// ============================================

const testCases = [
    {
        name: "Test 1: Mixed sequence",
        input: [1, 2, -1, 3, 10, -10],
        expected: [1, 2, -1, 3, 10]
    },
    {
        name: "Test 2: Leading zero, then positive",
        input: [0, 8, 10, -2, -4, -1, -5, -3],
        expected: [0, 8, 10]
    },
    {
        name: "Test 3: Two positives, then negative",
        input: [9, 9, -10, 1],
        expected: [9, 9]
    },
    {
        name: "Test 4: Short positive window",
        input: [7, 1, -5, -3, -8, 1],
        expected: [7, 1]
    },
    {
        name: "Test 5: Negative prefix, positive core",
        input: [-3, 6, -1, 4, -4, -6],
        expected: [6, -1, 4]
    },
    {
        name: "Test 6: Long complex sequence",
        input: [-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1],
        expected: [3, 5, 6, -2, -1, 4]
    }
];

function runTests() {
    console.log("═".repeat(60));
    console.log("  MAXIMUM SUBSEQUENCE SUM — TEST SUITE");
    console.log("═".repeat(60));
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach((test, index) => {
        const result = maximumSubsequence(test.input);
        const resultStr = JSON.stringify(result);
        const expectedStr = JSON.stringify(test.expected);
        const isPass = resultStr === expectedStr;
        
        const status = isPass ? "✓ PASS" : "✗ FAIL";
        const color = isPass ? "\x1b[32m" : "\x1b[31m";
        const reset = "\x1b[0m";
        
        console.log(`\n${color}${status}${reset} ${test.name}`);
        console.log(`  Input:    [${test.input.join(", ")}]`);
        console.log(`  Expected: [${test.expected.join(", ")}]`);
        console.log(`  Got:      [${result.join(", ")}]`);
        
        if (isPass) passed++;
        else failed++;
    });
    
    console.log(`\n` + "═".repeat(60));
    console.log(`  Results: ${passed} passed, ${failed} failed`);
    console.log("═".repeat(60));
    
    return { passed, failed, total: testCases.length };
}

// Run tests if in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { maximumSubsequence, runTests };
    
    // Auto-run tests when executed directly
    if (require.main === module) {
        runTests();
    }
}
