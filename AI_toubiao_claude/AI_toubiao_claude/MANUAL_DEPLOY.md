# 手动部署指南

由于SSH密码认证可能被禁用，这里提供手动部署步骤。

## 📋 部署信息汇总

- **服务器IP**: 59.110.18.172
- **SSH用户名**: root
- **SSH密码**: Sancai123
- **部署端口**: 8080（避免影响现有系统）
- **项目目录**: /opt/ai-toubiao-demo

## 🚀 方案一：手动部署（推荐）

### 步骤1：连接到服务器

```bash
# 方式1：使用密码（如果允许）
ssh root@59.110.18.172

# 方式2：使用阿里云控制台远程连接
# 登录 https://ecs.console.aliyun.com
# 找到实例，点击"远程连接"
```

### 步骤2：检查环境

```bash
# 检查Docker是否安装
docker --version

# 如果未安装，执行：
curl -fsSL https://get.docker.com | sh
systemctl start docker
systemctl enable docker

# 检查Docker Compose是否安装
docker-compose --version

# 如果未安装，执行：
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 步骤3：创建部署目录

```bash
mkdir -p /opt/ai-toubiao-demo
cd /opt/ai-toubiao-demo
```

### 步骤4：上传项目文件

**在本地机器上执行：**

```bash
cd /Users/crj/Documents/code/AI_toubiao_claude

# 打包项目（排除node_modules）
tar --exclude='node_modules' --exclude='dist' \
    --exclude='.git' --exclude='.DS_Store' \
    -czf ai-toubiao-demo.tar.gz ai-toubiao-demo/

# 上传到服务器（如果SSH可用）
scp ai-toubiao-demo.tar.gz root@59.110.18.172:/opt/ai-toubiao-demo/

# 或者使用阿里云控制台的文件上传功能
```

**在服务器上执行：**

```bash
cd /opt/ai-toubiao-demo
tar -xzf ai-toubiao-demo.tar.gz --strip-components=1
rm ai-toubiao-demo.tar.gz
```

### 步骤5：构建和启动

```bash
cd /opt/ai-toubiao-demo

# 构建Docker镜像
docker build -t ai-toubiao-demo:latest .

# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 步骤6：验证部署

访问：`http://59.110.18.172:8080`

## 🔧 方案二：使用阿里云控制台上传文件

如果SSH连接有问题，可以使用阿里云控制台：

1. **登录阿里云控制台**
   - 账号: hzsczx
   - 密码: a123456b/
   - 地址: https://ecs.console.aliyun.com

2. **找到ECS实例**
   - 实例ID: i-2ze2103869di38eql9fw
   - IP: 59.110.18.172

3. **使用文件上传功能**
   - 点击"远程连接" → "文件管理"
   - 上传项目文件到 `/opt/ai-toubiao-demo`

4. **在控制台执行命令**
   - 使用"远程连接" → "命令执行"
   - 执行上述步骤2-6的命令

## 🔒 方案三：启用SSH密码登录（如果被禁用）

如果需要启用密码登录，在服务器上执行：

```bash
# 编辑SSH配置
vi /etc/ssh/sshd_config

# 确保以下配置：
PasswordAuthentication yes
PubkeyAuthentication yes

# 重启SSH服务
systemctl restart sshd
```

## 📝 部署后验证

```bash
# 检查容器状态
docker ps | grep ai-toubiao

# 检查端口占用
netstat -tlnp | grep 8080

# 检查日志
cd /opt/ai-toubiao-demo
docker-compose logs
```

## 🛠️ 常用管理命令

```bash
cd /opt/ai-toubiao-demo

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 更新部署（重新构建）
docker-compose down
docker build -t ai-toubiao-demo:latest .
docker-compose up -d
```

## ⚠️ 注意事项

1. **端口隔离**: 使用8080端口，不会影响现有系统
2. **容器隔离**: 独立容器名称和网络
3. **目录隔离**: 仅使用 `/opt/ai-toubiao-demo`
4. **安全组**: 确保阿里云安全组开放8080端口

## 🔍 故障排查

### 如果8080端口被占用

修改 `docker-compose.yml` 中的端口：
```yaml
ports:
  - "8081:80"  # 改为其他端口
```

### 如果构建失败

```bash
# 检查Docker是否运行
systemctl status docker

# 检查磁盘空间
df -h

# 查看详细错误
docker build -t ai-toubiao-demo:latest . --no-cache
```

### 如果无法访问

1. 检查安全组是否开放8080端口
2. 检查防火墙规则
3. 检查容器日志：`docker-compose logs`

---

**部署完成后访问**: `http://59.110.18.172:8080`
