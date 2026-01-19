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
        beginnerTips: [
            "Start by comparing the first two elements",
            "If they're in wrong order, swap them",
            "Move to the next pair and repeat",
            "After each full pass, the largest element reaches its final position",
            "Continue until no more swaps are needed"
        ],
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
        beginnerTips: [
            "Find the smallest element in the unsorted portion",
            "Swap it with the first unsorted element",
            "Move the boundary of sorted/unsorted portions",
            "Repeat until entire array is sorted",
            "Each pass guarantees one more element in its final position"
        ],
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
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void selectionSort(int arr[], int n) {
    // One by one move boundary of unsorted subarray
    for (int i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (min_idx != i) {
            swap(&arr[min_idx], &arr[i]);
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    selectionSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
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
        beginnerTips: [
            "Start from second element (assume first is sorted)",
            "Pick current element as 'key'",
            "Compare key with elements before it",
            "Shift larger elements one position right",
            "Insert key in its correct position"
        ],
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
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void insertionSort(int arr[], int n) {
    // Start from second element (index 1)
    for (int i = 1; i < n; i++) {
        // Store current element as key
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        
        // Insert key at its correct position
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    insertionSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
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
        beginnerTips: [
            "Split the array in half repeatedly until you have single elements",
            "Single elements are already 'sorted'",
            "Merge pairs of sorted arrays back together in order",
            "Keep merging until you have one fully sorted array",
            "Think of it like organizing cards: spread them out, then collect them in order"
        ],
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
        beginnerTips: [
            "Choose a 'pivot' element (usually the last one)",
            "Move all smaller elements to the left of pivot",
            "Move all larger elements to the right of pivot",
            "Now the pivot is in its correct final position!",
            "Repeat this process on left and right sides"
        ],
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
        beginnerTips: [
            "Similar to Quick Sort but with random pivot",
            "Random pivot helps avoid worst-case scenarios",
            "Better average performance on pre-sorted data",
            "Same partitioning logic as regular Quick Sort",
            "Randomization provides probabilistic guarantee"
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        description: 'Quick Sort using a random element as the pivot.',
        codeSnippet: `int partition(int arr[], int low, int high) {
    srand(time(NULL));
    int random = low + rand() % (high - low);
    swap(&arr[random], &arr[high]);
    // Standard partition...
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    // Pick a random element as pivot
    srand(time(NULL));
    int random = low + rand() % (high - low + 1);
    swap(&arr[random], &arr[high]);
    
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void randomizedQuickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        randomizedQuickSort(arr, low, pi - 1);
        randomizedQuickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    randomizedQuickSort(arr, 0, n - 1);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
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
        beginnerTips: [
            "Works only for non-negative integers",
            "Count how many times each number appears",
            "Calculate cumulative counts",
            "Place elements in output array using counts",
            "Very fast but needs extra space"
        ],
        timeComplexity: "O(n+k)",
        spaceComplexity: "O(k)",
        description: 'An integer sorting algorithm that counts the number of objects with distinct key values.',
        codeSnippet: `void countingSort(int arr[], int n) {
    // Logic to count occurrences and rebuild array
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

void countingSort(int arr[], int n) {
    // Find the maximum element
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    
    // Create count array and initialize to 0
    int* count = (int*)calloc(max + 1, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));
    
    // Store count of each element
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    // Change count[i] so it contains actual position
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    // Copy output to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    free(count);
    free(output);
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    countingSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
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
        beginnerTips: [
            "Sort numbers digit by digit",
            "Start from least significant digit (rightmost)",
            "Use counting sort for each digit",
            "Move to next more significant digit",
            "Very efficient for large numbers"
        ],
        timeComplexity: "O(nk)",
        spaceComplexity: "O(n+k)",
        description: 'Sorts integers by processing individual digits.',
        codeSnippet: `void radixSort(int arr[], int n) {
    int m = getMax(arr, n);
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

int getMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

void countSort(int arr[], int n, int exp) {
    int* output = (int*)malloc(n * sizeof(int));
    int count[10] = {0};
    
    // Store count of occurrences
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    // Change count[i] to actual position
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    // Build output array
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    // Copy to original array
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
    
    free(output);
}

void radixSort(int arr[], int n) {
    // Find maximum to know number of digits
    int m = getMax(arr, n);
    
    // Do counting sort for every digit
    // exp is 10^i where i is current digit number
    for (int exp = 1; m / exp > 0; exp *= 10)
        countSort(arr, n, exp);
}

int main() {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    radixSort(arr, n);
    
    printf("\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
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
        beginnerTips: [
            "Array MUST be sorted first - binary search won't work on unsorted data",
            "Start by looking at the middle element",
            "Is middle element your target? Done!",
            "Target smaller? Search the left half. Target bigger? Search the right half",
            "Repeat until found (or search space becomes empty)"
        ],
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
        beginnerTips: [
            "Use a stack to track opening brackets",
            "Push opening brackets onto stack",
            "For closing brackets, check if they match top of stack",
            "Pop from stack when brackets match",
            "At the end, stack should be empty"
        ],
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
        fullCode: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_SIZE 10000

typedef struct {
    char data[MAX_SIZE];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

bool isEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, char c) {
    s->data[++s->top] = c;
}

char pop(Stack* s) {
    return s->data[s->top--];
}

char peek(Stack* s) {
    return s->data[s->top];
}

bool isValid(char* s) {
    Stack stack;
    initStack(&stack);
    
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        
        // Push opening brackets
        if (c == '(' || c == '{' || c == '[') {
            push(&stack, c);
        }
        // Check closing brackets
        else {
            if (isEmpty(&stack)) return false;
            
            char top = peek(&stack);
            if ((c == ')' && top == '(') ||
                (c == '}' && top == '{') ||
                (c == ']' && top == '[')) {
                pop(&stack);
            } else {
                return false;
            }
        }
    }
    
    return isEmpty(&stack);
}

int main() {
    char s[] = "()[]{}";
    
    if (isValid(s))
        printf("%s is valid\n", s);
    else
        printf("%s is not valid\n", s);
    
    return 0;
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
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Stack follows Last-In-First-Out (LIFO) principle",
            "Push adds element to top",
            "Pop removes element from top",
            "Peek shows top element without removing",
            "Think of it like a stack of plates"
        ],
        description: 'Implement a Stack using a Linked List (LIFO).',
        codeSnippet: `// Stack Operations using Linked List Node`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* top = NULL;

void push(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = top;
    top = newNode;
    printf("Pushed: %d\\n", data);
}

int pop() {
    if (top == NULL) {
        printf("Stack underflow\\n");
        return -1;
    }
    Node* temp = top;
    int popped = temp->data;
    top = top->next;
    free(temp);
    return popped;
}

int peek() {
    if (top == NULL) return -1;
    return top->data;
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("Top: %d\\n", peek());
    printf("Popped: %d\\n", pop());
    return 0;
}`,
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
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Queue follows First-In-First-Out (FIFO) principle",
            "Enqueue adds element to rear",
            "Dequeue removes element from front",
            "Front shows first element",
            "Think of it like a line at a store"
        ],
        description: 'Implement a Queue using a Linked List (FIFO).',
        codeSnippet: `// Queue Operations using Linked List Node`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* front = NULL;
Node* rear = NULL;

void enqueue(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (rear == NULL) {
        front = rear = newNode;
    } else {
        rear->next = newNode;
        rear = newNode;
    }
    printf("Enqueued: %d\\n", data);
}

int dequeue() {
    if (front == NULL) {
        printf("Queue underflow\\n");
        return -1;
    }
    Node* temp = front;
    int dequeued = temp->data;
    front = front->next;
    if (front == NULL) rear = NULL;
    free(temp);
    return dequeued;
}

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("Dequeued: %d\\n", dequeue());
    return 0;
}`,
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
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Each node has two pointers: next and prev",
            "Can traverse in both directions",
            "Insert/delete at both ends efficiently",
            "Head points to first, tail to last",
            "Useful for browser history, undo/redo"
        ],
        description: 'A linked list where each node contains a reference to the previous node as well.',
        codeSnippet: `struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

Node* head = NULL;

void insertFront(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = head;
    newNode->prev = NULL;
    if (head != NULL)
        head->prev = newNode;
    head = newNode;
}

void insertEnd(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (head == NULL) {
        newNode->prev = NULL;
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next != NULL)
        temp = temp->next;
    temp->next = newNode;
    newNode->prev = temp;
}

void display() {
    Node* temp = head;
    while (temp != NULL) {
        printf("%d <-> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main() {
    insertEnd(10);
    insertEnd(20);
    insertFront(5);
    display();
    return 0;
}`,
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
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Double-ended queue (deque = 'deck')",
            "Insert and remove from both ends",
            "More flexible than regular queue",
            "Useful for sliding window problems",
            "Can act as both stack and queue"
        ],
        description: 'Double Ended Queue allowing insertion and deletion at both ends.',
        codeSnippet: `// Deque Operations`,
        fullCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

Node* front = NULL;
Node* rear = NULL;

void insertFront(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = front;
    if (front == NULL) {
        front = rear = newNode;
        newNode->prev = NULL;
    } else {
        front->prev = newNode;
        front = newNode;
    }
    printf("Inserted %d at front\n", data);
}

void insertRear(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    if (rear == NULL) {
        newNode->prev = NULL;
        front = rear = newNode;
    } else {
        newNode->prev = rear;
        rear->next = newNode;
        rear = newNode;
    }
    printf("Inserted %d at rear\n", data);
}

int deleteFront() {
    if (front == NULL) return -1;
    int data = front->data;
    Node* temp = front;
    front = front->next;
    if (front == NULL) rear = NULL;
    else front->prev = NULL;
    free(temp);
    return data;
}

int main() {
    insertRear(5);
    insertRear(10);
    insertFront(1);
    printf("Deleted from front: %d\n", deleteFront());
    return 0;
}`,
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
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Factorial of n = n × (n-1) × (n-2) × ... × 1",
            "Base case: factorial of 0 or 1 is 1",
            "Recursive case: n × factorial(n-1)",
            "Function calls itself with smaller input",
            "Stack builds up then unwinds with results"
        ],
        description: 'Calculate N! recursively.',
        codeSnippet: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}`,
        fullCode: `#include <stdio.h>

int factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    printf("Factorial of %d = %d\n", n, factorial(n));
    
    // Show step by step
    printf("\nStep by step:\n");
    printf("5! = 5 × 4!\n");
    printf("4! = 4 × 3!\n");
    printf("3! = 3 × 2!\n");
    printf("2! = 2 × 1!\n");
    printf("1! = 1 (base case)\n");
    printf("\nUnwinding:\n");
    printf("2! = 2 × 1 = 2\n");
    printf("3! = 3 × 2 = 6\n");
    printf("4! = 4 × 6 = 24\n");
    printf("5! = 5 × 24 = 120\n");
    
    return 0;
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
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'O(n)',
        beginnerTips: [
            "Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...",
            "Each number is sum of previous two",
            "Base cases: fib(0)=0, fib(1)=1",
            "Recursive: fib(n) = fib(n-1) + fib(n-2)",
            "Creates a tree of recursive calls"
        ],
        description: 'Calculate Nth Fibonacci number recursively.',
        codeSnippet: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
        fullCode: `#include <stdio.h>

int fib(int n) {
    // Base cases
    if (n <= 1) {
        return n;
    }
    // Recursive case
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 6;
    printf("Fibonacci(%d) = %d\n", n, fib(n));
    
    printf("\nFibonacci sequence:\n");
    for (int i = 0; i <= n; i++) {
        printf("fib(%d) = %d\n", i, fib(i));
    }
    
    printf("\nHow it works:\n");
    printf("fib(6) = fib(5) + fib(4)\n");
    printf("fib(5) = fib(4) + fib(3)\n");
    printf("fib(4) = fib(3) + fib(2)\n");
    printf("fib(3) = fib(2) + fib(1)\n");
    printf("fib(2) = fib(1) + fib(0)\n");
    printf("fib(1) = 1 (base case)\n");
    printf("fib(0) = 0 (base case)\n");
    
    return 0;
}`,
        inputs: [
            { name: "n", label: "N", type: "number", defaultValue: "6" }
        ],
        runCommand: 'recursion_fib'
    }
];
