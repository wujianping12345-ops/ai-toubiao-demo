#!/bin/bash

# AI投标黑马 Demo 快速启动脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/ai-toubiao-demo"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║       AI投标黑马 Demo 启动脚本         ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# 检查项目目录是否存在
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}[!] 项目目录不存在: $PROJECT_DIR${NC}"
    exit 1
fi

cd "$PROJECT_DIR"

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[*] 首次运行，正在安装依赖...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}[!] 依赖安装失败${NC}"
        exit 1
    fi
    echo -e "${GREEN}[✓] 依赖安装完成${NC}"
fi

# 解析参数
case "$1" in
    "dev"|"")
        echo -e "${GREEN}[*] 启动开发服务器...${NC}"
        echo ""
        npm run dev
        ;;
    "build")
        echo -e "${GREEN}[*] 构建生产版本...${NC}"
        npm run build
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}[✓] 构建完成！${NC}"
            echo -e "${BLUE}[i] 产物目录: ${PROJECT_DIR}/dist${NC}"
        fi
        ;;
    "preview")
        echo -e "${GREEN}[*] 预览生产版本...${NC}"
        if [ ! -d "dist" ]; then
            echo -e "${YELLOW}[*] 未找到构建产物，先进行构建...${NC}"
            npm run build
        fi
        npm run preview
        ;;
    "help"|"-h"|"--help")
        echo "用法: ./start.sh [命令]"
        echo ""
        echo "命令:"
        echo "  dev      启动开发服务器 (默认)"
        echo "  build    构建生产版本"
        echo "  preview  预览生产版本"
        echo "  help     显示帮助信息"
        echo ""
        ;;
    *)
        echo -e "${RED}[!] 未知命令: $1${NC}"
        echo "运行 ./start.sh help 查看帮助"
        exit 1
        ;;
esac
