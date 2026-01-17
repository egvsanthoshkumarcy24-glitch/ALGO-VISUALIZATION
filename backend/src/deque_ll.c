#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Deque (Double Ended Queue)
// Basically DLL but Insert/Delete at both ends.

void dequeOperations(int* input_vals, int n) {
    // Start with empty deque, then add elements to Front and Rear alternatingly
    int values[100];
    int next_ptrs[100];
    int prev_ptrs[100];
    int count = 0;
    
    // For visualization simplicity, we'll implement using array but treat it as Deque.
    // 0 is Front, count-1 is Rear.
    
    log_step_start();
    log_array("Values", values, 0);
    log_array("NextPtrs", next_ptrs, 0);
    log_array("PrevPtrs", prev_ptrs, 0);
    log_message("Initial State: Empty Deque");
    log_step_end();

    for (int i = 0; i < n; i++) {
        int val = input_vals[i];
        
        // Push Back (simplest appends)
        if (i % 2 == 0) {
            // Add to Rear
            values[count] = val;
            count++;
            
            // Rebuild links
            for(int k=0; k<count; k++) {
                next_ptrs[k] = (k < count - 1) ? k + 1 : -1;
                prev_ptrs[k] = (k > 0) ? k - 1 : -1;
            }
            
            log_step_start();
            log_array("Values", values, count);
            log_array("NextPtrs", next_ptrs, count);
            log_array("PrevPtrs", prev_ptrs, count);
            log_highlight("Values", count-1);
            char msg[128];
            sprintf(msg, "PushRear(%d)", val);
            log_message(msg);
            log_step_end();
        } else {
            // Push Front (shift everything)
            for(int k=count; k>0; k--) values[k] = values[k-1];
            values[0] = val;
            count++;
             
             // Rebuild links
            for(int k=0; k<count; k++) {
                next_ptrs[k] = (k < count - 1) ? k + 1 : -1;
                prev_ptrs[k] = (k > 0) ? k - 1 : -1;
            }

            log_step_start();
            log_array("Values", values, count);
            log_array("NextPtrs", next_ptrs, count);
            log_array("PrevPtrs", prev_ptrs, count);
            log_highlight("Values", 0);
            char msg[128];
            sprintf(msg, "PushFront(%d)", val);
            log_message(msg);
            log_step_end();
        }
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
    dequeOperations(arr, n);
    log_finish();

    return 0;
}
