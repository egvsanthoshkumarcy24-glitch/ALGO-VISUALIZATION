#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Bubble Sort
// Visualization: Bars moving
// We use array name "Sort Array" to trigger Bar visualization in frontend

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(int argc, char* argv[]) {
    log_init();

    int nums[100];
    int n = 0;

    if (argc > 1) {
     if (argc > 2) {
        for (int i = 1; i < argc; i++) {
            nums[n++] = atoi(argv[i]);
        }
    } else {
        char* token = strtok(argv[1], ", ");
        while (token != NULL) {
            nums[n++] = atoi(token);
            token = strtok(NULL, ", ");
        }
    }
    } else {
        int defaults[] = {29, 10, 14, 37, 14, 5, 12, 20, 8, 25};
        n = 10;
        for(int i=0; i<n; i++) nums[i] = defaults[i];
    }

    log_step_start();
    log_array("Sort Array", nums, n);
    log_message("Initial Unsorted Array");
    log_step_end();

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            
            // Highlight comparison
            log_step_start();
            log_array("Sort Array", nums, n);
            log_highlight("Sort Array", j);
            log_highlight("Sort Array", j+1);
            char msg[128];
            sprintf(msg, "Comparing %d and %d", nums[j], nums[j+1]);
            log_message(msg);
            log_step_end();

            if (nums[j] > nums[j+1]) {
                swap(&nums[j], &nums[j+1]);

                // Highlight swap
                log_step_start();
                log_array("Sort Array", nums, n);
                log_highlight("Sort Array", j);
                log_highlight("Sort Array", j+1);
                sprintf(msg, "Swapping %d and %d", nums[j+1], nums[j]);
                log_message(msg);
                log_step_end();
            }
        }
        
        // Mark sorted element? We don't have a specific way to mark "done" yet, 
        // but it stays in place.
    }

    log_step_start();
    log_array("Sort Array", nums, n);
    log_message("Sorting Complete!");
    log_step_end();

    log_finish();
    return 0;
}
