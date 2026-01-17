#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void selectionSort(int arr[], int n) {
    int i, j, min_idx;

    // Log initial state
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Initial State");
    log_step_end();

    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", i); // Current position
        log_highlight("Sort Array", min_idx); // Current min
        char msg[128];
        sprintf(msg, "Searching for minimum starting from index %d", i);
        log_message(msg);
        log_step_end();

        for (j = i + 1; j < n; j++) {
            log_step_start();
            log_array("Sort Array", arr, n);
            log_highlight("Sort Array", i);
            log_highlight("Sort Array", min_idx);
            log_highlight("Sort Array", j); // Current compare
            
            sprintf(msg, "Comparing %d with current min %d", arr[j], arr[min_idx]);
            log_message(msg);
            log_step_end();

            if (arr[j] < arr[min_idx]) {
                min_idx = j;
                
                log_step_start();
                log_array("Sort Array", arr, n);
                log_highlight("Sort Array", i);
                log_highlight("Sort Array", min_idx); // New min
                log_message("Found new minimum!");
                log_step_end();
            }
        }

        if (min_idx != i) {
            swap(&arr[min_idx], &arr[i]);
            
            log_step_start();
            log_array("Sort Array", arr, n);
            log_highlight("Sort Array", i);
            log_highlight("Sort Array", min_idx);
            sprintf(msg, "Swapped %d and %d", arr[i], arr[min_idx]);
            log_message(msg);
            log_step_end();
        }
    }
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Array Sorted!");
    log_step_end();
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    // Parse input: "1,2,3" -> int array
    char* input = argv[1];
    int arr[100];
    int n = 0;

    // Check if we have multiple arguments (e.g. "64" "25" "12") or single string
    if (argc > 2) {
        for (int i = 1; i < argc; i++) {
            // strip quotes or commas if present (though atoi handles mostly)
            arr[n++] = atoi(argv[i]);
        }
    } else {
        // Single argument case "64, 25, 12"
        char* token = strtok(input, ", ");
        while (token != NULL) {
            arr[n++] = atoi(token);
            token = strtok(NULL, ", ");
        }
    }

    log_init();
    selectionSort(arr, n);
    log_finish();

    return 0;
}
