#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high, int n) {
    int pivot = arr[high];    // pivot
    int i = (low - 1);  // Index of smaller element

    log_step_start();
    log_array("Sort Array", arr, n);
    log_highlight("Sort Array", high); // Pivot
    char msg[128];
    sprintf(msg, "Partitioning range [%d..%d] using Pivot %d", low, high, pivot);
    log_message(msg);
    log_step_end();

    for (int j = low; j <= high - 1; j++) {
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", high); // Pivot
        log_highlight("Sort Array", j);    // Current
        log_highlight("Sort Array", i+1);  // Swap target
        sprintf(msg, "Comparing %d with Pivot %d", arr[j], pivot);
        log_message(msg);
        log_step_end();

        if (arr[j] < pivot) {
            i++;    // increment index of smaller element
            swap(&arr[i], &arr[j]);
            
            log_step_start();
            log_array("Sort Array", arr, n);
            log_highlight("Sort Array", i);
            log_highlight("Sort Array", j);
            log_message("Swapping smaller element to left");
            log_step_end();
        }
    }
    swap(&arr[i + 1], &arr[high]);
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_highlight("Sort Array", i+1);
    log_message("Placed Pivot in correct position");
    log_step_end();
    
    return (i + 1);
}

void quickSort(int arr[], int low, int high, int n) {
    if (low < high) {
        /* pi is partitioning index, arr[p] is now
           at right place */
        int pi = partition(arr, low, high, n);

        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1, n);
        quickSort(arr, pi + 1, high, n);
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    char* input = argv[1];
    int arr[100];
    int n = 0;

    // Check for multiple arguments
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

    quickSort(arr, 0, n - 1, n);
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Array Sorted!");
    log_step_end();
    
    log_finish();

    return 0;
}
