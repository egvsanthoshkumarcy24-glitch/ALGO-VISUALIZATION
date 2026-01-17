#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// Binary Search Tree Search
// Visualization: Tree Structure
// We use "TreeStructure" for the nodes.
// Input will be a level-order array representation of a BST.
// Default BST: 
//       4
//     /   \
//    2     6
//   / \   / \
//  1   3 5   7
// Array: [4, 2, 6, 1, 3, 5, 7]

// Search for target.

int main(int argc, char* argv[]) {
    log_init();

    int target = 5;
    if (argc > 1) target = atoi(argv[1]);

    // Hardcoded BST representation in Level Order
    // Note: A real BST application would insert nodes, but for visualization we often use static trees for "Search" demos
    // or we would need a much complex state management to show insertion building up.
    // Let's use a static array that IS a valid BST.
    int tree[] = {4, 2, 6, 1, 3, 5, 7};
    int n = 7;
    
    // Log initial
    log_step_start();
    log_array("TreeStructure", tree, n);
    log_message("Initial BST");
    log_step_end();

    int curr = 0; // Root index
    int found = 0;

    while(curr < n) {
        int val = tree[curr];
        
        log_step_start();
        log_array("TreeStructure", tree, n);
        log_highlight("TreeStructure", curr); // Highlight current node
        
        char msg[128];
        sprintf(msg, "Checking Node %d...", val);
        log_message(msg);
        log_step_end();

        if(val == target) {
            log_step_start();
            log_array("TreeStructure", tree, n);
            log_highlight("TreeStructure", curr);
            log_message("Target Found!");
            log_step_end();
            found = 1;
            break;
        }

        if(target < val) {
            // Go Left: 2*curr + 1
            curr = 2*curr + 1;
            log_step_start();
            log_array("TreeStructure", tree, n);
            sprintf(msg, "%d < %d, Moving Left", target, val);
            log_message(msg);
            log_step_end();
        } else {
            // Go Right: 2*curr + 2
            curr = 2*curr + 2;
            log_step_start();
            log_array("TreeStructure", tree, n);
            sprintf(msg, "%d > %d, Moving Right", target, val);
            log_message(msg);
            log_step_end();
        }
    }

    if(!found) {
        log_step_start();
        log_array("TreeStructure", tree, n);
        log_message("Target not found in BST.");
        log_step_end();
    }

    log_finish();
    return 0;
}
