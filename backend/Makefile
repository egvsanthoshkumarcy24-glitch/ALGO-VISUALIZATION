CC = gcc
CFLAGS = -Wall -Wextra -Iinclude
CFLAGS_DEV = $(CFLAGS) -g -O0 -fsanitize=address,undefined
CFLAGS_PROD = $(CFLAGS) -O2
SRC_DIR = src
BUILD_DIR = build
TEST_DIR = test

# List of algorithms to build
ALGORITHMS = two_sum three_sum valid-parentheses reverse_linked_list binary_search binary_tree_level_order longest_substring bfs_graph fibonacci_dp n_queens bubble_sort bst_search selection_sort insertion_sort merge_sort quick_sort counting_sort radix_sort stack_ll queue_ll deque_ll factorial recursion_fib doubly_linked_list randomized_quick_sort
# We will add more to this list as we implement them: 
# kadane binary_search valid_parentheses ...

# Default target
all: $(ALGORITHMS)

# Development build with sanitizers
dev: CFLAGS := $(CFLAGS_DEV)
dev: clean all

# Production build with optimizations
prod: CFLAGS := $(CFLAGS_PROD)
prod: clean all

# Compile logger
$(BUILD_DIR)/logger.o: $(SRC_DIR)/logger.c include/logger.h | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Pattern rule for algorithms
# Each algorithm should have a .c file in src/
# e.g., src/two_sum.c -> build/two_sum
%: $(SRC_DIR)/%.c $(BUILD_DIR)/logger.o | $(BUILD_DIR)
	$(CC) $(CFLAGS) $< $(BUILD_DIR)/logger.o -o $(BUILD_DIR)/$@

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Run all algorithms with test inputs (basic smoke test)
test: all
	@echo "Running basic smoke tests..."
	@$(BUILD_DIR)/bubble_sort 5,3,8,1,9 || true
	@$(BUILD_DIR)/binary_search 1,2,3,4,5 3 || true
	@$(BUILD_DIR)/factorial 5 || true
	@echo "Smoke tests complete"

# Format C code using clang-format
format:
	clang-format -i $(SRC_DIR)/*.c include/*.h

# Check formatting without modifying files
format-check:
	clang-format --dry-run --Werror $(SRC_DIR)/*.c include/*.h

# Run with valgrind for memory leak detection (Unix only)
valgrind-%: $(BUILD_DIR)/%
	valgrind --leak-check=full --show-leak-kinds=all $(BUILD_DIR)/$*

clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean dev prod test format format-check
