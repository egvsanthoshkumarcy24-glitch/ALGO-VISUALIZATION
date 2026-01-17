#include <stdio.h>
#include <stdlib.h>
#include "../include/logger.h"

// BFS for Graphs
// Visualization:
// 1. Visit Array/Set
// 2. Queue
// 3. Current Node Highlight
// 4. Graph structure? (Since we can't draw graphs yet, we use Adj Matrix or List representation)

#define NODES 5

int graph[NODES][NODES] = {
    {0, 1, 1, 0, 0}, // 0 is connected to 1, 2
    {1, 0, 0, 1, 0}, // 1 is connected to 0, 3
    {1, 0, 0, 1, 1}, // 2 is connected to 0, 3, 4
    {0, 1, 1, 0, 1}, // 3 is connected to 1, 2, 4
    {0, 0, 1, 1, 0}  // 4 is connected to 2, 3
};

// Queue Implementation
int queue[100];
int front = -1, rear = -1;

void enqueue(int val) {
    if (front == -1) front = 0;
    queue[++rear] = val;
}

int dequeue() {
    if (front == -1 || front > rear) return -1;
    return queue[front++];
}

int isEmpty() {
    return front == -1 || front > rear;
}

int main(int argc, char* argv[]) {
    log_init();
    
    int start_node = 0;
    if(argc > 1) start_node = atoi(argv[1]);
    if(start_node >= NODES) start_node = 0;

    int visited[NODES];
    for(int i=0; i<NODES; i++) visited[i] = 0;

    log_step_start();
    log_array("Visited", visited, NODES);
    // Flatten matrix for logging
    int flat_matrix[NODES*NODES];
    for(int i=0; i<NODES; i++) {
        for(int j=0; j<NODES; j++) {
            flat_matrix[i*NODES + j] = graph[i][j];
        }
    }
    log_array("AdjacencyMatrix", flat_matrix, NODES*NODES);
    log_message("Initial State: Graph BFS starting from Node 0");
    log_step_end();

    enqueue(start_node);
    visited[start_node] = 1;

    while(!isEmpty()) {
        int curr = dequeue();

        log_step_start();
        log_array("Visited", visited, NODES);
        log_array("AdjacencyMatrix", flat_matrix, NODES*NODES); // Keep sending it so view persists
        log_highlight("Visited", curr);
        char msg[128];
        sprintf(msg, "Visiting Node %d", curr);
        log_message(msg);
        log_step_end();

        for(int i=0; i<NODES; i++) {
            if(graph[curr][i] == 1 && !visited[i]) {
                visited[i] = 1;
                enqueue(i);
                
                log_step_start();
                log_array("Visited", visited, NODES);
                log_array("AdjacencyMatrix", flat_matrix, NODES*NODES);
                log_highlight("Visited", i);
                sprintf(msg, "Found neighbor %d. Added to Queue.", i);
                log_message(msg);
                log_step_end();
            }
        }
    }

    log_step_start();
    log_array("Visited", visited, NODES);
    log_array("AdjacencyMatrix", flat_matrix, NODES*NODES);
    log_message("BFS Traversal Complete.");
    log_step_end();

    log_finish();
    return 0;
}
