#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
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
    sprintf(msg, "Partitioning with Pivot %d", pivot);
    log_message(msg);
    log_step_end();

    for (int j = low; j <= high - 1; j++) {
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", j);
        log_highlight("Sort Array", high);
        log_step_end();
        
        if (arr[j] < pivot) {
            i++;    // increment index of smaller element
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

int partition_r(int arr[], int low, int high, int n) {
    srand(time(NULL));
    int random = low + rand() % (high - low + 1); // +1 to include high
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_highlight("Sort Array", random);
    log_message("Chose Random Pivot");
    log_step_end();
    
    swap(&arr[random], &arr[high]);

    return partition(arr, low, high, n);
}

void quickSort(int arr[], int low, int high, int n) {
    if (low < high) {
        int pi = partition_r(arr, low, high, n);

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
