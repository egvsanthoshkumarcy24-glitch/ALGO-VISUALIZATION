#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// N-Queens Visualizer
// Board represented by `queens[row] = col`
// 4x4 Board for defaults

#define MAX_N 10
int queens[MAX_N]; // queens[i] = col index for row i
int N = 4;

int isSafe(int row, int col) {
    for (int i = 0; i < row; i++) {
        int q_col = queens[i];
        if (q_col == col) return 0; // Same column
        if (abs(q_col - col) == abs(i - row)) return 0; // Diagonal
    }
    return 1;
}

int solutions = 0;

void solve(int row) {
    if (row == N) {
        solutions++;
        log_step_start();
        log_array("Board (Col Indices)", queens, N); // Show pure array state
        log_message("Solution Found!");
        log_step_end();
        return; 
    }

    for (int col = 0; col < N; col++) {
        // Log attempt
        queens[row] = col; // Temporarily place
        
        log_step_start();
        log_array("Board (Col Indices)", queens, N); 
        log_highlight("Board (Col Indices)", row);
        char msg[128];
        sprintf(msg, "Trying Queen at Row %d, Col %d", row, col);
        log_message(msg);
        log_step_end();

        if (isSafe(row, col)) {
            solve(row + 1);
            if(solutions > 0) return; // Stop after first solution for simplicity in visualization limit? 
            // Or let it run. Let's return to keep trace short.
        } else {
            // Log backtrack/failure
            log_step_start();
            log_array("Board (Col Indices)", queens, N);
            log_highlight("Board (Col Indices)", row);
            sprintf(msg, "Conflict at Row %d, Col %d. Backtracking...", row, col);
            log_message(msg);
            log_step_end();
        }
        queens[row] = -1; // Reset
    }
}

int main(int argc, char* argv[]) {
    log_init();

    if(argc > 1) N = atoi(argv[1]);
    if(N > 8) N = 8; // Limit

    for(int i=0; i<N; i++) queens[i] = -1;

    log_step_start();
    log_array("Board (Col Indices)", queens, N);
    log_message("Initial State: Empty Board");
    log_step_end();

    solve(0);

    if (solutions == 0) {
        log_step_start();
        log_array("Board (Col Indices)", queens, N);
        log_message("No solution found.");
        log_step_end();
    }

    log_finish();
    return 0;
}
