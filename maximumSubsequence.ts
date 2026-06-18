/**
 * Maximum Subsequence Sum — TypeScript Implementation
 * 
 * Type-safe variant of Kadane's algorithm with explicit interfaces
 * and comprehensive type annotations. Demonstrates how structural
 * typing enhances algorithmic code without runtime overhead.
 * 
 * @author Algorithm Implementation
 * @version 1.0.0
 */

/**
 * Represents the result of a subsequence computation with full metadata
 */
interface SubsequenceResult {
    /** The actual subsequence array */
    readonly sequence: number[];
    /** Sum of all elements in the subsequence */
    readonly sum: number;
    /** Starting index in the original array (inclusive) */
    readonly startIndex: number;
    /** Ending index in the original array (inclusive) */
    readonly endIndex: number;
    /** Length of the subsequence */
    readonly length: number;
}

/**
 * Algorithm configuration options
 */
interface AlgorithmOptions {
    /** Whether to allow empty subsequences (default: true) */
    readonly allowEmpty: boolean;
    /** Whether to return indices alongside the sequence */
    readonly returnIndices: boolean;
}

/**
 * Default algorithm options
 */
const DEFAULT_OPTIONS: AlgorithmOptions = {
    allowEmpty: true,
    returnIndices: false
};

/**
 * Finds the continuous subsequence with maximum sum.
 * 
 * This is the canonical implementation of Kadane's algorithm, modified
 * to return the actual subsequence rather than just the sum value.
 * The algorithm maintains a running window and resets when the cumulative
 * sum becomes negative, since any extension would only decrease the total.
 * 
 * @param arr - Input sequence of integers (read-only to prevent mutation)
 * @returns The maximum sum subsequence (empty if all negative and allowEmpty is true)
 */
function maximumSubsequence(arr: readonly number[]): number[] {
    // Guard clause with type narrowing
    if (!arr || arr.length === 0) {
        return [];
    }

    // Algorithm state — all mutable variables for the scan
    let maxSum: number = 0;
    let currentSum: number = 0;
    let maxStart: number = 0;
    let maxEnd: number = 0;
    let currentStart: number = 0;

    // Single-pass O(n) scan
    for (let i: number = 0; i < arr.length; i++) {
        currentSum += arr[i];

        // Update best window when current exceeds maximum
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = currentStart;
            maxEnd = i + 1;
        }

        // Reset window when sum goes negative
        if (currentSum < 0) {
            currentSum = 0;
            currentStart = i + 1;
        }
    }

    // Return a new array to avoid reference sharing
    return Array.from(arr.slice(maxStart, maxEnd));
}

/**
 * Enhanced version returning full metadata about the subsequence.
 * Useful for debugging, visualization, or when index information is needed.
 * 
 * @param arr - Input sequence of integers
 * @returns SubsequenceResult with sequence, sum, and boundary indices
 */
function maximumSubsequenceDetailed(arr: readonly number[]): SubsequenceResult {
    const sequence: number[] = maximumSubsequence(arr);
    const sum: number = sequence.reduce((accumulator: number, current: number) => accumulator + current, 0);
    
    // Find the indices by matching the subsequence in the original array
    let startIndex: number = 0;
    let endIndex: number = 0;
    
    if (sequence.length > 0) {
        for (let i: number = 0; i <= arr.length - sequence.length; i++) {
            let match: boolean = true;
            for (let j: number = 0; j < sequence.length; j++) {
                if (arr[i + j] !== sequence[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                startIndex = i;
                endIndex = i + sequence.length - 1;
                break;
            }
        }
    }

    return {
        sequence,
        sum,
        startIndex,
        endIndex,
        length: sequence.length
    };
}

// ============================================
// TYPE GUARDS AND VALIDATION
// ============================================

/**
 * Type guard to validate if a value is a valid number array
 */
function isNumberArray(value: unknown): value is number[] {
    return Array.isArray(value) && value.every(item => typeof item === 'number' && !isNaN(item));
}

/**
 * Safe wrapper that validates input before processing
 */
function safeMaximumSubsequence(input: unknown): number[] | null {
    if (!isNumberArray(input)) {
        console.error('Invalid input: expected array of numbers');
        return null;
    }
    return maximumSubsequence(input);
}

// ============================================
// TEST SUITE WITH TYPE ASSERTIONS
// ============================================

interface TestCase {
    readonly name: string;
    readonly input: readonly number[];
    readonly expected: readonly number[];
}

const testCases: TestCase[] = [
    {
        name: "Mixed sequence with negative dip",
        input: [1, 2, -1, 3, 10, -10],
        expected: [1, 2, -1, 3, 10]
    },
    {
        name: "Leading zero preserves window",
        input: [0, 8, 10, -2, -4, -1, -5, -3],
        expected: [0, 8, 10]
    },
    {
        name: "Two positives before negative",
        input: [9, 9, -10, 1],
        expected: [9, 9]
    },
    {
        name: "Short positive window",
        input: [7, 1, -5, -3, -8, 1],
        expected: [7, 1]
    },
    {
        name: "Negative prefix, positive core",
        input: [-3, 6, -1, 4, -4, -6],
        expected: [6, -1, 4]
    },
    {
        name: "Long complex sequence",
        input: [-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1],
        expected: [3, 5, 6, -2, -1, 4]
    }
];

function runTests(): { passed: number; failed: number } {
    let passed: number = 0;
    let failed: number = 0;

    testCases.forEach((test: TestCase) => {
        const result: number[] = maximumSubsequence(test.input);
        const isPass: boolean = JSON.stringify(result) === JSON.stringify(test.expected);
        
        console.log(`${isPass ? '✓' : '✗'} ${test.name}`);
        console.log(`  Input:    [${test.input.join(', ')}]`);
        console.log(`  Expected: [${test.expected.join(', ')}]`);
        console.log(`  Got:      [${result.join(', ')}]`);
        
        isPass ? passed++ : failed++;
    });

    console.log(`\nResults: ${passed} passed, ${failed} failed`);
    return { passed, failed };
}

// ============================================
// EXPORTS
// ============================================

export {
    maximumSubsequence,
    maximumSubsequenceDetailed,
    safeMaximumSubsequence,
    isNumberArray,
    runTests
};

export type {
    SubsequenceResult,
    AlgorithmOptions,
    TestCase
};

// Run tests in development
if (process.env.NODE_ENV === 'development') {
    runTests();
}
