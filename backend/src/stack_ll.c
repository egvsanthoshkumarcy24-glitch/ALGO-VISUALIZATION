#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Simple resizing array simulation for "Linked List" style visualization
// Since we send arrays to frontend.

void stackOperations(int* input_vals, int n) {
    int values[100];
    int next_ptrs[100];
    int count = 0; // Current number of nodes
    int head = -1; // Index of top

    // Initialize arrays
    memset(values, 0, sizeof(values));
    memset(next_ptrs, -1, sizeof(next_ptrs)); // -1 is NULL

    log_step_start();
    log_array("Values", values, 0);
    log_array("NextPtrs", next_ptrs, 0);
    log_message("Initial State: Empty Stack");
    log_step_end();

    for (int i = 0; i < n; i++) {
        // PUSH Operation
        int val = input_vals[i];
        
        // Allocate 'node' at index 'count'
        int new_node_idx = count;
        values[new_node_idx] = val;
        next_ptrs[new_node_idx] = head; // Point to old head
        head = new_node_idx; // Update head
        count++;

        log_step_start();
        log_array("Values", values, count);
        log_array("NextPtrs", next_ptrs, count);
        log_highlight("Values", head); // Highlight Top
        char msg[128];
        sprintf(msg, "Push(%d): New Top is Node %d", val, val);
        log_message(msg);
        log_step_end();
    }

    // POP Operations (clear stack)
    while (head != -1) {
        int popped_val = values[head];
        int old_head = head;
        head = next_ptrs[head]; // Move head
        
        // Visually we still have the data in array, but we 'remove' it by shrinking size?
        // Or we just update head highlight.
        // For visualization, let's keep array size same but just update pointers?
        // Actually, let's "remove" the node from visualization by creating a new dense array view?
        // Simpler: Just update head. The node remains "allocated" in memory log typically, but for user view?
        // Let's effectively remove it from the "active list" the user sees.
        // But `log_array` sends `values` buffer. 
        // We can just send the same array. The `head` is what matters. 
        // But the frontend renderer draws all nodes in `Values` array.
        // To "delete", we should probably repack the array or send a smaller N.
        
        // Let's repack for cleanest visual: Removing the top node.
        // Current Stack: [A, B, C] (Wrap: C->B->A->NULL). Head=2 (C).
        // Pop C. Stack: [A, B]. Head=1 (B).
        // We can just decrease count, BUT our physical layout has 'C' at index 2.
        // If we just say `log_array(..., count-1)`, we lose the last element.
        // Since we pushed sequentially, the 'Top' is always at `count-1` visually if we ordered them by arrival?
        // Yes, `values[new_node_idx]` where `new_node_idx` increments.
        // So `head` is always `count-1`.
        // So `next_ptrs[count-1]` points to `count-2`.
        // So popping corresponds exactly to reducing `n`. Nice.
        
        count--;
        
        log_step_start();
        log_array("Values", values, count);
        log_array("NextPtrs", next_ptrs, count); // We don't need to update next_ptrs for remaining
        char msg2[128];
        sprintf(msg2, "Pop(): Removed %d", popped_val);
        log_message(msg2);
        log_step_end();
        
        // Update head index variable logic for next iteration (it is count-1)
        head = count - 1; 
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
    stackOperations(arr, n);
    log_finish();

    return 0;
}
