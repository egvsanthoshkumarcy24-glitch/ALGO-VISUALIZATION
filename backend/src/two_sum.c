#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int main(int argc, char* argv[]) {
    log_init();

    int nums[100]; // Increased max size
    int n = 0;
    int target = 9;

    // If arguments provided: two_sum.exe [target] [n1] [n2] ...
    if (argc > 1) {
        target = atoi(argv[1]);
        for (int i = 2; i < argc; i++) {
            nums[n++] = atoi(argv[i]);
        }
    } else {
        // Default values
        int default_nums[] = {2, 7, 11, 15};
        n = 4;
        for(int i=0; i<n; i++) nums[i] = default_nums[i];
    }

    log_step_start();
    log_array("nums", nums, n);
    log_var("target", target);
    log_message("Initial State: Finding two numbers that add up to target.");
    log_step_end();

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            log_step_start();
            log_array("nums", nums, n);
            log_var("target", target);
            log_highlight("left", i);
            log_highlight("right", j);
            
            char msg[100];
            sprintf(msg, "Checking %d + %d = %d", nums[i], nums[j], nums[i] + nums[j]);
            log_message(msg);
            log_step_end();

            if (nums[i] + nums[j] == target) {
                 log_step_start();
                 log_array("nums", nums, n);
                 log_var("target", target);
                 log_highlight("left", i);
                 log_highlight("right", j);
                 log_message("Found match!");
                 log_step_end();
                 
                 log_finish();
                 return 0;
            }
        }
    }

    log_step_start();
    log_array("nums", nums, n);
    log_var("target", target);
    log_message("No solution found.");
    log_step_end();

    log_finish();
    return 0;
}
