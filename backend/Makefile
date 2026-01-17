CC = gcc
CFLAGS = -Wall -Wextra -Iinclude
SRC_DIR = src
BUILD_DIR = build

# List of algorithms to build
ALGORITHMS = two_sum three_sum valid-parentheses reverse_linked_list binary_search binary_tree_level_order longest_substring bfs_graph fibonacci_dp n_queens bubble_sort bst_search
# We will add more to this list as we implement them: 
# kadane binary_search valid_parentheses ...

# Default target
all: $(ALGORITHMS)

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

clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean
