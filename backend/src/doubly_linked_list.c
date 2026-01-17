#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Doubly Linked List
// Logs "Values", "NextPtrs", "PrevPtrs".

void dllOperations(int* input_vals, int n) {
    int values[100];
    int next_ptrs[100];
    int prev_ptrs[100];
    
    // Construct DLL
    for (int i = 0; i < n; i++) {
        values[i] = input_vals[i];
        next_ptrs[i] = (i < n - 1) ? i + 1 : -1;
        prev_ptrs[i] = (i > 0) ? i - 1 : -1;
    }

    log_step_start();
    log_array("Values", values, n);
    log_array("NextPtrs", next_ptrs, n);
    log_array("PrevPtrs", prev_ptrs, n);
    log_message("Initial Doubly Linked List");
    log_step_end();

    // Example Operation: Delete node at index 1 (if exists)
    if (n > 1) {
        int target = 1; // Delete second element
        
        log_step_start();
        log_array("Values", values, n);
        log_array("NextPtrs", next_ptrs, n);
        log_array("PrevPtrs", prev_ptrs, n);
        log_highlight("Values", target);
        log_message("Deleting Node at Index 1...");
        log_step_end();

        int prev = prev_ptrs[target];
        int next = next_ptrs[target];

        // Update links
        if (prev != -1) {
            next_ptrs[prev] = next;
            
            log_step_start();
            log_array("Values", values, n);
            log_array("NextPtrs", next_ptrs, n);
            log_array("PrevPtrs", prev_ptrs, n);
            log_highlight("Values", prev);
            log_message("Updated PrevNode->next");
            log_step_end();
        }
        
        if (next != -1) {
            prev_ptrs[next] = prev;
            
            log_step_start();
            log_array("Values", values, n);
            log_array("NextPtrs", next_ptrs, n);
            log_array("PrevPtrs", prev_ptrs, n);
            log_highlight("Values", next);
            log_message("Updated NextNode->prev");
            log_step_end();
        }

        // Technically the node is "detached" now.
        // We keep showing it but with links updated around it?
        // Or we repack the array? For visual clarity, repacking is better.
        
        int new_values[100];
        int new_nexts[100];
        int new_prevs[100];
        int new_n = 0;
        
        for(int i=0; i<n; i++) {
            if(i == target) continue;
            new_values[new_n] = values[i];
            new_n++;
        }
        // Rebuild links for the new compacted array
        for(int i=0; i<new_n; i++) {
             new_nexts[i] = (i < new_n - 1) ? i + 1 : -1;
             new_prevs[i] = (i > 0) ? i - 1 : -1;
        }

        log_step_start();
        log_array("Values", new_values, new_n);
        log_array("NextPtrs", new_nexts, new_n);
        log_array("PrevPtrs", new_prevs, new_n);
        log_message("Node Removed.");
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
    dllOperations(arr, n);
    log_finish();

    return 0;
}
