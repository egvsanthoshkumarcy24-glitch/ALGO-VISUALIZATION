#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Binary Search Implementation
// Input: Sorted Array, Target
// Visualization: Highlights Left, Right, Mid pointers.

int main(int argc, char* argv[]) {
    log_init();

    int nums[100];
    int n = 0;
    int target = 8; // Default target

    // Parse inputs
    // Expected args: target, num1, num2, ...
    if (argc > 1) {
        target = atoi(argv[1]);
        for (int i = 2; i < argc; i++) {
            nums[n++] = atoi(argv[i]);
        }
    } else {
        // Default sorted array
        int defaults[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        n = 10;
        for(int i=0; i<n; i++) nums[i] = defaults[i];
    }

    log_step_start();
    log_array("nums", nums, n);
    log_var("target", target);
    log_message("Initial State: Sorted Array ready for Binary Search");
    log_step_end();

    int left = 0;
    int right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        log_step_start();
        log_array("nums", nums, n);
        log_var("target", target);
        log_highlight("left", left);
        log_highlight("right", right);
        log_highlight("mid", mid);
        
        char msg[128];
        sprintf(msg, "Checking Middle Index %d (Value: %d)", mid, nums[mid]);
        log_message(msg);
        log_step_end();

        if (nums[mid] == target) {
            log_step_start();
            log_array("nums", nums, n);
            log_var("target", target);
            log_highlight("Found", mid); // Using 'Found' as a highlight label
            log_message("Target Found!");
            log_step_end();
            log_finish();
            return 0;
        }

        if (nums[mid] < target) {
            log_step_start();
            log_array("nums", nums, n);
            log_highlight("left", left);
            log_highlight("right", right);
            log_highlight("mid", mid);
            log_message("Value < Target. Moving Left pointer to Mid + 1");
            log_step_end();
            left = mid + 1;
        } else {
            log_step_start();
            log_array("nums", nums, n);
            log_highlight("left", left);
            log_highlight("right", right);
            log_highlight("mid", mid);
            log_message("Value > Target. Moving Right pointer to Mid - 1");
            log_step_end();
            right = mid - 1;
        }
    }

    log_step_start();
    log_array("nums", nums, n);
    log_message("Target not found in the array.");
    log_step_end();

    log_finish();
    return 0;
}
