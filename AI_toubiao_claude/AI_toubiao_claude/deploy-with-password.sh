#!/bin/bash

# AI投标黑马 - 阿里云部署脚本（支持密码认证）
# 使用方法: ./deploy-with-password.sh [服务器IP] [用户名] [密码]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置变量
SERVER_IP="${1:-}"
SERVER_USER="${2:-root}"
SERVER_PASSWORD="${3:-}"
PROJECT_NAME="ai-toubiao-demo"
REMOTE_DIR="/opt/${PROJECT_NAME}"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)/ai-toubiao-demo"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║    AI投标黑马 - 阿里云部署脚本         ║"
echo "║        (密码认证版本)                  ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# 检查参数
if [ -z "$SERVER_IP" ]; then
    echo -e "${RED}[!] 错误: 请提供服务器IP地址${NC}"
    echo "用法: ./deploy-with-password.sh <服务器IP> [用户名] [密码]"
    echo "示例: ./deploy-with-password.sh 59.110.18.172 root Sancai123"
    exit 1
fi

# 如果没有提供密码，提示输入
if [ -z "$SERVER_PASSWORD" ]; then
    echo -e "${YELLOW}[*] 请输入SSH密码:${NC}"
    read -s SERVER_PASSWORD
    echo ""
fi

# 检查 sshpass 是否安装
if ! command -v sshpass &> /dev/null; then
    echo -e "${YELLOW}[*] 检测到未安装 sshpass，正在安装...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if ! command -v brew &> /dev/null; then
            echo -e "${RED}[!] 错误: 需要先安装 Homebrew${NC}"
            echo "请运行: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            exit 1
        fi
        brew install hudochenkov/sshpass/sshpass
    else
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y sshpass
        elif command -v yum &> /dev/null; then
            sudo yum install -y sshpass
        else
            echo -e "${RED}[!] 错误: 无法自动安装 sshpass，请手动安装${NC}"
            exit 1
        fi
    fi
fi

# 构建 SSH 命令（使用 sshpass）
SSH_CMD="sshpass -p '${SERVER_PASSWORD}' ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
SCP_CMD="sshpass -p '${SERVER_PASSWORD}' scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

echo -e "${YELLOW}[*] 服务器信息:${NC}"
echo "  IP: $SERVER_IP"
echo "  用户: $SERVER_USER"
echo "  远程目录: $REMOTE_DIR"
echo ""

# 检查本地项目目录
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}[!] 错误: 项目目录不存在: $LOCAL_DIR${NC}"
    exit 1
fi

# 检查 Docker 是否安装
echo -e "${YELLOW}[*] 检查本地 Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[!] 错误: 本地未安装 Docker${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] Docker 已安装${NC}"

# 检查服务器连接
echo -e "${YELLOW}[*] 检查服务器连接...${NC}"
if ! eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'echo 连接成功'" &> /dev/null; then
    echo -e "${RED}[!] 错误: 无法连接到服务器${NC}"
    echo "请检查:"
    echo "  1. 服务器IP是否正确"
    echo "  2. 密码是否正确"
    echo "  3. 服务器安全组是否开放22端口"
    exit 1
fi
echo -e "${GREEN}[✓] 服务器连接成功${NC}"

# 检查服务器 Docker
echo -e "${YELLOW}[*] 检查服务器 Docker 环境...${NC}"
if ! eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'command -v docker &> /dev/null'"; then
    echo -e "${YELLOW}[*] 服务器未安装 Docker，正在安装...${NC}"
    eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP}" << 'EOF'
        curl -fsSL https://get.docker.com | sh
        systemctl start docker
        systemctl enable docker
EOF
fi
echo -e "${GREEN}[✓] Docker 环境就绪${NC}"

# 检查服务器 Docker Compose
echo -e "${YELLOW}[*] 检查服务器 Docker Compose...${NC}"
if ! eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'command -v docker-compose &> /dev/null'"; then
    echo -e "${YELLOW}[*] 安装 Docker Compose...${NC}"
    eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP}" << 'EOF'
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
EOF
fi
echo -e "${GREEN}[✓] Docker Compose 已安装${NC}"

# 检查端口占用情况（8080端口）
echo -e "${YELLOW}[*] 检查端口占用情况（确保不影响现有系统）...${NC}"
PORT_CHECK=$(eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'netstat -tlnp 2>/dev/null | grep :8080 || ss -tlnp 2>/dev/null | grep :8080 || echo \"端口8080可用\"'")
if echo "$PORT_CHECK" | grep -q ":8080"; then
    echo -e "${YELLOW}[!] 警告: 端口8080已被占用，正在检查占用情况...${NC}"
    echo "$PORT_CHECK"
    echo -e "${YELLOW}[*] 将使用8080端口，如果冲突请手动修改docker-compose.yml${NC}"
else
    echo -e "${GREEN}[✓] 端口8080可用${NC}"
fi

# 检查现有容器（确保不会冲突）
echo -e "${YELLOW}[*] 检查现有Docker容器...${NC}"
EXISTING_CONTAINERS=$(eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'docker ps -a --format \"{{.Names}}\" | grep -v ai-toubiao-web || echo \"无冲突容器\"'")
echo -e "${BLUE}[i] 现有容器列表（不影响部署）:${NC}"
eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'docker ps --format \"table {{.Names}}\t{{.Status}}\t{{.Ports}}\"'" || true
echo ""

# 创建远程目录
echo -e "${YELLOW}[*] 创建远程目录...${NC}"
eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP} 'mkdir -p $REMOTE_DIR'"
echo -e "${GREEN}[✓] 远程目录已创建${NC}"

# 构建 Docker 镜像
echo -e "${YELLOW}[*] 构建 Docker 镜像...${NC}"
cd "$LOCAL_DIR"
docker build -t ${PROJECT_NAME}:latest .

# 保存镜像为 tar 文件
echo -e "${YELLOW}[*] 导出 Docker 镜像...${NC}"
docker save ${PROJECT_NAME}:latest | gzip > /tmp/${PROJECT_NAME}.tar.gz

# 上传镜像和配置文件
echo -e "${YELLOW}[*] 上传文件到服务器...${NC}"
eval "$SCP_CMD /tmp/${PROJECT_NAME}.tar.gz ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
eval "$SCP_CMD docker-compose.yml ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"

# 在服务器上加载镜像并启动
echo -e "${YELLOW}[*] 在服务器上部署应用...${NC}"
eval "$SSH_CMD ${SERVER_USER}@${SERVER_IP}" << EOF
    cd $REMOTE_DIR
    
    # 加载镜像
    docker load < ${PROJECT_NAME}.tar.gz
    
    # 停止旧容器（如果存在）
    docker-compose down 2>/dev/null || true
    
    # 启动新容器
    docker-compose up -d
    
    # 清理旧镜像和临时文件
    docker image prune -f
    rm -f ${PROJECT_NAME}.tar.gz
    
    # 显示容器状态
    echo ""
    docker-compose ps
EOF

# 清理本地临时文件
rm -f /tmp/${PROJECT_NAME}.tar.gz

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           部署完成！                   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}访问地址: http://${SERVER_IP}:8080${NC}"
echo -e "${YELLOW}[!] 注意: 使用8080端口，不会影响现有系统${NC}"
echo ""
echo -e "${YELLOW}常用命令:${NC}"
echo "  查看日志: sshpass -p '${SERVER_PASSWORD}' ssh ${SERVER_USER}@${SERVER_IP} 'cd ${REMOTE_DIR} && docker-compose logs -f'"
echo "  重启服务: sshpass -p '${SERVER_PASSWORD}' ssh ${SERVER_USER}@${SERVER_IP} 'cd ${REMOTE_DIR} && docker-compose restart'"
echo "  停止服务: sshpass -p '${SERVER_PASSWORD}' ssh ${SERVER_USER}@${SERVER_IP} 'cd ${REMOTE_DIR} && docker-compose down'"
echo "  查看状态: sshpass -p '${SERVER_PASSWORD}' ssh ${SERVER_USER}@${SERVER_IP} 'cd ${REMOTE_DIR} && docker-compose ps'"
echo ""
echo -e "${BLUE}[i] 隔离说明:${NC}"
echo "  - 使用独立端口: 8080（不影响80端口）"
echo "  - 独立容器名称: ai-toubiao-web"
echo "  - 独立网络: ai-toubiao-network"
echo "  - 独立目录: ${REMOTE_DIR}"
