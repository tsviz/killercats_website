# Troubleshooting Guide

## Table of Contents
- [Common Issues](#common-issues)
- [Build Errors](#build-errors)
- [Runtime Errors](#runtime-errors)
- [Frontend Issues](#frontend-issues)
- [Deployment Issues](#deployment-issues)
- [Development Environment](#development-environment)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Getting Help](#getting-help)

## Common Issues

### Application Won't Start

#### Issue: `dotnet: command not found`

**Cause**: .NET SDK not installed or not in PATH.

**Solution**:
1. Install .NET 8.0 SDK from [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
2. Verify installation:
   ```bash
   dotnet --version
   ```
3. Restart terminal/IDE

#### Issue: Port 8080 Already in Use

**Symptoms**:
```
Unable to bind to http://localhost:8080 on the IPv4 loopback interface: 
'Address already in use'.
```

**Solution 1**: Find and stop the process using port 8080
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

**Solution 2**: Change the port in `Program.cs`
```csharp
webBuilder.UseUrls("http://*:5000");  // Use different port
```

#### Issue: `project.assets.json not found`

**Cause**: NuGet packages not restored.

**Solution**:
```bash
dotnet restore
```

### Page Not Found (404)

#### Issue: Page Shows 404 Error

**Cause**: Incorrect URL or routing issue.

**Solution**:
1. Check URL matches page file name
   - `Pages/Index.cshtml` → `/` or `/Index`
   - `Pages/Events.cshtml` → `/Events`

2. Verify `@page` directive in `.cshtml` file:
   ```cshtml
   @page
   ```

3. Check for custom route template:
   ```cshtml
   @page "/custom-route"
   ```

## Build Errors

### NuGet Package Errors

#### Issue: Package Restore Failed

**Symptoms**:
```
error NU1102: Unable to find package 'PackageName'
```

**Solution**:
1. Check internet connection
2. Clear NuGet cache:
   ```bash
   dotnet nuget locals all --clear
   ```
3. Restore again:
   ```bash
   dotnet restore
   ```

#### Issue: Package Version Conflict

**Symptoms**:
```
error NU1107: Version conflict detected
```

**Solution**:
1. Check `.csproj` file for conflicting versions
2. Update to compatible versions:
   ```xml
   <PackageReference Include="PackageName" Version="8.0.0" />
   ```
3. Clean and rebuild:
   ```bash
   dotnet clean
   dotnet build
   ```

### Compilation Errors

#### Issue: `The type or namespace name could not be found`

**Cause**: Missing using directive or assembly reference.

**Solution**:
1. Add missing using statement:
   ```csharp
   using Microsoft.AspNetCore.Mvc.RazorPages;
   ```

2. Verify package is installed:
   ```bash
   dotnet list package
   ```

3. Restore packages if needed:
   ```bash
   dotnet restore
   ```

#### Issue: Razor Syntax Errors

**Symptoms**:
```
error CS1525: Invalid expression term '>'
```

**Solution**:
1. Check for missing `@` symbol:
   ```cshtml
   @* Correct *@
   @Model.Property
   
   @* Incorrect *@
   Model.Property
   ```

2. Verify code block syntax:
   ```cshtml
   @{
       var x = 5;  // Correct
   }
   ```

## Runtime Errors

### 500 Internal Server Error

#### Issue: Page Throws Exception

**Solution**:
1. Enable detailed errors in development:
   ```bash
   # Set environment variable
   export ASPNETCORE_ENVIRONMENT=Development
   ```

2. Check browser console for errors (F12)

3. Check application logs:
   ```bash
   # View console output
   # Look for exception stack traces
   ```

4. Common causes:
   - Null reference exception
   - File not found (images, etc.)
   - Markdown file missing

#### Issue: Markdown File Not Found

**Symptoms**:
```
FileNotFoundException: Could not find file 'wwwroot/descriptions/member.md'
```

**Solution**:
1. Verify file exists in `wwwroot/descriptions/`
2. Check file name matches exactly (case-sensitive on Linux)
3. Ensure file is included in publish:
   ```xml
   <ItemGroup>
     <Content Include="wwwroot\descriptions\**" />
   </ItemGroup>
   ```

### Model Binding Issues

#### Issue: Model Properties Are Null

**Cause**: Model binding failure.

**Solution**:
1. Verify model directive:
   ```cshtml
   @model KillerCatsFromOuterSpace.Pages.IndexModel
   ```

2. Check property accessibility:
   ```csharp
   public List<Event> Events { get; set; }  // Public
   ```

3. Initialize in OnGet():
   ```csharp
   public void OnGet()
   {
       Events = new List<Event>();
   }
   ```

## Frontend Issues

### JavaScript Errors

#### Issue: `Uncaught ReferenceError: $ is not defined`

**Cause**: jQuery not loaded before script execution.

**Solution**:
1. Ensure jQuery is loaded before custom scripts:
   ```html
   <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
   <script src="~/js/site.js"></script>
   ```

2. Or wrap code in document ready:
   ```javascript
   $(document).ready(function() {
       // Your code
   });
   ```

#### Issue: `Bootstrap is not defined`

**Cause**: Bootstrap JavaScript not loaded.

**Solution**:
1. Add Bootstrap JS:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
   ```

2. Ensure Popper.js is loaded (required by Bootstrap):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
   ```

#### Issue: Modal Won't Open

**Symptoms**: Clicking button doesn't show modal.

**Solution**:
1. Verify Bootstrap is loaded
2. Check modal ID matches button target:
   ```html
   <button data-bs-toggle="modal" data-bs-target="#scheduleModal">Open</button>
   <div class="modal" id="scheduleModal">...</div>
   ```

3. Check for JavaScript errors in console

4. Verify Bootstrap version (5.x uses `data-bs-*`, 4.x uses `data-*`):
   ```html
   <!-- Bootstrap 5 -->
   data-bs-toggle="modal" data-bs-target="#myModal"
   
   <!-- Bootstrap 4 -->
   data-toggle="modal" data-target="#myModal"
   ```

### CSS Issues

#### Issue: Styles Not Applied

**Solution**:
1. Check CSS file is loaded:
   ```html
   <link rel="stylesheet" href="~/css/site.css" />
   ```

2. Clear browser cache (Ctrl+Shift+R)

3. Verify CSS selector specificity

4. Check for conflicting styles

#### Issue: Responsive Layout Broken

**Solution**:
1. Verify viewport meta tag:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. Check Bootstrap grid classes
3. Test in browser DevTools device mode
4. Verify CSS media queries

### Cat Game Issues

#### Issue: Game Won't Start

**Solution**:
1. Check JavaScript console for errors
2. Verify `catGame.js` is loaded:
   ```html
   <script src="~/js/catGame.js"></script>
   ```

3. Ensure `initCatGame()` function exists:
   ```javascript
   window.initCatGame = () => window.CatGame.initGame();
   ```

4. Check button onclick:
   ```html
   <button onclick="initCatGame()">Start Game</button>
   ```

#### Issue: Cat Not Clickable

**Solution**:
1. Verify clickable area is created
2. Check z-index of elements
3. Ensure game is in active state
4. Check event listeners are attached

### Audio Player Issues

#### Issue: Audio Won't Play

**Solution**:
1. Check browser console for errors
2. Verify audio file exists:
   ```
   wwwroot/audio/hard-rock-audio.mp3
   ```

3. Check audio element:
   ```html
   <audio id="audio-player">
       <source src="~/audio/hard-rock-audio.mp3" type="audio/mpeg">
   </audio>
   ```

4. Try different audio format (MP3, OGG, WAV)

5. Check browser autoplay policy (user interaction may be required)

#### Issue: Volume Control Not Working

**Solution**:
1. Verify `setVolume()` function exists
2. Check function is called correctly:
   ```javascript
   function setVolume(volume) {
       audio.volume = volume;  // volume should be 0.0 to 1.0
   }
   ```

3. Ensure audio element reference is correct

## Deployment Issues

### IIS Issues

#### Issue: 502.5 Process Failure

**Cause**: ASP.NET Core Runtime not installed or wrong version.

**Solution**:
1. Install .NET 8.0 Hosting Bundle
2. Restart IIS:
   ```powershell
   iisreset
   ```

3. Check Application Pool settings:
   - .NET CLR Version: `No Managed Code`
   - Managed Pipeline Mode: `Integrated`

#### Issue: 403 Forbidden

**Cause**: Permission issue.

**Solution**:
```powershell
icacls "C:\path\to\app" /grant "IIS APPPOOL\AppPoolName:(OI)(CI)RX"
```

### Linux/Nginx Issues

#### Issue: 502 Bad Gateway

**Cause**: Application not running or Nginx can't connect.

**Solution**:
1. Check if application is running:
   ```bash
   sudo systemctl status killercats
   ```

2. Start if stopped:
   ```bash
   sudo systemctl start killercats
   ```

3. Check application is listening:
   ```bash
   netstat -tlnp | grep 8080
   ```

4. Verify Nginx configuration:
   ```bash
   sudo nginx -t
   ```

#### Issue: Static Files Not Loading

**Cause**: Nginx not configured to serve static files or permissions.

**Solution**:
1. Check file permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/killercats
   ```

2. Verify static files are published:
   ```bash
   ls /var/www/killercats/wwwroot/
   ```

### Azure Issues

#### Issue: Application Error on Azure

**Solution**:
1. Enable logging in Azure Portal:
   - Go to App Service
   - **Monitoring** → **App Service logs**
   - Enable **Application Logging**

2. View logs:
   ```bash
   az webapp log tail --name app-name --resource-group rg-name
   ```

3. Check configuration:
   - Verify .NET version matches
   - Check application settings

### Docker Issues

#### Issue: Container Won't Start

**Solution**:
1. Check container logs:
   ```bash
   docker logs killercats
   ```

2. Verify image built successfully:
   ```bash
   docker images | grep killercats
   ```

3. Check port mapping:
   ```bash
   docker ps -a
   ```

4. Rebuild image:
   ```bash
   docker build -t killercats-website . --no-cache
   ```

## Development Environment

### Visual Studio Issues

#### Issue: Solution Won't Load

**Solution**:
1. Close Visual Studio
2. Delete `.vs` folder
3. Reopen solution

#### Issue: IntelliSense Not Working

**Solution**:
1. **Tools** → **Options** → **Text Editor** → **C#** → **IntelliSense**
2. Clear cache: Delete `%LOCALAPPDATA%\Microsoft\VisualStudio\`
3. Restart Visual Studio

### VS Code Issues

#### Issue: C# Extension Not Working

**Solution**:
1. Install C# extension from marketplace
2. Install .NET SDK
3. Reload VS Code
4. Open Command Palette (Ctrl+Shift+P) → "OmniSharp: Restart OmniSharp"

#### Issue: Debug Not Working

**Solution**:
1. Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": ".NET Core Launch (web)",
         "type": "coreclr",
         "request": "launch",
         "preLaunchTask": "build",
         "program": "${workspaceFolder}/KillerCatsFromOuterSpace/bin/Debug/net8.0/KillerCatsFromOuterSpace.dll",
         "cwd": "${workspaceFolder}/KillerCatsFromOuterSpace",
         "env": {
           "ASPNETCORE_ENVIRONMENT": "Development"
         }
       }
     ]
   }
   ```

## Performance Issues

### Slow Page Load

**Solution**:
1. Enable response caching
2. Optimize images (compress, resize)
3. Use CDN for libraries
4. Minimize CSS/JavaScript
5. Enable compression:
   ```csharp
   services.AddResponseCompression();
   ```

### High Memory Usage

**Solution**:
1. Check for memory leaks
2. Dispose resources properly
3. Use `using` statements:
   ```csharp
   using (var stream = File.OpenRead(path))
   {
       // Use stream
   }
   ```

### Slow Build Times

**Solution**:
1. Clean solution:
   ```bash
   dotnet clean
   ```

2. Exclude unnecessary files in `.csproj`:
   ```xml
   <ItemGroup>
     <Compile Remove="excluded\**" />
   </ItemGroup>
   ```

3. Use incremental builds

## Browser Compatibility

### Issues in Specific Browsers

#### Safari

**Issue**: Modal backdrop stays after closing

**Solution**:
```javascript
$('#modal').on('hidden.bs.modal', function () {
    $('.modal-backdrop').remove();
});
```

#### Internet Explorer 11

**Note**: IE11 is no longer supported. Consider using modern browsers.

**Alternative**: Add polyfills for ES6 features if IE11 support is required.

#### Mobile Safari

**Issue**: Audio autoplay blocked

**Solution**: Require user interaction before playing audio:
```javascript
document.addEventListener('click', function() {
    audio.play();
}, { once: true });
```

### Cross-Browser Testing

**Recommended Tools**:
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- BrowserStack (for testing multiple browsers)

## Getting Help

### Before Asking for Help

1. **Check this guide** for similar issues
2. **Search existing issues** on GitHub
3. **Check console logs** (browser and application)
4. **Try in incognito/private mode** (rules out extensions)
5. **Clear browser cache**

### How to Report Issues

When reporting an issue, include:

1. **Environment Information**:
   - OS (Windows, Mac, Linux)
   - .NET version (`dotnet --version`)
   - Browser and version
   - IDE (Visual Studio, VS Code)

2. **Steps to Reproduce**:
   - What you did
   - What you expected
   - What actually happened

3. **Error Messages**:
   - Full error text
   - Stack traces
   - Console errors

4. **Code Context**:
   - Relevant code snippets
   - Configuration files

### Resources

- **GitHub Issues**: [Report bugs](https://github.com/tsviz/killercats_website/issues)
- **Documentation**: [docs folder](../docs)
- **ASP.NET Core Docs**: [docs.microsoft.com/aspnet/core](https://docs.microsoft.com/aspnet/core)
- **Stack Overflow**: Tag questions with `asp.net-core`

### Contact

- **Email**: kk1llercatsfromouterspace@gmail.com
- **GitHub**: Open an issue with detailed information

## Quick Reference

### Useful Commands

```bash
# Build
dotnet build

# Run
dotnet run

# Clean
dotnet clean

# Restore packages
dotnet restore

# Publish
dotnet publish -c Release

# Watch (auto-reload)
dotnet watch run

# Check .NET version
dotnet --version

# List packages
dotnet list package
```

### Log Locations

**Development**:
- Console output
- Browser console (F12)

**Production**:
- Azure: App Service logs
- Linux: `/var/log/` or `journalctl`
- Windows: Event Viewer or log files
- Docker: `docker logs <container>`

### Configuration Precedence

1. Command line arguments
2. Environment variables
3. `appsettings.{Environment}.json`
4. `appsettings.json`
5. Default values

## Additional Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Reference](./API_REFERENCE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
