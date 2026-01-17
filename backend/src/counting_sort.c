#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

void countingSort(int arr[], int n) {
    // Find max
    int max = arr[0];
    for(int i=1; i<n; i++) if(arr[i] > max) max = arr[i];
    
    // Create count array
    // Beware of large max. For visualization assume small inputs.
    // If max > 100, clip it or use dynamic. Visualizer canvas is limited anyway.
    int* count = (int*)calloc(max + 1, sizeof(int));
    int* output = (int*)malloc(n * sizeof(int));

    // Count phase
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
        
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", i);
        char msg[128];
        sprintf(msg, "Counting %d. Count[%d] = %d", arr[i], arr[i], count[arr[i]]);
        log_message(msg);
        log_step_end();
    }

    // Cumulative count
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
        
        // Visualize the 'output' array being built? 
        // We can't overwrite 'Sort Array' easily if it's separate.
        // Let's copy output back to arr incrementally to show progress? 
        // Or simplified visualization: just show the result.
        // Copying back incrementally might be misleading for standard counting sort (it's not in-place).
        // But for visualizer, showing the 'output' array is nice.
        // Let's log 'Output' array? The frontend only renders 'Sort Array' as bars.
        // So I will log 'Output' as 'Sort Array' but it might be partially filled?
        // Let's just log the final copy phase.
    }
    
    // Copy output to arr
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", i);
        log_message("Placing sorted element");
        log_step_end();
    }
    
    free(count);
    free(output);
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
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Initial State");
    log_step_end();

    countingSort(arr, n);
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Array Sorted!");
    log_step_end();
    
    log_finish();

    return 0;
}
