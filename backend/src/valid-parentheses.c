#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../include/logger.h"

#define MAX_SIZE 100

// Stack implementation for visualization
char stack[MAX_SIZE];
int top = -1;

void push(char c) {
    if (top < MAX_SIZE - 1) {
        stack[++top] = c;
    }
}

char pop() {
    if (top >= 0) {
        return stack[top--];
    }
    return '\0';
}

char peek() {
    if (top >= 0) {
        return stack[top];
    }
    return '\0';
}

int is_empty() {
    return top == -1;
}

void log_state(const char* s, int current_index, const char* message) {
    log_step_start();
    
    // Log the input string as an array of characters for visualization
    // We'll treat the string as an integer array where char codes are values, 
    // or just pass 0s and strictly use the name/message for context if array viewer only supports ints.
    // However, our VisualizerEngine might strictly expect ints in "data".
    // For now, let's map chars to their ASCII values or simple 0/1 representation if needed.
    // actually, let's just log the 'stack' as an array.
    
    // Log Stack State
    int stack_display[MAX_SIZE];
    for(int i=0; i<=top; i++) {
        stack_display[i] = stack[i]; // Store ASCII
    }
    // If stack empty, pass empty arr
    log_array("Stack", stack_display, top + 1);

    // Log the input string as an array so we can highlight current char
    int input_display[MAX_SIZE];
    int len = strlen(s);
    for(int i=0; i<len; i++) input_display[i] = s[i];
    log_array("Input String", input_display, len);

    // Highlight current character being processed
    if (current_index >= 0) {
        log_highlight("current_char", current_index);
    }
    
    log_message(message);
    log_step_end();
}

int main(int argc, char* argv[]) {
    log_init();

    char s[MAX_SIZE] = "()[]{}"; // Default
    if (argc > 1) {
        strncpy(s, argv[1], MAX_SIZE - 1);
        s[MAX_SIZE - 1] = '\0';
    }

    log_state(s, -1, "Initial State: Empty Stack");

    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        
        if (c == '(' || c == '{' || c == '[') {
            push(c);
            char msg[100];
            sprintf(msg, "Pushing '%c' to stack", c);
            log_state(s, i, msg);
        } else {
            if (is_empty()) {
                log_state(s, i, "Error: Stack empty but found closing bracket!");
                log_finish();
                return 0; // False
            }
            
            char top_char = peek();
            if ((c == ')' && top_char == '(') ||
                (c == '}' && top_char == '{') ||
                (c == ']' && top_char == '[')) {
                pop();
                char msg[100];
                sprintf(msg, "Matched '%c' with '%c'. Popping stack.", c, top_char);
                log_state(s, i, msg);
            } else {
                char msg[100];
                sprintf(msg, "Error: Mismatch! Expected matching opener for '%c' but found '%c'", c, top_char);
                log_state(s, i, msg);
                log_finish();
                return 0; // False
            }
        }
    }

    if (is_empty()) {
        log_state(s, strlen(s), "Success! Stack is empty and string is valid.");
    } else {
        log_state(s, strlen(s), "Error: String ended but stack is not empty.");
    }

    log_finish();
    return 0;
}
