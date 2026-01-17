#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

int node_id_counter = 0;

long long factorial(int n, int parent_id) {
    int current_id = node_id_counter++;
    char label[32];
    sprintf(label, "f(%d)", n);
    
    log_step_start();
    log_node(current_id, label);
    if (parent_id != -1) {
        log_edge(parent_id, current_id);
    }
    log_var("n", n);
    char msg[128];
    sprintf(msg, "Calling factorial(%d)", n);
    log_message(msg);
    log_step_end();

    if (n <= 1) {
        log_step_start();
        // Keep tree consistent
        log_node(current_id, label);
        if (parent_id != -1) log_edge(parent_id, current_id);
        log_var("n", n);
        log_message("Base case reached: return 1");
        log_step_end();
        return 1;
    }

    long long res = n * factorial(n - 1, current_id);

    log_step_start();
    log_node(current_id, label);
    if (parent_id != -1) log_edge(parent_id, current_id);
    log_var("n", n);
    log_var("result", (int)res);
    sprintf(msg, "Returning %d * factorial(%d) = %lld", n, n-1, res);
    log_message(msg);
    log_step_end();

    return res;
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;
    
    int n = atoi(argv[1]);

    log_init();
    factorial(n, -1);
    log_finish();
    return 0;
}
