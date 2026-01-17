#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

// Simple Queue Implementation for BFS
#define MAX_NODES 100

typedef struct {
    int id; // unique id for visualization (index in the input array)
    int val;
    int left_idx;
    int right_idx;
} TreeNode;

TreeNode tree[MAX_NODES];
int tree_size = 0;

typedef struct {
    int items[MAX_NODES];
    int front;
    int rear;
} Queue;

void initQueue(Queue* q) {
    q->front = -1;
    q->rear = -1;
}

int isEmpty(Queue* q) {
    return q->front == -1;
}

void enqueue(Queue* q, int value) {
    if (q->rear == MAX_NODES - 1) return;
    if (q->front == -1) q->front = 0;
    q->items[++q->rear] = value;
}

int dequeue(Queue* q) {
    if (isEmpty(q)) return -1;
    int item = q->items[q->front];
    q->front++;
    if (q->front > q->rear) {
        q->front = q->rear = -1;
    }
    return item;
}

// Helper to parse "null" strings to integers, using -1 or similar for null
// Input: "3", "9", "20", "null", "null", "15", "7"
// We will construct the tree from this array representation (LeetCode style)
void build_tree(char** args, int count) {
    if (count == 0) return;

    // Root
    if (strcmp(args[0], "null") == 0) return;
    
    // Create nodes first
    for(int i=0; i<count; i++) {
        if (strcmp(args[i], "null") != 0) {
            tree[i].id = i;
            tree[i].val = atoi(args[i]);
            tree[i].left_idx = -1;
            tree[i].right_idx = -1;
        } else {
             tree[i].id = -1; // Null node
        }
    }
    tree_size = count;

    // Link nodes (Level order linking)
    // Parent at index i has children at 2*i + 1 and 2*i + 2 ?? 
    // Wait, LeetCode style with 'null's included in the array allows index mapping?
    // Actually, "3,9,20,null,null,15,7"
    // 3 is root.
    // 9 is left of 3. 20 is right of 3.
    // 9 has children: null, null.
    // 20 has children: 15, 7.
    // This strictly follows the complete tree indexing ONLY IF nulls are present for missing nodes in a layer? 
    // Actually standard leetcode input: [3,9,20,null,null,15,7]
    // Queue based construction used by LeetCode:
    // Q: [Root]
    // pop Root. Next val is left, Next val is right.
    
    Queue q;
    initQueue(&q);
    
    if (tree[0].id != -1) enqueue(&q, 0);
    
    int current_arg = 1;
    while(!isEmpty(&q) && current_arg < count) {
        int parent_idx = dequeue(&q);
        
        // Left Child
        if (current_arg < count) {
            if (tree[current_arg].id != -1) {
                tree[parent_idx].left_idx = current_arg;
                enqueue(&q, current_arg);
            }
            current_arg++;
        }
        
        // Right Child
        if (current_arg < count) {
            if (tree[current_arg].id != -1) {
                tree[parent_idx].right_idx = current_arg;
                enqueue(&q, current_arg);
            }
            current_arg++;
        }
    }
}

int main(int argc, char* argv[]) {
    log_init();

    // Parse Args
    int count = 0;
    char* node_strs[MAX_NODES];
    
    if (argc > 1) {
        // Assuming args strictly passed as separate params: "exe 3 9 20 null null 15 7"
        count = argc - 1;
        for(int i=0; i<count; i++) {
            node_strs[i] = argv[i+1];
        }
    } else {
        // Default: [3,9,20,null,null,15,7]
        char* defaults[] = {"3", "9", "20", "null", "null", "15", "7"};
        count = 7;
        for(int i=0; i<count; i++) node_strs[i] = defaults[i];
    }

    build_tree(node_strs, count);
    
    // Visualization: We'll log the tree as an array for now since we don't have a Tree visualizer yet.
    // BUT we can repurpose the Graph or Array or just log "Visited" list.
    // VisualizerEngine currently supports 'arrays' and 'variables'.
    // We can show the "Queue" and the "Result List".
    
    int result_list[MAX_NODES];
    int result_count = 0;
    
    Queue bfs_q;
    initQueue(&bfs_q);
    
    if(tree_size > 0 && tree[0].id != -1) {
        enqueue(&bfs_q, 0);
    }
    
    log_step_start();
    // Prepare TreeStructure for visualization
    int tree_values[MAX_NODES];
    for(int i=0; i<tree_size; i++) {
        if(tree[i].id != -1) tree_values[i] = tree[i].val;
        else tree_values[i] = -1; // Or null representation? Logger might treat -1 as value.
        // Frontend handles 'null' strings in input default, but here we are sending ints.
        // Frontend 'TreeStructure' renderer checks `if (val === null)`.
        // Our logger sends integers. We might need a generic way to extend this or just assume 0 or -1 is null? 
        // Actually `VisualizerEngine.jsx` expects `val` to be checked against null. 
        // If we send -1, it renders -1. 
        // Let's use 0 for null if we assume positive values, or maybe standard INT_MIN?
        // Let's check `VisualizerEngine.jsx`: `if (val === null) return null;`
        // JSON from backend: `arrays: { "TreeStructure": [1, 2, null, 3] }`.
        // Our C logger likely writes integers. `fprintf(f, "%d", arr[i])`.
        // We can't send "null".
        // WORKAROUND: Send a special integer for NULL, e.g. -999, and update Frontend to treat -999 as null?
        // OR: Update logger to support string arrays?
        // OR: Update Frontend to treat -1 as null for Trees?
        // Let's check `VisualizerEngine.jsx` again. It renders `val`.
        // `if (val === null)` -> this implies strict null.
        // Since I can't easily change C logger to output mixed types without effort,
        // I will change Frontend to treat a specific value (e.g. -1 or 0) as null, 
        // OR just rely on the fact that I can't easily fix `val === null` in 5 mins without frontend change.
        // I'll stick to updating C to send `0` for now and I'll update Frontend in next step to treat `0` or `-1` as null for trees.
        // Let's assume -1 is null for now.
    }
    // Actually, `bst_search.c` sent an int array and it worked? 
    // `int tree[] = {4, 2, 6, 1, 3, 5, 7};` <- no nulls there.
    // For Level Order we have nulls.
    // I will log it anyway.
    
    // Create simple flat array
    int flat_tree[MAX_NODES];
    for(int i=0; i<tree_size; i++) flat_tree[i] = (tree[i].id == -1) ? -999 : tree[i].val;

    log_array("TreeStructure", flat_tree, tree_size);
    // Show the queue as an array
    int queue_display[MAX_NODES];
    // Populate queue display 
    // (This is tricky because our visualizer expects static arrays usually, but we can send dynamic size)
    // Let's just send the values currently in queue
    log_array("Queue", (int[]){tree[0].val}, 1);
    log_array("Result", result_list, 0);
    log_message("Initial State: Root pushed to Queue");
    log_step_end();

    while(!isEmpty(&bfs_q)) {
        // Snapshot Queue state before dequeue
        int q_len = (bfs_q.rear - bfs_q.front + 1);
        int q_snapshot[MAX_NODES];
        for(int i=0; i<q_len; i++) {
            int node_idx = bfs_q.items[bfs_q.front + i];
            q_snapshot[i] = tree[node_idx].val;
        }
        
        int current_idx = dequeue(&bfs_q);
        TreeNode current = tree[current_idx];
        
        log_step_start();
        log_array("TreeStructure", flat_tree, tree_size);
        log_array("Queue", q_snapshot, q_len); // Show queue before popping
        log_array("Result", result_list, result_count);
        log_highlight("TreeStructure", current_idx); // Highlight current node in tree
        log_highlight("Queue", 0); // Highlight front
        char msg[128];
        sprintf(msg, "Processing Node: %d", current.val);
        log_message(msg);
        log_step_end();
        
        // Add to result
        result_list[result_count++] = current.val;
        
        // Add children
        if (current.left_idx != -1) {
            enqueue(&bfs_q, current.left_idx);
        }
        if (current.right_idx != -1) {
            enqueue(&bfs_q, current.right_idx);
        }
        
        // Log after processing children
        int new_q_len = (bfs_q.rear - bfs_q.front + 1);
        int new_q_snapshot[MAX_NODES];
        for(int i=0; i<new_q_len; i++) {
            int node_idx = bfs_q.items[bfs_q.front + i];
            new_q_snapshot[i] = tree[node_idx].val;
        }
        
        log_step_start();
        log_array("TreeStructure", flat_tree, tree_size);
        log_array("Queue", new_q_snapshot, new_q_len);
        log_array("Result", result_list, result_count);
        log_highlight("Result", result_count-1); // Highlight newly added
        log_message("Added children to Queue & Node to Result");
        log_step_end();
    }
    
    log_step_start();
    log_array("Result", result_list, result_count);
    log_message("Traversal Complete!");
    log_step_end();

    log_finish();
    return 0;
}
