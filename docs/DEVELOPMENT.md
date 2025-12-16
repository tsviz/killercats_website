# Development Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Working with Pages](#working-with-pages)
- [Working with Models](#working-with-models)
- [Working with Services](#working-with-services)
- [Frontend Development](#frontend-development)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Best Practices](#best-practices)

## Prerequisites

### Required Software

1. **.NET 8.0 SDK or later**
   - Download from [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
   - Verify installation: `dotnet --version`

2. **Code Editor** (choose one)
   - [Visual Studio 2022](https://visualstudio.microsoft.com/) (Community, Professional, or Enterprise)
   - [Visual Studio Code](https://code.visualstudio.com/) with C# extension
   - [JetBrains Rider](https://www.jetbrains.com/rider/)

3. **Git**
   - Download from [https://git-scm.com/](https://git-scm.com/)
   - Verify installation: `git --version`

### Optional Tools

- **SQL Server Express**: For database development (future)
- **Postman**: For API testing
- **Browser DevTools**: Chrome/Firefox developer tools

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tsviz/killercats_website.git
cd killercats_website
```

### 2. Open the Project

#### Using Visual Studio
1. Open `killercats_website.sln`
2. Wait for NuGet packages to restore
3. Press F5 to run

#### Using VS Code
1. Open the folder in VS Code
2. Accept the prompt to add required assets
3. Press F5 to run or use terminal:
   ```bash
   cd KillerCatsFromOuterSpace
   dotnet run
   ```

#### Using Command Line
```bash
cd KillerCatsFromOuterSpace
dotnet restore
dotnet run
```

### 3. Verify Installation

Open your browser and navigate to:
- Default: `http://localhost:8080`
- Or check the console output for the actual URL

You should see the Killer Cats home page.

## Development Workflow

### Basic Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Edit code
   - Test locally
   - Commit frequently

3. **Test your changes**
   ```bash
   dotnet build
   dotnet run
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**
   - Go to GitHub
   - Create PR from your branch to main
   - Request review

### Hot Reload Development

Use `dotnet watch` for automatic reloading:

```bash
cd KillerCatsFromOuterSpace
dotnet watch run
```

Changes to `.cs` and `.cshtml` files will trigger automatic recompilation and browser refresh.

## Project Structure

```
KillerCatsFromOuterSpace/
├── Pages/                      # Razor Pages
│   ├── Index.cshtml           # Home page view
│   ├── Index.cshtml.cs        # Home page model
│   ├── Events.cshtml          # Events page view
│   ├── Events.cshtml.cs       # Events page model
│   ├── _viewStart.cshtml      # View initialization
│   └── Shared/                # Shared components
│       ├── _Layout.cshtml     # Main layout template
│       └── _EventList.cshtml  # Event list partial
├── Models/                     # Data models
│   └── Event.cs               # Event entity
├── Services/                   # Application services
│   └── IEmailService.cs       # Email service interface
├── wwwroot/                    # Static files
│   ├── css/                   # Stylesheets
│   │   └── site.css           # Main stylesheet
│   ├── js/                    # JavaScript files
│   │   ├── site.js            # Main JS file
│   │   ├── scripts.js         # Helper scripts
│   │   ├── catGame.js         # Cat game logic
│   │   └── newsletter.js      # Newsletter logic
│   ├── images/                # Image assets
│   ├── audio/                 # Audio files
│   ├── sounds/                # Sound effects
│   └── descriptions/          # Band member bios (Markdown)
├── Properties/                 # Project properties
│   └── launchSettings.json    # Launch configuration
├── Program.cs                  # Application entry point
├── Startup.cs                  # Service configuration
├── appsettings.json           # Application settings
└── KillerCatsFromOuterSpace.csproj  # Project file
```

## Working with Pages

### Creating a New Page

1. **Create the view file** (e.g., `NewPage.cshtml`)
   ```cshtml
   @page
   @model KillerCatsFromOuterSpace.Pages.NewPageModel
   @{
       ViewData["Title"] = "New Page";
       Layout = "_Layout";
   }

   <h1>@Model.Title</h1>
   <p>@Model.Description</p>
   ```

2. **Create the page model** (e.g., `NewPage.cshtml.cs`)
   ```csharp
   using Microsoft.AspNetCore.Mvc.RazorPages;

   namespace KillerCatsFromOuterSpace.Pages
   {
       public class NewPageModel : PageModel
       {
           public string Title { get; set; }
           public string Description { get; set; }

           public void OnGet()
           {
               Title = "Welcome";
               Description = "This is a new page";
           }
       }
   }
   ```

3. **Access the page**
   - URL will be: `/NewPage`
   - Razor Pages uses convention-based routing

### Page Model Handlers

```csharp
public class MyPageModel : PageModel
{
    // Handle GET requests
    public void OnGet()
    {
        // Initialize page
    }

    // Handle POST requests
    public IActionResult OnPost()
    {
        // Process form submission
        return RedirectToPage("Index");
    }

    // Named handlers
    public IActionResult OnPostDelete()
    {
        // Handle delete action
        return RedirectToPage();
    }
}
```

### Passing Data to Views

```csharp
// In page model
public List<Event> Events { get; set; }

public void OnGet()
{
    Events = GetEvents();
}
```

```cshtml
@* In view *@
@foreach (var evt in Model.Events)
{
    <div>@evt.Location</div>
}
```

## Working with Models

### Creating a Model

1. **Create a class in the Models folder**
   ```csharp
   namespace KillerCatsFromOuterSpace.Models
   {
       public class Merchandise
       {
           public int Id { get; set; }
           public string Name { get; set; }
           public decimal Price { get; set; }
           public string ImageUrl { get; set; }
       }
   }
   ```

2. **Use in page models**
   ```csharp
   public class ShopModel : PageModel
   {
       public List<Merchandise> Products { get; set; }

       public void OnGet()
       {
           Products = GetProducts();
       }
   }
   ```

### Model Validation

Add data annotations for validation:

```csharp
using System.ComponentModel.DataAnnotations;

public class ContactForm
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [StringLength(500)]
    public string Message { get; set; }
}
```

## Working with Services

### Creating a Service

1. **Define an interface**
   ```csharp
   namespace KillerCatsFromOuterSpace.Services
   {
       public interface IMerchandiseService
       {
           Task<List<Merchandise>> GetProductsAsync();
           Task<Merchandise> GetProductByIdAsync(int id);
       }
   }
   ```

2. **Implement the interface**
   ```csharp
   public class MerchandiseService : IMerchandiseService
   {
       public async Task<List<Merchandise>> GetProductsAsync()
       {
           // Implementation
           return new List<Merchandise>();
       }

       public async Task<Merchandise> GetProductByIdAsync(int id)
       {
           // Implementation
           return null;
       }
   }
   ```

3. **Register in Startup.cs**
   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
       services.AddRazorPages();
       services.AddScoped<IMerchandiseService, MerchandiseService>();
   }
   ```

4. **Inject into page model**
   ```csharp
   public class ShopModel : PageModel
   {
       private readonly IMerchandiseService _merchandiseService;

       public ShopModel(IMerchandiseService merchandiseService)
       {
           _merchandiseService = merchandiseService;
       }

       public async Task OnGetAsync()
       {
           Products = await _merchandiseService.GetProductsAsync();
       }
   }
   ```

## Frontend Development

### CSS Development

Edit `wwwroot/css/site.css`:

```css
/* Custom styles */
.custom-class {
    color: #333;
    padding: 10px;
}
```

**Tips:**
- Use Bootstrap utilities when possible
- Follow existing naming conventions
- Keep styles organized by component

### JavaScript Development

#### Adding New JavaScript Features

1. **Create a new JS file** in `wwwroot/js/`
   ```javascript
   // myfeature.js
   (function() {
       'use strict';
       
       function initializeFeature() {
           console.log('Feature initialized');
       }
       
       document.addEventListener('DOMContentLoaded', initializeFeature);
   })();
   ```

2. **Reference in layout or page**
   ```html
   <script src="~/js/myfeature.js"></script>
   ```

#### Working with Existing Scripts

**Cat Game** (`catGame.js`):
- Namespace: `window.CatGame`
- Entry point: `initCatGame()`
- State management in `CatGame.state`

**Audio Player** (`site.js`, `scripts.js`):
- Functions: `togglePlay()`, `setVolume()`
- Global audio player reference

**Event Scheduler** (`scripts.js`):
- Form handling
- Mailto link generation
- Modal management

### Adding Static Assets

1. **Images**: Place in `wwwroot/images/`
2. **Audio**: Place in `wwwroot/audio/` or `wwwroot/sounds/`
3. **Reference in views**:
   ```html
   <img src="~/images/myimage.png" alt="Description">
   <audio src="~/audio/myaudio.mp3"></audio>
   ```

## Testing

### Manual Testing

1. **Run the application**
   ```bash
   dotnet run
   ```

2. **Test in multiple browsers**
   - Chrome
   - Firefox
   - Edge
   - Safari (if on Mac)

3. **Test responsive design**
   - Use browser DevTools
   - Test different viewport sizes
   - Check mobile behavior

### Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Modals open and close
- [ ] Cat game functions
- [ ] Audio player works
- [ ] Responsive on mobile
- [ ] No console errors

## Debugging

### Visual Studio Debugging

1. Set breakpoints by clicking left margin
2. Press F5 to start debugging
3. Use debugging windows:
   - Locals
   - Watch
   - Call Stack
   - Immediate Window

### VS Code Debugging

1. Set breakpoints
2. Press F5 or use Debug panel
3. Use Debug Console for evaluation

### Browser Debugging

1. Open browser DevTools (F12)
2. **Console**: View JavaScript errors and logs
3. **Network**: Monitor HTTP requests
4. **Elements**: Inspect HTML/CSS
5. **Sources**: Debug JavaScript

### Common Debugging Scenarios

#### Page Not Loading
```bash
# Check build errors
dotnet build

# Check runtime errors
dotnet run --verbose
```

#### JavaScript Errors
- Open browser console (F12)
- Check for script loading errors
- Verify function names and scope

#### Styling Issues
- Use browser DevTools Elements tab
- Check computed styles
- Verify CSS is loading

## Common Tasks

### Adding a New Event

Edit `Pages/Events.cshtml.cs`:

```csharp
public void OnGet()
{
    var events = new List<Event>();
    
    // Add new event
    AddEvent(events, 18, new DateTime(2025, 9, 15), 
             "New Venue", "Special concert");
    
    UpcomingEvents = events;
}
```

### Adding a Band Member

Edit `Pages/Index.cshtml.cs`:

```csharp
BandMembers = new List<BandMember>
{
    new BandMember { 
        Name = "New Member", 
        Instrument = "Keyboard 🎹", 
        Description = "Amazing keyboardist", 
        Bio = ReadDescription("newmember.md"), 
        ProfilePictureUrl = "/images/band-members/newmember.png" 
    }
};
```

Create `wwwroot/descriptions/newmember.md`:

```markdown
# New Member's Bio

This is the full biography in Markdown format.

## Early Life
- Born in...
- Started music at...

## Career
- Joined the band in...
```

### Updating Styles

Edit `wwwroot/css/site.css`:

```css
/* Add your custom styles */
.new-feature {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
}
```

### Adding Dependencies

1. **Add NuGet package**
   ```bash
   dotnet add package PackageName
   ```

2. **Register service if needed**
   ```csharp
   // In Startup.cs
   services.AddScoped<IService, ServiceImplementation>();
   ```

## Best Practices

### C# Coding Standards

1. **Naming Conventions**
   - PascalCase for classes, methods, properties
   - camelCase for local variables, parameters
   - Prefix interfaces with `I`

2. **Code Organization**
   - One class per file
   - Group related functionality
   - Use namespaces properly

3. **Comments**
   - Use XML documentation for public APIs
   - Comment complex logic
   - Keep comments up to date

### Frontend Best Practices

1. **JavaScript**
   - Use strict mode
   - Avoid global variables
   - Handle errors gracefully
   - Use meaningful names

2. **CSS**
   - Use existing Bootstrap classes
   - Keep specificity low
   - Mobile-first approach
   - Organize by component

3. **HTML/Razor**
   - Semantic HTML
   - Proper accessibility attributes
   - Consistent indentation
   - Separate concerns

### Git Best Practices

1. **Commits**
   - Small, focused commits
   - Clear commit messages
   - Commit working code

2. **Branches**
   - Create feature branches
   - Keep branches up to date
   - Delete merged branches

3. **Pull Requests**
   - Descriptive PR titles
   - Explain changes
   - Request appropriate reviewers

### Performance Tips

1. **Backend**
   - Minimize database queries (when DB is added)
   - Use async/await properly
   - Cache expensive operations

2. **Frontend**
   - Minimize DOM manipulation
   - Debounce event handlers
   - Lazy load images

3. **General**
   - Profile before optimizing
   - Test with realistic data
   - Monitor bundle sizes

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed file organization
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- See [API_REFERENCE.md](./API_REFERENCE.md) for component documentation

## Getting Help

- **GitHub Issues**: [Report bugs or ask questions](https://github.com/tsviz/killercats_website/issues)
- **Pull Requests**: Review existing PRs for examples
- **CONTRIBUTING.md**: Read contribution guidelines
