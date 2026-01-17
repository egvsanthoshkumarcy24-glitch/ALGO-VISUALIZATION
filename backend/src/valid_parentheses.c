#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include "../include/logger.h"

#define MAX_STACK 100

typedef struct {
    char data[MAX_STACK];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

bool isEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, char c) {
    if (s->top < MAX_STACK - 1) {
        s->data[++(s->top)] = c;
    }
}

char pop(Stack* s) {
    if (!isEmpty(s)) {
        return s->data[(s->top)--];
    }
    return '\0';
}

char peek(Stack* s) {
    if (!isEmpty(s)) {
        return s->data[s->top];
    }
    return '\0';
}

bool isMatch(char open, char close) {
    if (open == '(' && close == ')') return true;
    if (open == '{' && close == '}') return true;
    if (open == '[' && close == ']') return true;
    return false;
}

void log_state(const char* input, int current_idx, Stack* s, const char* msg) {
    log_step_start();
    
    // Convert stack to int array for logger
    int stack_arr[MAX_STACK];
    for (int i = 0; i <= s->top; i++) {
        stack_arr[i] = (int)s->data[i];
    }
    log_array("Stack", stack_arr, s->top + 1);
    
    // Convert input string to int array for logger
    int input_arr[MAX_STACK];
    int len = strlen(input);
    for (int i = 0; i < len; i++) {
        input_arr[i] = (int)input[i];
    }
    log_array("Input String", input_arr, len);
    
    // Highlight current character in input
    if (current_idx >= 0 && current_idx < len) {
        log_highlight("current", current_idx);
    }
    
    log_message(msg);
    log_step_end();
}

int main(int argc, char* argv[]) {
    char s[MAX_STACK] = "()[]{}";
    if (argc > 1) {
        strncpy(s, argv[1], MAX_STACK - 1);
    }

    log_init();
    
    Stack stack;
    initStack(&stack);
    
    log_state(s, -1, &stack, "Initial State: Empty Stack");
    
    int n = strlen(s);
    bool valid = true;
    
    for (int i = 0; i < n; i++) {
        char c = s[i];
        char msg[128];
        
        if (c == '(' || c == '{' || c == '[') {
            push(&stack, c);
            sprintf(msg, "Opening bracket '%c' found. Pushing to stack.", c);
            log_state(s, i, &stack, msg);
        } else {
            if (isEmpty(&stack)) {
                sprintf(msg, "Closing bracket '%c' found but stack is empty. Invalid!", c);
                log_state(s, i, &stack, msg);
                valid = false;
                break;
            }
            
            char top = peek(&stack);
            if (isMatch(top, c)) {
                pop(&stack);
                sprintf(msg, "Matched '%c' with '%c'. Popping from stack.", top, c);
                log_state(s, i, &stack, msg);
            } else {
                sprintf(msg, "Mismatched bracket '%c'. Expected match for '%c'. Invalid!", c, top);
                log_state(s, i, &stack, msg);
                valid = false;
                break;
            }
        }
    }
    
    if (valid) {
        if (isEmpty(&stack)) {
            log_state(s, -1, &stack, "All brackets matched. Input is VALID.");
        } else {
            log_state(s, -1, &stack, "Brackets left on stack. Input is INVALID.");
        }
    } else {
        // Already logged the error step
    }
    
    log_finish();
    return 0;
}
