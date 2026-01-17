#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];
    return mx;
}

void countSort(int arr[], int n, int exp) {
    int output[n]; 
    int i, count[10] = { 0 };

    for (i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < n; i++) {
        arr[i] = output[i];
        
        log_step_start();
        log_array("Sort Array", arr, n);
        log_highlight("Sort Array", i);
        char msg[128];
        sprintf(msg, "Sorted by digit at exp %d", exp);
        log_message(msg);
        log_step_end();
    }
}

void radixSort(int arr[], int n) {
    int m = getMax(arr, n);

    log_step_start();
    log_array("Sort Array", arr, n);
    log_message("Initial State");
    log_step_end();

    for (int exp = 1; m / exp > 0; exp *= 10) {
        countSort(arr, n, exp);
    }
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
    radixSort(arr, n);
    log_finish();

    return 0;
}
