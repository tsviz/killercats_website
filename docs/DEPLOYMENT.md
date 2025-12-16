# Deployment Guide

## Table of Contents
- [Overview](#overview)
- [Deployment Options](#deployment-options)
- [Prerequisites](#prerequisites)
- [Local Deployment](#local-deployment)
- [Azure App Service Deployment](#azure-app-service-deployment)
- [IIS Deployment (Windows Server)](#iis-deployment-windows-server)
- [Linux Deployment](#linux-deployment)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)

## Overview

This guide covers various deployment options for the Killer Cats from Outer Space website. The application is built on ASP.NET Core 8.0 and can be deployed to multiple platforms.

## Deployment Options

| Platform | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| Azure App Service | Easy | Paid | Production, auto-scaling |
| IIS (Windows Server) | Medium | Varies | Windows infrastructure |
| Linux (Nginx/Apache) | Medium | Varies | Linux infrastructure |
| Docker | Medium | Varies | Containerized environments |
| Local/Development | Easy | Free | Testing and development |

## Prerequisites

### General Requirements
- .NET 8.0 Runtime (or SDK for building)
- Access to deployment environment
- Domain name (optional but recommended)
- SSL certificate (recommended for production)

### Build Requirements
- .NET 8.0 SDK
- Git (for source control)

## Local Deployment

### Development Mode

```bash
cd KillerCatsFromOuterSpace
dotnet run
```

Application runs at: `http://localhost:8080`

### Production-like Local Deployment

1. **Build in Release mode**
   ```bash
   dotnet build --configuration Release
   ```

2. **Publish the application**
   ```bash
   dotnet publish --configuration Release --output ./publish
   ```

3. **Run the published application**
   ```bash
   cd publish
   dotnet KillerCatsFromOuterSpace.dll
   ```

## Azure App Service Deployment

### Method 1: Visual Studio Deployment

1. **Right-click the project** in Solution Explorer
2. Select **Publish**
3. Choose **Azure**
4. Select **Azure App Service (Windows)** or **Azure App Service (Linux)**
5. Sign in to Azure
6. Create new or select existing App Service
7. Click **Publish**

### Method 2: Azure CLI Deployment

1. **Install Azure CLI**
   ```bash
   # Download from https://aka.ms/installazurecliwindows
   ```

2. **Login to Azure**
   ```bash
   az login
   ```

3. **Create Resource Group**
   ```bash
   az group create --name killercats-rg --location eastus
   ```

4. **Create App Service Plan**
   ```bash
   az appservice plan create \
     --name killercats-plan \
     --resource-group killercats-rg \
     --sku B1 \
     --is-linux
   ```

5. **Create Web App**
   ```bash
   az webapp create \
     --name killercats-website \
     --resource-group killercats-rg \
     --plan killercats-plan \
     --runtime "DOTNET|8.0"
   ```

6. **Deploy Application**
   ```bash
   # Build and publish
   dotnet publish -c Release -o ./publish

   # Create zip file
   cd publish
   zip -r ../app.zip .
   cd ..

   # Deploy to Azure
   az webapp deployment source config-zip \
     --resource-group killercats-rg \
     --name killercats-website \
     --src app.zip
   ```

7. **Access your site**
   ```
   https://killercats-website.azurewebsites.net
   ```

### Azure Configuration

Set environment variables in Azure Portal:
1. Go to **Configuration** → **Application settings**
2. Add:
   - `ASPNETCORE_ENVIRONMENT`: `Production`
   - `WEBSITE_RUN_FROM_PACKAGE`: `1` (optional, for better performance)

## IIS Deployment (Windows Server)

### Prerequisites

1. **Windows Server** with IIS installed
2. **.NET 8.0 Hosting Bundle**
   - Download from [https://dotnet.microsoft.com/download/dotnet/8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
   - Install on the server

### Deployment Steps

1. **Publish the Application**
   ```bash
   dotnet publish -c Release -o C:\inetpub\killercats
   ```

2. **Create IIS Site**
   - Open **IIS Manager**
   - Right-click **Sites** → **Add Website**
   - Set:
     - Site name: `KillerCatsWebsite`
     - Physical path: `C:\inetpub\killercats`
     - Binding: Port 80 (or 443 for HTTPS)
     - Host name: `yourdomain.com`

3. **Configure Application Pool**
   - Select the application pool
   - Set **.NET CLR Version**: `No Managed Code`
   - Set **Managed Pipeline Mode**: `Integrated`
   - Set **Identity**: `ApplicationPoolIdentity` or custom account

4. **Set Permissions**
   ```powershell
   # Grant permissions to application pool identity
   icacls "C:\inetpub\killercats" /grant "IIS APPPOOL\KillerCatsWebsite:(OI)(CI)RX"
   ```

5. **Configure web.config** (automatically generated)
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <location path="." inheritInChildApplications="false">
       <system.webServer>
         <handlers>
           <add name="aspNetCore" path="*" verb="*" 
                modules="AspNetCoreModuleV2" 
                resourceType="Unspecified" />
         </handlers>
         <aspNetCore processPath="dotnet" 
                     arguments=".\KillerCatsFromOuterSpace.dll" 
                     stdoutLogEnabled="false" 
                     stdoutLogFile=".\logs\stdout" 
                     hostingModel="inprocess" />
       </system.webServer>
     </location>
   </configuration>
   ```

6. **Restart IIS**
   ```powershell
   iisreset
   ```

### SSL Configuration (IIS)

1. Obtain SSL certificate (Let's Encrypt, commercial CA, etc.)
2. Import certificate to Windows Certificate Store
3. In IIS Manager:
   - Select site → **Bindings** → **Add**
   - Type: `https`
   - Port: `443`
   - SSL certificate: Select imported certificate

## Linux Deployment

### Ubuntu/Debian with Nginx

#### 1. Install Prerequisites

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install .NET 8.0 Runtime
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 8.0 --runtime aspnetcore

# Install Nginx
sudo apt install nginx -y
```

#### 2. Publish and Transfer Application

```bash
# On development machine
dotnet publish -c Release -o ./publish

# Transfer to server (using SCP)
scp -r ./publish/* user@server:/var/www/killercats/
```

#### 3. Create Systemd Service

```bash
sudo nano /etc/systemd/system/killercats.service
```

Add the following:

```ini
[Unit]
Description=Killer Cats Website
After=network.target

[Service]
WorkingDirectory=/var/www/killercats
ExecStart=/home/user/.dotnet/dotnet /var/www/killercats/KillerCatsFromOuterSpace.dll
Restart=always
RestartSec=10
SyslogIdentifier=killercats
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

#### 4. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/killercats
```

Add the following:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/killercats /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Start the Application

```bash
sudo systemctl enable killercats
sudo systemctl start killercats
sudo systemctl status killercats
```

#### 6. Configure SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

## Docker Deployment

### 1. Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["KillerCatsFromOuterSpace/KillerCatsFromOuterSpace.csproj", "KillerCatsFromOuterSpace/"]
RUN dotnet restore "KillerCatsFromOuterSpace/KillerCatsFromOuterSpace.csproj"
COPY . .
WORKDIR "/src/KillerCatsFromOuterSpace"
RUN dotnet build "KillerCatsFromOuterSpace.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "KillerCatsFromOuterSpace.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KillerCatsFromOuterSpace.dll"]
```

### 2. Create .dockerignore

```
**/bin/
**/obj/
**/out/
**/logs/
**/.vs/
**/.vscode/
**/.git/
**/publish/
*.user
*.suo
*.cache
```

### 3. Build Docker Image

```bash
docker build -t killercats-website .
```

### 4. Run Container

```bash
docker run -d \
  --name killercats \
  -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  killercats-website
```

### 5. Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Environment Configuration

### Configuration Files

**appsettings.json** (base configuration):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**appsettings.Production.json** (production overrides):
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft": "Error"
    }
  }
}
```

### Environment Variables

Set these in your deployment environment:

| Variable | Value | Purpose |
|----------|-------|---------|
| `ASPNETCORE_ENVIRONMENT` | `Production` | Sets environment mode |
| `ASPNETCORE_URLS` | `http://+:8080` | Bind address |
| `AllowedHosts` | `yourdomain.com` | Allowed hostnames |

## Post-Deployment Checklist

- [ ] Application is running and accessible
- [ ] SSL/HTTPS is working
- [ ] All static assets load (CSS, JS, images)
- [ ] Navigation works correctly
- [ ] Forms and modals function properly
- [ ] Cat game works
- [ ] Audio player functions
- [ ] Responsive design on mobile
- [ ] No console errors in browser
- [ ] Check application logs for errors
- [ ] Performance is acceptable
- [ ] Email integration works (mailto links)
- [ ] Events display correctly
- [ ] Band member bios load

## Monitoring and Maintenance

### Logging

**View logs:**

Azure:
```bash
az webapp log tail --name killercats-website --resource-group killercats-rg
```

Linux (systemd):
```bash
sudo journalctl -u killercats -f
```

Docker:
```bash
docker logs -f killercats
```

### Health Monitoring

Consider adding:
- Application Insights (Azure)
- Uptime monitoring (Pingdom, UptimeRobot)
- Log aggregation (ELK stack, Seq)
- Performance monitoring

### Updates

1. **Pull latest code**
   ```bash
   git pull origin main
   ```

2. **Build and publish**
   ```bash
   dotnet publish -c Release -o ./publish
   ```

3. **Deploy** using chosen method

4. **Restart application**

### Backups

- Backup application files
- Backup configuration
- Backup any uploaded content
- Test restoration process

## Troubleshooting

### Application Won't Start

**Check logs:**
```bash
# Azure
az webapp log download --name killercats-website --resource-group killercats-rg

# Linux
sudo journalctl -u killercats -n 100

# Docker
docker logs killercats
```

**Common issues:**
- Missing .NET runtime
- Port conflicts
- Permission issues
- Missing dependencies

### 502 Bad Gateway (Nginx)

1. Check if application is running:
   ```bash
   sudo systemctl status killercats
   ```

2. Check if port 8080 is listening:
   ```bash
   sudo netstat -tlnp | grep 8080
   ```

3. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Static Files Not Loading

1. Verify wwwroot is published
2. Check file permissions
3. Verify URL paths are correct
4. Check browser console for 404 errors

### Performance Issues

1. Enable response caching
2. Use CDN for static assets
3. Optimize images
4. Enable compression (Gzip/Brotli)
5. Scale up/out resources

## Security Best Practices

- [ ] Enable HTTPS only
- [ ] Set secure headers (HSTS, CSP)
- [ ] Keep .NET runtime updated
- [ ] Regular security audits
- [ ] Monitor access logs
- [ ] Use strong authentication (if added)
- [ ] Firewall configuration
- [ ] Regular backups

## Additional Resources

- [ASP.NET Core Deployment Documentation](https://docs.microsoft.com/aspnet/core/host-and-deploy/)
- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Support

For deployment issues:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Open an issue on [GitHub](https://github.com/tsviz/killercats_website/issues)
- Contact: kk1llercatsfromouterspace@gmail.com
