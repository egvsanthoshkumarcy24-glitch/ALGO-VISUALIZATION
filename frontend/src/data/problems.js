export const CATEGORIES = {
    ARRAYS: "Arrays & Hashing",
    SORTING: "Sorting",
    TWO_POINTERS: "Two Pointers",
    SLIDING_WINDOW: "Sliding Window",
    STACK: "Stack",
    BINARY_SEARCH: "Binary Search",
    LINKED_LIST: "Linked List",
    TREES: "Trees",
    GRAPHS: "Graphs",
    DP: "Dynamic Programming",
    BACKTRACKING: "Backtracking",
    RECURSION: "Recursion"
};

export const PROBLEMS = [
    {
        id: 'bubble_sort',
        title: 'Bubble Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Repeatedly swap adjacent elements if they are in the wrong order.',
        codeSnippet: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(&arr[j], &arr[j+1]);
            }
        }
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void bubbleSort(int arr[], int n) {
    // Outer loop for each pass
    for (int i = 0; i < n - 1; i++) {
        // Inner loop for comparison in each pass
        // After i passes, last i elements are sorted
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in wrong order
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    bubbleSort(arr, n);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "29, 10, 14, 37, 14, 5, 12, 20" }
        ],
        runCommand: 'bubble_sort'
    },
    {
        id: 'selection_sort',
        title: 'Selection Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Repeatedly find the minimum element from the unsorted part and put it at the beginning.',
        codeSnippet: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(&arr[min_idx], &arr[i]);
    }
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "64, 25, 12, 22, 11" }
        ],
        runCommand: 'selection_sort'
    },
    {
        id: 'insertion_sort',
        title: 'Insertion Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Easy',
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: 'Build the sorted array one item at a time by repeatedly picking the next element and inserting it into the correct position.',
        codeSnippet: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "12, 11, 13, 5, 6" }
        ],
        runCommand: 'insertion_sort'
    },
    {
        id: 'merge_sort',
        title: 'Merge Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: 'Divide the array into halves, sort them, and then merge the sorted halves. A classic divide-and-conquer algorithm.',
        codeSnippet: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

// Merge function - combines two sorted subarrays
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;  // Size of left subarray
    int n2 = right - mid;     // Size of right subarray
    
    // Create temporary arrays
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temporary arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Merge the temp arrays back into arr[left..right]
    i = 0;    // Initial index of first subarray
    j = 0;    // Initial index of second subarray
    k = left; // Initial index of merged subarray
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Copy remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
    free(L);
    free(R);
}

// Main merge sort function
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;
        
        // Sort first half
        mergeSort(arr, left, mid);
        
        // Sort second half
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    mergeSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "12, 11, 13, 5, 6, 7" }
        ],
        runCommand: 'merge_sort'
    },
    {
        id: 'quick_sort',
        title: 'Quick Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        description: 'Pick a pivot element and partition the array around it, then recursively sort the partitions. Efficient in-place sorting algorithm.',
        codeSnippet: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        fullCode: `#include <stdio.h>

// Swap function
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Partition function - places pivot in correct position
// and arranges smaller elements to left, larger to right
int partition(int arr[], int low, int high) {
    // Choose the rightmost element as pivot
    int pivot = arr[high];
    
    // Index of smaller element - indicates
    // the right position of pivot found so far
    int i = (low - 1);
    
    // Traverse through all elements
    // Compare each element with pivot
    for (int j = low; j < high; j++) {
        // If current element is smaller than pivot
        if (arr[j] < pivot) {
            i++; // Increment index of smaller element
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Place pivot in correct position
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

// Main quick sort function
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index
        // arr[pi] is now at right place
        int pi = partition(arr, low, high);
        
        // Recursively sort elements before partition
        quickSort(arr, low, pi - 1);
        
        // Recursively sort elements after partition
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    quickSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'quick_sort'
    },
    {
        id: 'randomized_quick_sort',
        title: 'Randomized Quick Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        description: 'Quick Sort using a random element as the pivot.',
        codeSnippet: `int partition(int arr[], int low, int high) {
    srand(time(NULL));
    int random = low + rand() % (high - low);
    swap(&arr[random], &arr[high]);
    // Standard partition...
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "10, 7, 8, 9, 1, 5" }
        ],
        runCommand: 'randomized_quick_sort'
    },
    {
        id: 'counting_sort',
        title: 'Counting Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        timeComplexity: "O(n+k)",
        spaceComplexity: "O(k)",
        description: 'An integer sorting algorithm that counts the number of objects with distinct key values.',
        codeSnippet: `void countingSort(int arr[], int n) {
    // Logic to count occurrences and rebuild array
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "4, 2, 2, 8, 3, 3, 1" }
        ],
        runCommand: 'counting_sort'
    },
    {
        id: 'radix_sort',
        title: 'Radix Sort',
        category: CATEGORIES.SORTING,
        difficulty: 'Medium',
        timeComplexity: "O(nk)",
        spaceComplexity: "O(n+k)",
        description: 'Sorts integers by processing individual digits.',
        codeSnippet: `void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,
        inputs: [
            { name: "nums", label: "Array to Sort", type: "array", defaultValue: "170, 45, 75, 90, 802, 24, 2, 66" }
        ],
        runCommand: 'radix_sort'
    },
    {
        id: "binary_search",
        title: "Binary Search",
        category: CATEGORIES.SORTING,
        difficulty: "Easy",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
        codeSnippet: `int search(int* nums, int numsSize, int target){
    int l = 0, r = numsSize - 1;
    while(l <= r) {
        int m = l + (r-l)/2;
        if(nums[m] == target) return m;
        if(nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
        fullCode: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        // Calculate middle index
        // Using left + (right - left) / 2 to avoid overflow
        int mid = left + (right - left) / 2;
        
        // Check if target is at mid
        if (arr[mid] == target) {
            return mid;  // Target found
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    return -1;  // Target not found
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    int result = binarySearch(arr, n, target);
    
    if (result != -1)
        printf("Element found at index %d\\n", result);
    else
        printf("Element not found in array\\n");
    
    return 0;
}`,
        inputs: [
            { name: "target", label: "Target Value", type: "number", defaultValue: "8" },
            { name: "nums", label: "Sorted Array", type: "array", defaultValue: "2, 5, 8, 12, 16, 23, 38, 56, 72, 91" }
        ]
    },
    {
        id: "two_sum",
        title: "Two Sum",
        category: CATEGORIES.ARRAYS,
        difficulty: "Easy",
        timeComplexity: "O(n²)", // or O(n) for hashmap
        spaceComplexity: "O(1)",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        codeSnippet: `/* Brute Force Approach */
for(int i=0; i<n; i++) {
  for(int j=i+1; j<n; j++) {
    if(nums[i] + nums[j] == target) {
       return {i, j};
    }
  }
}`,
        inputs: [
            { name: "target", label: "Target Sum", type: "number", defaultValue: "9" },
            { name: "nums", label: "Input Array (comma separated)", type: "array", defaultValue: "2, 7, 11, 15" }
        ]
    },
    {
        id: "three_sum",
        title: "3Sum",
        category: CATEGORIES.ARRAYS,
        difficulty: "Medium",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        codeSnippet: `// Sort array first
sort(nums);
for(int i=0; i<n-2; i++) {
    int l = i+1, r = n-1;
    while(l < r) {
        int sum = nums[i] + nums[l] + nums[r];
        if(sum == 0) {
            // Found triplet, skip duplicates
            l++; r--;
        } else if(sum < 0) l++;
        else r--;
    }
}`,
        inputs: [
            { name: "nums", label: "Input Array", type: "array", defaultValue: "-1, 0, 1, 2, -1, -4" }
        ]
    },
    {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        category: CATEGORIES.STACK,
        difficulty: "Easy",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        codeSnippet: `bool isValid(char * s){
    // ... stack implementation ...
    for(int i=0; s[i]!='\0'; i++) {
        char c = s[i];
        if(c=='(' || c=='{' || c=='[') push(c);
        else {
            if(isEmpty()) return false;
            // check match
            pop();
        }
    }
    return isEmpty();
}`,
        inputs: [
            { name: "s", label: "Input String", type: "text", defaultValue: "()[]{}" }
        ],
        runCommand: 'valid_parentheses'
    },
    {
        id: "reverse_linked_list",
        title: "Reverse Linked List",
        category: CATEGORIES.LINKED_LIST,
        difficulty: "Easy",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        codeSnippet: `struct ListNode* reverseList(struct ListNode* head){
    struct ListNode *prev = NULL;
    struct ListNode *curr = head;
    while(curr != NULL) {
        struct ListNode *nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        inputs: [
            { name: "values", label: "List Values (comma separated)", type: "array", defaultValue: "1, 2, 3, 4, 5" }
        ]
    },
    {
        id: "binary_tree_level_order",
        title: "Binary Tree Level Order",
        category: CATEGORIES.TREES,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        codeSnippet: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    // BFS using Queue
}`,
        inputs: [
            { name: "nodes", label: "Tree Nodes (Level Order as Array, null for empty)", type: "array", defaultValue: "3, 9, 20, null, null, 15, 7" }
        ]
    },
    {
        id: "longest_substring",
        title: "Longest Substring Without Repeating",
        category: CATEGORIES.SLIDING_WINDOW,
        difficulty: "Medium",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        codeSnippet: `int lengthOfLongestSubstring(char * s){
    int n = strlen(s);
    int map[128];
    for(int i=0;i<128;i++) map[i]=-1;
    int maxLen = 0, left = 0;
    
    for(int right=0; right<n; right++){
        if(map[s[right]] >= left){
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        int len = right - left + 1;
        if(len > maxLen) maxLen = len;
    }
    return maxLen;
}`,
        inputs: [
            { name: "s", label: "Input String", type: "text", defaultValue: "abcabcbb" }
        ]
    },
    {
        id: "bfs_graph",
        title: "Graph BFS",
        category: CATEGORIES.GRAPHS,
        difficulty: "Medium",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Perform Breadth First Search traversal on a Graph starting from node 0.",
        codeSnippet: `// Standard BFS with Queue`,
        inputs: [
            { name: "start_node", label: "Start Node (0-4)", type: "number", defaultValue: "0" }
        ]
    },
    {
        id: "fibonacci_dp",
        title: "Fibonacci (DP)",
        category: CATEGORIES.DP,
        difficulty: "Easy",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Calculate the Nth Fibonacci number using Dynamic Programming (Memoization table).",
        codeSnippet: `int fib(int n) {
    int dp[n+1];
    dp[0]=0; dp[1]=1;
    for(int i=2; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}`,
        inputs: [
            { name: "n", label: "Nth Number", type: "number", defaultValue: "7" }
        ]
    },
    {
        id: "n_queens",
        title: "N-Queens",
        category: CATEGORIES.BACKTRACKING,
        difficulty: "Hard",
        timeComplexity: "O(N!)",
        spaceComplexity: "O(N)",
        description: "Place N queens on an NxN chessboard such that no two queens attack each other.",
        codeSnippet: `void solve(int row) {
    if (row == N) return;
    for (int col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            queens[row] = col;
            solve(row + 1);
            queens[row] = -1; // backtrack
        }
    }
}`,
        inputs: [
            { name: "n", label: "Grid Size (N)", type: "number", defaultValue: "4" }
        ]
    }, // Add more problems here as we implement them
    {
        id: 'stack_ll',
        title: 'Stack (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Easy',
        description: 'Implement a Stack using a Linked List (LIFO).',
        codeSnippet: `// Stack Operations using Linked List Node`,
        inputs: [
            { name: "nums", label: "Push Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'stack_ll'
    },
    {
        id: 'queue_ll',
        title: 'Queue (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Easy',
        description: 'Implement a Queue using a Linked List (FIFO).',
        codeSnippet: `// Queue Operations using Linked List Node`,
        inputs: [
            { name: "nums", label: "Enqueue Elements", type: "array", defaultValue: "1, 2, 3, 4" }
        ],
        runCommand: 'queue_ll'
    },
    {
        id: 'doubly_linked_list',
        title: 'Doubly Linked List',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Medium',
        description: 'A linked list where each node contains a reference to the previous node as well.',
        codeSnippet: `struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`,
        inputs: [
            { name: "nums", label: "List Elements", type: "array", defaultValue: "10, 20, 30, 40" }
        ],
        runCommand: 'doubly_linked_list'
    },
    {
        id: 'deque_ll',
        title: 'Deque (Linked List)',
        category: CATEGORIES.LINKED_LIST,
        difficulty: 'Medium',
        description: 'Double Ended Queue allowing insertion and deletion at both ends.',
        codeSnippet: `// Deque Operations`,
        inputs: [
            { name: "nums", label: "Elements", type: "array", defaultValue: "5, 10, 15, 20" }
        ],
        runCommand: 'deque_ll'
    },
    {
        id: 'factorial',
        title: 'Factorial (Recursion)',
        category: CATEGORIES.RECURSION,
        difficulty: 'Easy',
        description: 'Calculate N! recursively.',
        codeSnippet: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}`,
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "5" }
        ],
        runCommand: 'factorial'
    },
    {
        id: 'recursion_fib',
        title: 'Fibonacci (Recursion)',
        category: CATEGORIES.RECURSION,
        difficulty: 'Easy',
        description: 'Calculate Nth Fibonacci number recursively.',
        codeSnippet: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "4" }
        ],
        runCommand: 'recursion_fib'
    }
];
