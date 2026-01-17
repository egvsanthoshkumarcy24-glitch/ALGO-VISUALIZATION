#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
void merge(int arr[], int l, int m, int r, int n_total) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    /* create temp arrays */
    int L[n1], R[n2];

    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = l; // Initial index of merged subarray
    
    log_step_start();
    log_array("Sort Array", arr, n_total);
    char msg[128];
    sprintf(msg, "Merging ranges [%d..%d] and [%d..%d]", l, m, m+1, r);
    log_message(msg);
    log_step_end();

    while (i < n1 && j < n2) {
        // Visual comparison
        log_step_start();
        log_array("Sort Array", arr, n_total);
        log_highlight("Sort Array", k); // Target
        sprintf(msg, "Comparing L:%d and R:%d for position %d", L[i], R[j], k);
        log_message(msg);
        log_step_end();

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        
        // Show update
        log_step_start();
        log_array("Sort Array", arr, n_total);
        log_highlight("Sort Array", k);
        log_message("Placed value");
        log_step_end();
        
        k++;
    }

    /* Copy the remaining elements of L[], if any */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        
        // Visual update
        log_step_start();
        log_array("Sort Array", arr, n_total);
        log_highlight("Sort Array", k-1);
        log_message("Copying remaining from Left");
        log_step_end();
    }

    /* Copy the remaining elements of R[], if any */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        
         // Visual update
        log_step_start();
        log_array("Sort Array", arr, n_total);
        log_highlight("Sort Array", k-1);
        log_message("Copying remaining from Right");
        log_step_end();
    }
}

/* l is for left index and r is right index of the
   sub-array of arr to be sorted */
void mergeSort(int arr[], int l, int r, int n) {
    if (l < r) {
        // Same as (l+r)/2, but avoids overflow for
        // large l and h
        int m = l + (r - l) / 2;

        // Sort first and second halves
        mergeSort(arr, l, m, n);
        mergeSort(arr, m + 1, r, n);

        merge(arr, l, m, r, n);
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;

    char* input = argv[1];
    int arr[100];
    int n = 0;

    // Check if we have multiple arguments
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
    
    mergeSort(arr, 0, n - 1, n);
    
    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Array Sorted!");
    log_step_end();
    
    log_finish();

    return 0;
}
