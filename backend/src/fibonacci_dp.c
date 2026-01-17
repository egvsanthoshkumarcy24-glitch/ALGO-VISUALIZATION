#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// DP: Fibonacci Sequence
// dp[i] = dp[i-1] + dp[i-2]

int main(int argc, char* argv[]) {
    log_init();

    int n = 7; // Default N
    if(argc > 1) n = atoi(argv[1]);
    if(n > 20) n = 20; // Limit for visualization

    int dp[30];
    for(int i=0; i<=n; i++) dp[i] = 0;

    log_step_start();
    log_array("DP Table", dp, n+1);
    log_message("Initial State: DP Array initialized to 0");
    log_step_end();

    dp[0] = 0;
    dp[1] = 1;

    log_step_start();
    log_array("DP Table", dp, n+1);
    log_highlight("DP Table", 0);
    log_highlight("DP Table", 1);
    log_message("Base Cases: dp[0]=0, dp[1]=1");
    log_step_end();

    for(int i=2; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];

        log_step_start();
        log_array("DP Table", dp, n+1);
        log_highlight("DP Table", i);
        
        char msg[128];
        sprintf(msg, "Calculated dp[%d] = dp[%d] + dp[%d] = %d + %d = %d", i, i-1, i-2, dp[i-1], dp[i-2], dp[i]);
        log_message(msg);
        log_step_end();
    }

    log_step_start();
    log_array("DP Table", dp, n+1);
    char msg[128];
    sprintf(msg, "Fibonacci(%d) is %d", n, dp[n]);
    log_message(msg);
    log_step_end();

    log_finish();
    return 0;
}
