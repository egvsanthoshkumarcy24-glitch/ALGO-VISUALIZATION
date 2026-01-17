#ifndef LOGGER_H
#define LOGGER_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Initialize the logger
void log_init();

// Log the start of a step. Call this before logging any state for a new step.
void log_step_start();

// Log an array.
// name: Name of the array variable (e.g., "nums")
// arr: Pointer to the array
// size: Size of the array
void log_array(const char* name, int* arr, int size);

// Log a single integer variable.
// name: Name of the variable (e.g., "target")
// value: Value of the variable
void log_var(const char* name, int value);

// Log a highlight (e.g., for pointers like 'left', 'right', 'mid').
// name: Name of the pointer/highlight
// index: The index it points to in the array (or -1 if invalid)
void log_highlight(const char* name, int index);

// Log a message/comment for the current step.
void log_message(const char* message);

// Finish the current step. Call this after logging all state for the step.
void log_step_end();

// Log a tree/graph node (for recursion trees)
void log_node(int id, const char* label);

// Log an edge (for recursion trees/graphs)
void log_edge(int from_id, int to_id);

// Finalize the logger (closes JSON structure)
void log_finish();

#endif // LOGGER_H
