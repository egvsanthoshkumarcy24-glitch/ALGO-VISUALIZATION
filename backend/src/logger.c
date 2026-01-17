#include "../include/logger.h"

int first_step = 1;

// Structure-based implementation for valid JSON generation

#define MAX_ARRAYS 5
#define MAX_VARS 10
#define MAX_HIGHLIGHTS 10
#define MAX_ARRAY_SIZE 100
#define MAX_NODES 50
#define MAX_EDGES 50

typedef struct {
    int id;
    char label[32];
} NodeLog;

typedef struct {
    int from;
    int to;
} EdgeLog;

typedef struct {
    char name[32];
    int data[MAX_ARRAY_SIZE];
    int size;
} ArrLog;

typedef struct {
    char name[32];
    int value;
} VarLog;

typedef struct {
    char name[32];
    int index;
} HighlightLog;

ArrLog arrays[MAX_ARRAYS];
int arr_count = 0;

VarLog vars[MAX_VARS];
int var_count = 0;

HighlightLog highlights[MAX_HIGHLIGHTS];
int highlight_count = 0;

NodeLog tree_nodes[MAX_NODES];
int node_count = 0;

EdgeLog tree_edges[MAX_EDGES];
int edge_count = 0;

// Global message buffer for the step
char current_message[256] = "";

void log_init() {
    printf("[\n");
    first_step = 1;
    node_count = 0;
    edge_count = 0;
}

void log_message(const char* message) {
    strncpy(current_message, message, 255);
}

void log_step_start() {
    if (!first_step) {
        printf(",\n");
    }
    printf("  {\n");
    first_step = 0;
    arr_count = 0;
    var_count = 0;
    highlight_count = 0;
    // node_count and edge_count are persistent for tree growing
    current_message[0] = '\0';
}

void log_array(const char* name, int* arr, int size) {
    if (arr_count < MAX_ARRAYS) {
        strncpy(arrays[arr_count].name, name, 31);
        arrays[arr_count].size = (size > MAX_ARRAY_SIZE) ? MAX_ARRAY_SIZE : size;
        for(int i=0; i<arrays[arr_count].size; i++) {
            arrays[arr_count].data[i] = arr[i];
        }
        arr_count++;
    }
}

void log_var(const char* name, int value) {
    if (var_count < MAX_VARS) {
        strncpy(vars[var_count].name, name, 31);
        vars[var_count].value = value;
        var_count++;
    }
}

void log_highlight(const char* name, int index) {
    if (highlight_count < MAX_HIGHLIGHTS) {
        strncpy(highlights[highlight_count].name, name, 31);
        highlights[highlight_count].index = index;
        highlight_count++;
    }
}

void log_node(int id, const char* label) {
    // Prevent duplicates
    for (int i = 0; i < node_count; i++) {
        if (tree_nodes[i].id == id) return;
    }
    if (node_count < MAX_NODES) {
        tree_nodes[node_count].id = id;
        strncpy(tree_nodes[node_count].label, label, 31);
        node_count++;
    }
}

void log_edge(int from_id, int to_id) {
    // Prevent duplicates
    for (int i = 0; i < edge_count; i++) {
        if (tree_edges[i].from == from_id && tree_edges[i].to == to_id) return;
    }
    if (edge_count < MAX_EDGES) {
        tree_edges[edge_count].from = from_id;
        tree_edges[edge_count].to = to_id;
        edge_count++;
    }
}

void log_step_end() {
    printf("    \"arrays\": {");
    for (int i = 0; i < arr_count; i++) {
        printf("\"%s\": [", arrays[i].name);
        for (int j = 0; j < arrays[i].size; j++) {
            printf("%d%s", arrays[i].data[j], (j < arrays[i].size - 1) ? ", " : "");
        }
        printf("]%s", (i < arr_count - 1) ? ", " : "");
    }
    printf("},\n");

    printf("    \"variables\": {");
    for (int i = 0; i < var_count; i++) {
        printf("\"%s\": %d%s", vars[i].name, vars[i].value, (i < var_count - 1) ? ", " : "");
    }
    printf("},\n");

    printf("    \"highlights\": {");
    for (int i = 0; i < highlight_count; i++) {
        printf("\"%s\": %d%s", highlights[i].name, highlights[i].index, (i < highlight_count - 1) ? ", " : "");
    }
    printf("},\n");

    printf("    \"nodes\": [");
    for (int i = 0; i < node_count; i++) {
        printf("{\"id\": %d, \"label\": \"%s\"}%s", tree_nodes[i].id, tree_nodes[i].label, (i < node_count - 1) ? ", " : "");
    }
    printf("],\n");

    printf("    \"edges\": [");
    for (int i = 0; i < edge_count; i++) {
        printf("{\"from\": %d, \"to\": %d}%s", tree_edges[i].from, tree_edges[i].to, (i < edge_count - 1) ? ", " : "");
    }
    printf("],\n");

    printf("    \"message\": \"%s\"\n", current_message);
    printf("  }");
}

void log_finish() {
    printf("\n]\n");
}
