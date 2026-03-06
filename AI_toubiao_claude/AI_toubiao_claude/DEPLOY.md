# AI投标黑马 - 阿里云部署指南

## 📋 部署前准备

### 需要提供的信息

在开始部署之前，请准备以下信息：

1. **服务器信息**
   - 服务器公网IP地址
   - SSH用户名（通常是 `root`）
   - SSH密码或SSH私钥路径

2. **服务器要求**
   - 操作系统：CentOS 7+ / Ubuntu 18.04+ / Debian 10+
   - 内存：至少 1GB（推荐 2GB+）
   - 磁盘：至少 5GB 可用空间
   - 网络：可访问互联网（用于下载Docker镜像）

3. **安全组配置**
   - 开放端口 22（SSH）
   - 开放端口 80（HTTP）
   - 如需HTTPS，开放端口 443

## 🚀 快速部署

### 方法一：使用部署脚本（推荐）

1. **给部署脚本添加执行权限**
   ```bash
   chmod +x deploy.sh
   ```

2. **执行部署**
   ```bash
   # 使用密码认证
   ./deploy.sh <服务器IP> <用户名>
   
   # 使用SSH密钥认证（推荐）
   ./deploy.sh <服务器IP> <用户名> <SSH密钥路径>
   
   # 示例
   ./deploy.sh 47.xxx.xxx.xxx root ~/.ssh/id_rsa
   ```

3. **等待部署完成**
   - 脚本会自动安装Docker和Docker Compose（如未安装）
   - 自动构建镜像并上传到服务器
   - 自动启动服务

4. **访问应用**
   ```
   http://<服务器IP>
   ```

### 方法二：手动部署

#### 步骤1：准备服务器环境

```bash
# SSH连接到服务器
ssh root@<服务器IP>

# 安装Docker
curl -fsSL https://get.docker.com | sh
systemctl start docker
systemctl enable docker

# 安装Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### 步骤2：上传项目文件

```bash
# 在本地打包项目（排除node_modules）
cd ai-toubiao-demo
tar --exclude='node_modules' --exclude='dist' -czf ../project.tar.gz .

# 上传到服务器
scp ../project.tar.gz root@<服务器IP>:/opt/ai-toubiao-demo/

# 在服务器上解压
ssh root@<服务器IP>
cd /opt/ai-toubiao-demo
tar -xzf project.tar.gz
rm project.tar.gz
```

#### 步骤3：构建和启动

```bash
# 在服务器上构建镜像
cd /opt/ai-toubiao-demo
docker build -t ai-toubiao-demo:latest .

# 启动服务
docker-compose up -d

# 查看状态
docker-compose ps
```

## 🔧 配置说明

### 端口配置

默认使用80端口，如需修改：

1. 编辑 `docker-compose.yml`：
   ```yaml
   ports:
     - "8080:80"  # 改为8080端口
   ```

2. 重新部署：
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### 域名配置

如需使用域名访问：

1. **配置Nginx反向代理**（在服务器上安装Nginx）：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:80;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

2. **或修改docker-compose.yml使用自定义域名**

### HTTPS配置

1. **使用Let's Encrypt免费证书**：
   ```bash
   # 安装certbot
   yum install certbot python3-certbot-nginx -y  # CentOS
   apt-get install certbot python3-certbot-nginx -y  # Ubuntu/Debian
   
   # 获取证书
   certbot --nginx -d your-domain.com
   ```

2. **修改docker-compose.yml添加443端口映射**

## 📝 常用命令

### 查看日志
```bash
ssh root@<服务器IP> 'cd /opt/ai-toubiao-demo && docker-compose logs -f'
```

### 重启服务
```bash
ssh root@<服务器IP> 'cd /opt/ai-toubiao-demo && docker-compose restart'
```

### 停止服务
```bash
ssh root@<服务器IP> 'cd /opt/ai-toubiao-demo && docker-compose down'
```

### 更新部署
```bash
# 重新运行部署脚本即可
./deploy.sh <服务器IP> <用户名> <SSH密钥路径>
```

### 查看容器状态
```bash
ssh root@<服务器IP> 'cd /opt/ai-toubiao-demo && docker-compose ps'
```

### 进入容器
```bash
ssh root@<服务器IP>
docker exec -it ai-toubiao-web sh
```

## 🔍 故障排查

### 1. 无法连接服务器
- 检查服务器IP是否正确
- 检查安全组是否开放22端口
- 检查SSH密钥是否正确

### 2. 无法访问网站
- 检查安全组是否开放80端口
- 检查容器是否运行：`docker-compose ps`
- 查看日志：`docker-compose logs`

### 3. 构建失败
- 检查网络连接（需要下载Docker镜像）
- 检查磁盘空间：`df -h`
- 查看详细错误：`docker-compose logs`

### 4. 端口被占用
```bash
# 查看端口占用
netstat -tlnp | grep 80

# 修改docker-compose.yml中的端口映射
```

## 📦 项目结构

```
ai-toubiao-demo/
├── Dockerfile              # Docker构建文件
├── docker-compose.yml      # Docker Compose配置
├── nginx.conf             # Nginx配置
├── .dockerignore          # Docker忽略文件
├── package.json           # 项目依赖
└── src/                   # 源代码目录
```

## 🔐 安全建议

1. **使用SSH密钥认证**（而非密码）
2. **定期更新系统和Docker**
3. **配置防火墙规则**
4. **使用HTTPS**（生产环境）
5. **定期备份数据**

## 📞 技术支持

如遇到问题，请检查：
1. Docker和Docker Compose版本
2. 服务器资源使用情况
3. 网络连接状态
4. 日志文件内容

---

**部署完成后，访问 `http://<服务器IP>` 即可使用应用！**
