# AI投标黑马 Demo - Windows 启动脚本 (PowerShell)
$ProjectDir = $PSScriptRoot
Set-Location $ProjectDir

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    AI投标黑马 Demo 启动脚本 (Windows)   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "[*] 首次运行，正在安装依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[!] 依赖安装失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "[√] 依赖安装完成" -ForegroundColor Green
}

$cmd = $args[0]
switch ($cmd) {
    "dev" { 
        Write-Host "[*] 启动开发服务器..." -ForegroundColor Green
        npm run dev 
    }
    "build" { 
        Write-Host "[*] 构建生产版本..." -ForegroundColor Green
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[√] 构建完成！产物目录: $ProjectDir\dist" -ForegroundColor Green
        }
    }
    "preview" { 
        Write-Host "[*] 预览生产版本..." -ForegroundColor Green
        if (-not (Test-Path "dist")) {
            Write-Host "[*] 未找到构建产物，先进行构建..." -ForegroundColor Yellow
            npm run build
        }
        npm run preview 
    }
    "help" { 
        Write-Host "用法: .\start.ps1 [命令]"
        Write-Host "命令: dev | build | preview | help"
    }
    default { 
        Write-Host "[*] 启动开发服务器..." -ForegroundColor Green
        npm run dev 
    }
}
