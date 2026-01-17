#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

void insertionSort(int arr[], int n) {
    int i, key, j;
    
    // Log initial state
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Initial State");
    log_step_end();

    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", i);
        char msg[128];
        sprintf(msg, "Picked key: %d. Inserting into sorted portion...", key);
        log_message(msg);
        log_step_end();

        /* Move elements of arr[0..i-1], that are greater than key,
           to one position ahead of their current position */
        while (j >= 0 && arr[j] > key) {
            log_step_start();
            log_array("Sort Array", arr, n);
            log_highlight("Sort Array", j);
            log_highlight("Sort Array", j+1); // Position being filled
            sprintf(msg, "%d > %d, moving %d right", arr[j], key, arr[j]);
            log_message(msg);
            log_step_end();

            arr[j + 1] = arr[j];
            j = j - 1;
            
            // Show move
            log_step_start();
            log_array("Sort Array", arr, n);
            log_highlight("Sort Array", j+1); // Empty spot potentially
            log_message("Moved.");
            log_step_end();
        }
        arr[j + 1] = key;
        
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", j+1);
        sprintf(msg, "Inserted key %d at position %d", key, j+1);
        log_message(msg);
        log_step_end();
    }
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Array Sorted!");
    log_step_end();
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    char* input = argv[1];
    int arr[100];
    int n = 0;

    // Check if we have multiple arguments (e.g. "64" "25" "12") or single string
    if (argc > 2) {
        for (int i = 1; i < argc; i++) {
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
    insertionSort(arr, n);
    log_finish();

    return 0;
}
