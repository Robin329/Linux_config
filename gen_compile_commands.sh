#!/bin/sh

# Check dependencies
function check_dependencies() {
    if ! command -v compiledb &> /dev/null; then
        loge "Error: compiledb is not installed. Please install it using 'pip install compiledb'"
        exit 1
    fi
}
ROOT=`pwd`
echo "ROOT:$ROOT"
check_dependencies

dirs=(
    "display"
    "resmgr"
    "tools"
    "config"
    "disp-sdk"
    "memobj"
    "openwfd"
    "plane"
    "tests"
)
commands_file=
# 遍历目录数组
for dir in "${dirs[@]}"
do
    # 切换到目录
    cd "$dir"
    if [ -d "$ROOT/.cache" ]; then
        echo "The .cache directory exists."
    else
        echo "The .cache directory does not exist."
        mkdir -p $ROOT/.cache
    fi
    make -Bn > $ROOT/.cache/${dir}_commands.txt
    commands_file="${commands_file} $ROOT/.cache/${dir}_commands.txt"
done
cat $commands_file > $ROOT/.cache/all_commands.txt
compiledb -n -o compile_commands.json < $ROOT/.cache/all_commands.txt

# 切换回原始目录
cd $ROOT

# The -n option indicates "dry run" mode
# CompileDB will display the commands that will be run, but will not actually run them.
# compiledb -n make || echo -e "\033[31m === Compile failed!! ===\033[0m"
