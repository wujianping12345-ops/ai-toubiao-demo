#!/bin/bash

# 文件上传辅助脚本
# 用于打包和准备上传文件

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$PROJECT_DIR/ai-toubiao-demo"
OUTPUT_FILE="$PROJECT_DIR/ai-toubiao-demo.tar.gz"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║      准备部署文件包                    ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# 检查项目目录
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}[!] 错误: 项目目录不存在${NC}"
    exit 1
fi

echo -e "${YELLOW}[*] 正在打包项目文件...${NC}"

# 打包（排除不需要的文件）
cd "$PROJECT_DIR"
tar --exclude='node_modules' \
    --exclude='dist' \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    --exclude='.vscode' \
    --exclude='.idea' \
    -czf "$OUTPUT_FILE" ai-toubiao-demo/

# 计算文件大小
FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)

echo -e "${GREEN}[✓] 打包完成！${NC}"
echo ""
echo -e "${BLUE}文件信息:${NC}"
echo "  文件路径: $OUTPUT_FILE"
echo "  文件大小: $FILE_SIZE"
echo ""
echo -e "${YELLOW}上传方式:${NC}"
echo ""
echo "方式1: 使用SCP上传"
echo "  scp $OUTPUT_FILE root@59.110.18.172:/opt/"
echo ""
echo "方式2: 使用阿里云控制台"
echo "  1. 登录 https://ecs.console.aliyun.com"
echo "  2. 找到实例 59.110.18.172"
echo "  3. 点击'远程连接' → '文件管理'"
echo "  4. 上传文件到 /opt/"
echo ""
echo "方式3: 使用FTP/SFTP工具"
echo "  服务器: 59.110.18.172"
echo "  用户名: root"
echo "  密码: Sancai123"
echo "  上传到: /opt/"
echo ""
