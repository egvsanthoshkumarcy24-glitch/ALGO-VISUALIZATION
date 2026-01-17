#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Queue using Linked List Visualization
// Enqueue at Tail, Dequeue at Head.
// Visualizing as array of nodes for simplicity.

void queueOperations(int* input_vals, int n) {
    int values[100];
    int next_ptrs[100];
    // We need to manage indices explicitly.
    // Let's keep 'active' nodes in the window [head_idx, tail_idx].
    // But sending `values + head_idx` to log might be tricky if we want consistent indices.
    // Let's just log the whole buffer and use specific range? NO, frontend renders everything passed.
    // Strategy: Shift elements? Expensive but visual is clean.
    // Strategy 2: Just show growing array, but mark 'Head' and 'Tail' with highlights.
    
    int front = 0;
    int rear = -1;
    int count = 0;
    
    // Initialize
    memset(values, 0, sizeof(values));
    // For queue, 0->1->2->3. Linear.
    
    log_step_start();
    log_array("Values", values, 0);
    log_array("NextPtrs", next_ptrs, 0);
    log_message("Initial State: Empty Queue");
    log_step_end();

    // Enqueue Phase
    for (int i = 0; i < n; i++) {
        rear++;
        values[rear] = input_vals[i];
        next_ptrs[rear] = -1; // Tail points to NULL
        if (rear > 0) next_ptrs[rear-1] = rear; // Link previous to new

        count++;

        log_step_start();
        log_array("Values", values, count);
        log_array("NextPtrs", next_ptrs, count);
        log_highlight("Values", front); // Front
        log_highlight("Values", rear);  // Rear
        
        char msg[128];
        sprintf(msg, "Enqueue(%d)", input_vals[i]);
        log_message(msg);
        log_step_end();
    }

    // Dequeue Phase
    while (front <= rear) {
        int val = values[front];
        
        // To "remove" from visualization, if we just advance front, the node 0 stays visible?
        // Yes, unless we slice the array.
        // Let's slice the array for the log.
        // We will pass `values + 1` and size `count - 1`.
        
        // But pointers! `next_ptrs` indices would be wrong if we just shift base pointer.
        // If we send `next_ptrs + 1`, the value inside `next_ptrs[0]` (which was next_ptrs[1]) is `2`.
        // Relative to new base (index 0 is old index 1), `2` means "skip one". 
        // Index `k` in new array is `k+1` in old array.
        // Old `next_ptrs[k+1]` was `k+2`. 
        // So new `next_ptrs[k]` (which is `k+2`) points to index `k+1` in new array.
        // So shifting works perfectly for linear pointers! 
        // 0->1->2 becomes 1->2 (which is 0->1 in new coordinates).
        // Wait: `next_ptrs` values are absolute indices? Or relative?
        // Usually absolute. 
        // If index 1 has next=2. And we shift. New index 0 has next=2.
        // But relative to new array, 2 is index 1? NO. Relative to new array 2 is 1 (old 2).
        // So we need to decrement all pointer values by 1?
        // YES.
        
        // Easier approach: Rebuild the array for visualization.
        int vis_values[100];
        int vis_nexts[100];
        int vis_n = 0;
        
        for(int k=front+1; k<=rear; k++) {
            vis_values[vis_n] = values[k];
            // Linear links: i -> i+1. Last -> -1.
            vis_nexts[vis_n] = (k == rear) ? -1 : vis_n + 1;
            vis_n++;
        }
        
        front++; // Actual dequeue logic

        log_step_start();
        log_array("Values", vis_values, vis_n);
        log_array("NextPtrs", vis_nexts, vis_n);
        if(vis_n > 0) {
            log_highlight("Values", 0); // New Front
            log_highlight("Values", vis_n-1); // Rear
        }
        char msg[128];
        sprintf(msg, "Dequeue(): Removed %d", val);
        log_message(msg);
        log_step_end();
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    char* input = argv[1];
    int arr[100];
    int n = 0;

    if (argc > 2) {
        for (int i = 1; i < argc; i++) {
            arr[n++] = atoi(argv[i]);
        }
    } else {
        char* token = strtok(input, ", ");
        while (token != NULL) {
            arr[n++] = atoi(token);
            token = strtok(NULL, ", ");
        }
    }

    log_init();
    queueOperations(arr, n);
    log_finish();

    return 0;
}
