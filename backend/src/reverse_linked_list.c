#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// For visualization, we will represent nodes as indices in an array
// [val, next_index]
// Actually, to fit our LogArray schema, we might just log 'Values' array and 'Next' pointers array?
// Or just simpler: An array of values, and we visualize "pointers" by highlighting.

// Better approach for visually reversing:
// Input: [1, 2, 3, 4, 5]
// Logs:
// Prev: null, Curr: 1 (at index 0)
// Next = Curr->next (2)
// Curr->next = Prev
// Prev = Curr
// Curr = Next

int main(int argc, char* argv[]) {
    log_init();

    int values[100];
    int n = 0;

    // Parse inputs
    if (argc > 1) {
        for (int i = 1; i < argc; i++) {
            values[n++] = atoi(argv[i]);
        }
    } else {
        int defaults[] = {1, 2, 3, 4, 5};
        n = 5;
        for(int i=0; i<n; i++) values[i] = defaults[i];
    }

    // We need to simulate the "Next" pointers
    // Initially: next_ptrs[i] = i + 1; next_ptrs[n-1] = -1 (NULL)
    int next_ptrs[100];
    for(int i=0; i<n; i++) next_ptrs[i] = i + 1;
    next_ptrs[n-1] = -1; // Null

    log_step_start();
    log_array("Values", values, n);
    log_array("NextPtrs", next_ptrs, n);
    log_message("Initial State: Linked List 1 -> 2 -> 3 -> 4 -> 5 -> NULL");
    log_step_end();

    int prev = -1; // -1 represents NULL
    int curr = 0;  // Index 0

    while (curr != -1 && curr < n) {
        int next_temp = next_ptrs[curr];

        log_step_start();
        log_array("Values", values, n);
        log_array("NextPtrs", next_ptrs, n);
        
        // Visualize pointers as variables/indices
        if(prev != -1) log_highlight("Prev", prev);
        log_highlight("Curr", curr);
        // We can't highlight "Next" easily if it's -1 or separate var, but we can log var
        // log_var("NextTemp", next_temp);
        
        char msg[128];
        sprintf(msg, "Processing Node %d. Saving Next (%d).", values[curr], (next_temp != -1 ? values[next_temp] : -1));
        log_message(msg);
        log_step_end();

        // Reverse
        // Current->next = prev
        next_ptrs[curr] = prev;

        log_step_start();
        log_array("Values", values, n);
        log_array("NextPtrs", next_ptrs, n); // Show updated pointer
        if(prev != -1) log_highlight("Prev", prev);
        log_highlight("Curr", curr);
        
        sprintf(msg, "Reversed pointer: Node %d -> %s", values[curr], (prev == -1 ? "NULL" : "Prev"));
        log_message(msg);
        log_step_end();

        // Move pointers
        prev = curr;
        curr = next_temp;
    }

    log_step_start();
    log_array("Values", values, n);
    log_array("NextPtrs", next_ptrs, n);
    log_message("List Reversed! New Head is at the end.");
    log_step_end();

    log_finish();
    return 0;
}
