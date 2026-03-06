@echo off
chcp 65001 >nul
cd /d "%~dp0ai-toubiao-demo"
if not exist node_modules (
    echo [*] 首次运行，正在安装依赖...
    call npm install
)
echo [*] 启动开发服务器...
call npm run dev
pause
