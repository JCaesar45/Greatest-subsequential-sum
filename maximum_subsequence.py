#!/usr/bin/env python3
"""
Maximum Subsequence Sum — Kadane's Algorithm Implementation

A linear-time solution to the maximum subarray problem using dynamic programming.
The algorithm scans the input sequence once, maintaining a running sum and tracking
the optimal window boundaries. When the running sum drops below zero, the window
resets because any extension would only decrease the total.

Time Complexity: O(n) — single pass through the array
Space Complexity: O(1) auxiliary, O(k) for result where k is subsequence length

Historical Context:
This problem was first proposed by Ulf Grenander in 1977 as a simplified model
for maximum likelihood estimation in digitized images. Grenander derived an O(n²)
algorithm. Michael Shamos improved this to O(n log n) using divide-and-conquer.
Jay Kadane, attending a CMU seminar where Shamos described the problem, designed
the O(n) solution within a minute (Bentley, 1984; Kadane, 2023).

References:
    Bentley, J. (1984). Algorithm Design Techniques. Communications of the ACM,
        27(9), 865-871. https://doi.org/10.1145/358234.381162
    Kadane, J. B. (2023). Two Kadane Algorithms for the Maximum Sum Subarray Problem.
        Algorithms, 16(11), 519. https://doi.org/10.3390/a16110519
    Gries, D. (1982). A Note on the Standard Strategy for Developing Loop Invariants
        and Loops. Science of Computer Programming, 2(3), 207-241.
    Bird, R. S. (1989). Algebraic Identities for Program Calculation. The Computer
        Journal, 32(2), 122-126.

Author: Algorithm Implementation
Version: 1.0.0
"""

from typing import List, Tuple, Optional


def maximum_subsequence(arr: List[int]) -> List[int]:
    """
    Find the continuous subsequence with maximum sum.

    Implements Kadane's algorithm modified to return the actual subsequence
    rather than just the maximum sum value. The algorithm maintains a running
    window and resets when the cumulative sum becomes negative.

    Args:
        arr: List of integers representing the input sequence

    Returns:
        The subsequence with maximum sum. Returns an empty list if all
        elements are negative (empty subsequence has sum 0).

    Raises:
        TypeError: If input is not a list
    """
    if not isinstance(arr, list):
        raise TypeError("Input must be a list of integers")

    if not arr:
        return []

    # Algorithm state variables
    max_sum: int = 0          # Best sum found so far
    current_sum: int = 0      # Running sum of current window
    max_start: int = 0        # Start index of best window
    max_end: int = 0          # End index (exclusive) of best window
    current_start: int = 0    # Start index of current window

    # Single-pass O(n) scan — the core of Kadane's algorithm
    for i, num in enumerate(arr):
        current_sum += num

        # Update best window when current exceeds maximum
        if current_sum > max_sum:
            max_sum = current_sum
            max_start = current_start
            max_end = i + 1

        # Reset window when sum goes negative
        # Rationale: any extension of a negative window would only
        # decrease the total, so starting fresh is optimal
        if current_sum < 0:
            current_sum = 0
            current_start = i + 1

    # Extract and return the optimal subsequence
    return arr[max_start:max_end]


def maximum_subsequence_with_metadata(arr: List[int]) -> Tuple[List[int], int, int, int]:
    """
    Enhanced version returning subsequence with full metadata.

    Args:
        arr: List of integers

    Returns:
        Tuple containing:
        - subsequence: The maximum sum subsequence
        - total_sum: Sum of the subsequence elements
        - start_index: Starting index in original array (inclusive)
        - end_index: Ending index in original array (inclusive)
    """
    result = maximum_subsequence(arr)
    total = sum(result)

    start_idx = 0
    end_idx = 0

    if result:
        # Find the indices by matching the subsequence
        for i in range(len(arr) - len(result) + 1):
            if arr[i:i + len(result)] == result:
                start_idx = i
                end_idx = i + len(result) - 1
                break

    return result, total, start_idx, end_idx


# ============================================
# TEST SUITE
# ============================================

def run_tests() -> dict:
    """
    Execute the full test suite and report results.

    Returns:
        Dictionary with passed, failed, and total counts
    """
    test_cases = [
        {
            "name": "Mixed sequence with negative dip",
            "input": [1, 2, -1, 3, 10, -10],
            "expected": [1, 2, -1, 3, 10]
        },
        {
            "name": "Leading zero preserves window",
            "input": [0, 8, 10, -2, -4, -1, -5, -3],
            "expected": [0, 8, 10]
        },
        {
            "name": "Two positives before negative",
            "input": [9, 9, -10, 1],
            "expected": [9, 9]
        },
        {
            "name": "Short positive window",
            "input": [7, 1, -5, -3, -8, 1],
            "expected": [7, 1]
        },
        {
            "name": "Negative prefix, positive core",
            "input": [-3, 6, -1, 4, -4, -6],
            "expected": [6, -1, 4]
        },
        {
            "name": "Long complex sequence",
            "input": [-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1],
            "expected": [3, 5, 6, -2, -1, 4]
        }
    ]

    passed = 0
    failed = 0

    print("=" * 60)
    print("  MAXIMUM SUBSEQUENCE SUM — TEST SUITE")
    print("=" * 60)

    for test in test_cases:
        result = maximum_subsequence(test["input"])
        is_pass = result == test["expected"]
        status = "PASS" if is_pass else "FAIL"

        print(f"\n{status}: {test['name']}")
        print(f"  Input:    {test['input']}")
        print(f"  Expected: {test['expected']}")
        print(f"  Got:      {result}")

        if is_pass:
            passed += 1
        else:
            failed += 1

    print("\n" + "=" * 60)
    print(f"  Results: {passed} passed, {failed} failed")
    print("=" * 60)

    return {"passed": passed, "failed": failed, "total": len(test_cases)}


if __name__ == "__main__":
    run_tests()
