@echo off
if not exist build mkdir build

echo Compiling logger...
gcc -Wall -Wextra -Iinclude -c src/logger.c -o build/logger.o
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling two_sum...
gcc -Wall -Wextra -Iinclude src/two_sum.c build/logger.o -o build/two_sum.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling three_sum...
gcc -Wall -Wextra -Iinclude src/three_sum.c build/logger.o -o build/three_sum.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling valid_parentheses...
gcc -Wall -Wextra -Iinclude src/valid_parentheses.c build/logger.o -o build/valid_parentheses.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling reverse_linked_list...
gcc -Wall -Wextra -Iinclude src/reverse_linked_list.c build/logger.o -o build/reverse_linked_list.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling binary_search...
gcc -Wall -Wextra -Iinclude src/binary_search.c build/logger.o -o build/binary_search.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling binary_tree_level_order...
gcc -Wall -Wextra -Iinclude src/binary_tree_level_order.c build/logger.o -o build/binary_tree_level_order.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling longest_substring...
gcc -Wall -Wextra -Iinclude src/longest_substring.c build/logger.o -o build/longest_substring.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling bfs_graph...
gcc -Wall -Wextra -Iinclude src/bfs_graph.c build/logger.o -o build/bfs_graph.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling fibonacci_dp...
gcc -Wall -Wextra -Iinclude src/fibonacci_dp.c build/logger.o -o build/fibonacci_dp.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling n_queens...
gcc -Wall -Wextra -Iinclude src/n_queens.c build/logger.o -o build/n_queens.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling bubble_sort...
gcc -Wall -Wextra -Iinclude src/bubble_sort.c build/logger.o -o build/bubble_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling bst_search...
gcc -o build/bst_search.exe src/bst_search.c build/logger.o
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling selection_sort...
gcc -Wall -Wextra -Iinclude src/selection_sort.c build/logger.o -o build/selection_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling insertion_sort...
gcc -Wall -Wextra -Iinclude src/insertion_sort.c build/logger.o -o build/insertion_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling merge_sort...
gcc -Wall -Wextra -Iinclude src/merge_sort.c build/logger.o -o build/merge_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling quick_sort...
gcc -Wall -Wextra -Iinclude src/quick_sort.c build/logger.o -o build/quick_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling randomized_quick_sort...
gcc -Wall -Wextra -Iinclude src/randomized_quick_sort.c build/logger.o -o build/randomized_quick_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling counting_sort...
gcc -Wall -Wextra -Iinclude src/counting_sort.c build/logger.o -o build/counting_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling radix_sort...
gcc -Wall -Wextra -Iinclude src/radix_sort.c build/logger.o -o build/radix_sort.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling stack_ll...
gcc -Wall -Wextra -Iinclude src/stack_ll.c build/logger.o -o build/stack_ll.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling queue_ll...
gcc -Wall -Wextra -Iinclude src/queue_ll.c build/logger.o -o build/queue_ll.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling doubly_linked_list...
gcc -Wall -Wextra -Iinclude src/doubly_linked_list.c build/logger.o -o build/doubly_linked_list.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling deque_ll...
gcc -Wall -Wextra -Iinclude src/deque_ll.c build/logger.o -o build/deque_ll.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling recursion_fib...
gcc -Wall -Wextra -Iinclude src/recursion_fib.c build/logger.o -o build/recursion_fib.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling factorial...
gcc -Wall -Wextra -Iinclude src/factorial.c build/logger.o -o build/factorial.exe
if %errorlevel% neq 0 exit /b %errorlevel%

echo Build successful!
