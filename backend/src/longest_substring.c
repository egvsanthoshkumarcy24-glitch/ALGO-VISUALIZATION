#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "../include/logger.h"

// LeetCode: Longest Substring Without Repeating Characters
// Sliding Window approach
// s = "abcabcbb"
// Use an array map[128] to store frequency or last index

int main(int argc, char* argv[]) {
    log_init();

    char s[256] = "abcabcbb";
    if (argc > 1) {
        strncpy(s, argv[1], 255);
        s[255] = '\0';
    }

    int n = strlen(s);
    // Visualizing the string as an array of characters
    // We should convert char string to int array for log_array if visualizer treats ints?
    // Visualizer handles "String" name specially now to show chars.
    int s_ints[256];
    for(int i=0; i<n; i++) s_ints[i] = s[i];

    log_step_start();
    log_array("Input String", s_ints, n);
    log_message("Initial State: Ready to find longest unique substring.");
    log_step_end();

    int map[128]; 
    for(int i=0; i<128; i++) map[i] = -1; // Stores LAST index of char

    int left = 0;
    int max_len = 0;
    int start_index = 0; // For result reconstruction if needed

    for (int right = 0; right < n; right++) {
        char c = s[right];
        
        // Log before processing char
        log_step_start();
        log_array("Input String", s_ints, n);
        log_highlight("left", left);
        log_highlight("right", right);
        char msg[128];
        sprintf(msg, "Extending window right. Checking '%c'", c);
        log_message(msg);
        log_step_end();

        // If char in map and inside window window, shrink window
        if (map[(int)c] >= left) {
            int old_left = left;
            left = map[(int)c] + 1;
            
            log_step_start();
            log_array("Input String", s_ints, n);
            log_highlight("left", left);
            log_highlight("right", right);
            sprintf(msg, "Duplicate '%c' found at index %d! Moving left to %d.", c, map[(int)c], left);
            log_message(msg);
            log_step_end();
        }

        map[(int)c] = right;
        int current_len = right - left + 1;
        if (current_len > max_len) {
            max_len = current_len;
            start_index = left;
            
            log_step_start();
            log_array("Input String", s_ints, n);
            log_highlight("left", left);
            log_highlight("right", right);
            log_var("max_len", max_len);
            log_message("New max length found!");
            log_step_end();
        }
    }

    log_step_start();
    log_array("Input String", s_ints, n);
    log_var("max_len", max_len);
    log_message("Finished! Longest Substring Length Determined.");
    log_step_end();

    log_finish();
    return 0;
}
