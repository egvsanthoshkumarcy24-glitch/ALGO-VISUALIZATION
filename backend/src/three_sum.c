#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// Simple Bubble Sort for visualization (or just use qsort and visualize the result)
// We will use qsort for simplicity of code, but log the sorted state.
void sort_and_log(int* nums, int n) {
    // Logging start of sort
    log_step_start();
    log_array("nums", nums, n);
    log_message("Step 1: Sort the array to use Two Pointers technique.");
    log_step_end();

    qsort(nums, n, sizeof(int), compare);

    // Logging sorted state
    log_step_start();
    log_array("nums", nums, n);
    log_message("Array currently sorted.");
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();

    int nums[100];
    int n = 0;
    
    // Default data if no args
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
        int defaults[] = {-1, 0, 1, 2, -1, -4};
        n = 6;
        for(int i=0; i<n; i++) nums[i] = defaults[i];
    }

    sort_and_log(nums, n);

    int found = 0;

    for (int i = 0; i < n - 2; i++) {
        // Skip duplicates for i
        if (i > 0 && nums[i] == nums[i-1]) continue;

        int left = i + 1;
        int right = n - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            log_step_start();
            log_array("nums", nums, n);
            log_highlight("i", i);
            log_highlight("left", left);
            log_highlight("right", right);
            char msg[128];
            sprintf(msg, "Checking: %d + %d + %d = %d", nums[i], nums[left], nums[right], sum);
            log_message(msg);
            log_step_end();

            if (sum == 0) {
                log_step_start();
                log_array("nums", nums, n);
                log_highlight("i", i);
                log_highlight("left", left);
                log_highlight("right", right);
                log_message("Found Triplet! Skipping duplicates...");
                log_step_end();
                
                found = 1;
                
                // Skip duplicates
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    if (!found) {
        log_step_start();
        log_array("nums", nums, n);
        log_message("No triplets found summing to 0.");
        log_step_end();
    } else {
        log_step_start();
        log_array("nums", nums, n);
        log_message("Finished searching.");
        log_step_end();
    }

    log_finish();
    return 0;
}
