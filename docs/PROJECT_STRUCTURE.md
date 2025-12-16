# Project Structure

## Table of Contents
- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Root Directory](#root-directory)
- [Application Directory](#application-directory)
- [Pages Directory](#pages-directory)
- [Models Directory](#models-directory)
- [Services Directory](#services-directory)
- [wwwroot Directory](#wwwroot-directory)
- [Properties Directory](#properties-directory)
- [Documentation Directory](#documentation-directory)
- [File Naming Conventions](#file-naming-conventions)

## Overview

This document provides a comprehensive guide to the project's file and folder structure. Understanding this structure is essential for navigating the codebase and contributing to the project.

## Directory Tree

```
killercats_website/
├── .git/                           # Git repository data
├── .github/                        # GitHub specific files
│   └── workflows/                  # GitHub Actions workflows
├── KillerCatsFromOuterSpace/       # Main application directory
│   ├── Models/                     # Data models
│   │   └── Event.cs               # Event model
│   ├── Pages/                      # Razor Pages
│   │   ├── Shared/                # Shared components
│   │   │   ├── _Layout.cshtml     # Main layout template
│   │   │   └── _EventList.cshtml  # Event list partial
│   │   ├── Events.cshtml          # Events page view
│   │   ├── Events.cshtml.cs       # Events page model
│   │   ├── Index.cshtml           # Home page view
│   │   ├── Index.cshtml.cs        # Home page model
│   │   └── _viewStart.cshtml      # View initialization
│   ├── Properties/                 # Project properties
│   │   └── launchSettings.json    # Launch configuration
│   ├── Services/                   # Application services
│   │   └── IEmailService.cs       # Email service interface
│   ├── wwwroot/                    # Static files
│   │   ├── audio/                 # Audio files
│   │   │   └── hard-rock-audio.mp3
│   │   ├── css/                   # Stylesheets
│   │   │   └── site.css           # Main stylesheet
│   │   ├── descriptions/          # Band member bios (Markdown)
│   │   │   ├── jay.md
│   │   │   ├── ky.md
│   │   │   ├── ren.md
│   │   │   └── xavi.md
│   │   ├── images/                # Image assets
│   │   │   ├── band-members/      # Member photos
│   │   │   │   └── artist_placeholder.png
│   │   │   ├── animated-cat.gif
│   │   │   ├── band-playing.jpeg
│   │   │   ├── guitar.png
│   │   │   ├── killer-cats-logo.svg
│   │   │   ├── killer-cats-main-logo.jpeg
│   │   │   └── lightning-image.jpg
│   │   ├── js/                    # JavaScript files
│   │   │   ├── catGame.js         # Cat game logic
│   │   │   ├── newsletter.js      # Newsletter functionality
│   │   │   ├── scripts.js         # Helper scripts
│   │   │   └── site.js            # Main JavaScript
│   │   └── sounds/                # Sound effects
│   │       └── cat-meow.mp3
│   ├── appsettings.json           # Application configuration
│   ├── KillerCatsFromOuterSpace.csproj  # Project file
│   ├── Program.cs                  # Application entry point
│   ├── README.md                   # Application-specific README
│   └── Startup.cs                  # Service configuration
├── docs/                           # Documentation
│   ├── API_REFERENCE.md           # API and component reference
│   ├── ARCHITECTURE.md            # Architecture overview
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── DEVELOPMENT.md             # Development guide
│   ├── PROJECT_STRUCTURE.md       # This file
│   └── TROUBLESHOOTING.md         # Troubleshooting guide
├── .gitignore                      # Git ignore rules
├── CONTRIBUTING.md                 # Contribution guidelines
├── README.md                       # Project README
└── killercats_website.sln         # Visual Studio solution file
```

## Root Directory

### Configuration Files

#### `.gitignore`
**Purpose**: Specifies files and directories that Git should ignore.

**Key Exclusions**:
- `bin/`, `obj/` - Build output
- `.vs/`, `.vscode/` - IDE folders
- `*.user` - User-specific files
- `logs/` - Log files

#### `killercats_website.sln`
**Purpose**: Visual Studio solution file that groups related projects.

**Contains**:
- Reference to `KillerCatsFromOuterSpace.csproj`
- Build configurations (Debug, Release)
- Project dependencies

### Documentation Files

#### `README.md`
**Purpose**: Main project documentation and entry point.

**Contains**:
- Project overview
- Quick start guide
- Technology stack
- Links to detailed documentation

#### `CONTRIBUTING.md`
**Purpose**: Guidelines for contributing to the project.

**Contains**:
- Code of conduct
- Contribution workflow
- Coding standards
- Issue reporting

## Application Directory

### KillerCatsFromOuterSpace/

Main application directory containing all source code and assets.

#### Core Files

##### `Program.cs`
**Purpose**: Application entry point.

**Responsibilities**:
- Configures web host
- Sets up dependency injection
- Defines startup configuration
- Specifies port binding (8080)

**Key Code**:
```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
            webBuilder.UseUrls("http://*:8080");
        });
```

##### `Startup.cs`
**Purpose**: Configures services and middleware pipeline.

**Responsibilities**:
- Register services (Razor Pages, DI)
- Configure middleware (static files, routing, HTTPS)
- Set up error handling
- Configure authorization

**Key Methods**:
- `ConfigureServices()`: Register services
- `Configure()`: Set up middleware pipeline

##### `appsettings.json`
**Purpose**: Application configuration.

**Structure**:
```json
{
  "Logging": { /* logging config */ },
  "AllowedHosts": "*"
}
```

**Environment-Specific**:
- `appsettings.Development.json` (if exists)
- `appsettings.Production.json` (if exists)

##### `KillerCatsFromOuterSpace.csproj`
**Purpose**: Project file defining dependencies and build settings.

**Key Sections**:
- `TargetFramework`: .NET 8.0
- `PackageReference`: NuGet dependencies
- Build configurations

## Pages Directory

### Structure

```
Pages/
├── Shared/              # Shared layouts and partials
├── Index.cshtml         # Home page view
├── Index.cshtml.cs      # Home page logic
├── Events.cshtml        # Events page view
├── Events.cshtml.cs     # Events page logic
└── _viewStart.cshtml    # View initialization
```

### File Types

#### `.cshtml` Files (Views)
**Purpose**: Razor view templates containing HTML and C# code.

**Features**:
- Server-side rendering
- C# code blocks with `@{ }`
- Model binding with `@model`
- HTML helpers and tag helpers

**Example Structure**:
```cshtml
@page
@model PageModel
@{
    ViewData["Title"] = "Page Title";
}
<h1>@Model.Property</h1>
```

#### `.cshtml.cs` Files (Page Models)
**Purpose**: Code-behind files with page logic.

**Features**:
- Handle HTTP requests (GET, POST)
- Data preparation
- Business logic
- Properties for view binding

**Example Structure**:
```csharp
public class PageModel : PageModel
{
    public string Property { get; set; }
    
    public void OnGet()
    {
        // Handle GET request
    }
}
```

### Key Pages

#### Index (Home Page)

**Files**:
- `Index.cshtml`: View template
- `Index.cshtml.cs`: Page logic

**Responsibilities**:
- Display band information
- Show upcoming events preview (top 2)
- Display band member profiles with expandable bios
- Hero section with animations

**Key Features**:
- Markdown bio rendering
- Event integration
- Interactive member cards
- Dynamic content loading

#### Events Page

**Files**:
- `Events.cshtml`: View template
- `Events.cshtml.cs`: Page logic

**Responsibilities**:
- List all upcoming events
- Display event scheduling modal
- Map integration for locations
- Navigation to home

**Key Features**:
- Complete event calendar
- Location links to maps
- Event scheduling form
- Responsive layout

### Shared Directory

#### `_Layout.cshtml`
**Purpose**: Main layout template for all pages.

**Contains**:
- Navigation header
- Secondary navigation bar
- Floating schedule button
- Modals (schedule, newsletter)
- Fixed audio player
- Footer
- Script references

**Usage**:
```cshtml
@{
    Layout = "_Layout";
}
```

#### `_EventList.cshtml`
**Purpose**: Reusable partial view for displaying events.

**Model**: `IEnumerable<Event>`

**Features**:
- Event cards
- Location links
- Date formatting
- Responsive grid

**Usage**:
```cshtml
@await Html.PartialAsync("_EventList", Model.Events)
```

#### `_viewStart.cshtml`
**Purpose**: Sets default layout for all pages.

**Content**:
```cshtml
@{
    Layout = "_Layout";
}
```

## Models Directory

### Structure

```
Models/
└── Event.cs
```

### Event.cs

**Purpose**: Represents a band event.

**Properties**:
- `Id`: Unique identifier
- `Date`: Event date/time
- `Location`: Venue name
- `Description`: Event details

**Usage**: Data model for event storage and display.

### Future Models

Potential additions:
- `BandMember.cs`: Extract from inline class
- `Merchandise.cs`: For shop functionality
- `Message.cs`: For contact forms
- `Subscriber.cs`: For newsletter

## Services Directory

### Structure

```
Services/
└── IEmailService.cs
```

### IEmailService.cs

**Purpose**: Interface for email functionality.

**Method**:
```csharp
Task SendNewsletterSubmissionAsync(string email);
```

**Status**: Interface defined, implementation pending.

**Future Implementation**:
- SendGrid integration
- SMTP configuration
- Email templates
- Error handling

### Future Services

Potential additions:
- `EventService.cs`: Event management
- `MerchandiseService.cs`: Shop functionality
- `NewsletterService.cs`: Subscription management
- `ContactService.cs`: Contact form handling

## wwwroot Directory

### Overview

Static files directory - all files here are served directly to browsers.

### Structure

```
wwwroot/
├── audio/           # Audio files
├── css/             # Stylesheets
├── descriptions/    # Markdown biographies
├── images/          # Image assets
├── js/              # JavaScript files
└── sounds/          # Sound effects
```

### css/

#### `site.css`
**Purpose**: Main stylesheet for the application.

**Size**: ~1000+ lines

**Key Sections**:
- Layout styles
- Component styles (cards, modals, etc.)
- Navigation styles
- Game styles
- Audio player styles
- Responsive breakpoints
- Animations and transitions

**Organization**:
- Global styles
- Component-specific styles
- Utility classes
- Media queries

### js/

#### `site.js`
**Purpose**: Main JavaScript file for site functionality.

**Features**:
- Bio button toggle
- App initialization
- Scroll to header
- Event listener setup

**Size**: ~90 lines

#### `scripts.js`
**Purpose**: Helper scripts and utilities.

**Features**:
- Map opening (Google/Apple Maps)
- Event scheduling
- Newsletter subscription
- Audio player controls
- Form validation

**Size**: ~330 lines

#### `catGame.js`
**Purpose**: Interactive cat-catching game.

**Features**:
- Game state management
- Score tracking
- Position updates
- Timer management
- Speed scaling

**Size**: ~210 lines

#### `newsletter.js`
**Purpose**: Newsletter subscription functionality.

**Features**:
- Form submission
- Email validation
- Modal management
- Async form handling

**Size**: ~60 lines

### images/

#### Structure

```
images/
├── band-members/
│   └── artist_placeholder.png    # 400x400px placeholder
├── animated-cat.gif              # Animated cat for game
├── band-playing.jpeg             # Band photo
├── guitar.png                    # Spinning guitar decoration
├── killer-cats-logo.svg          # Band logo (vector)
├── killer-cats-main-logo.jpeg    # Main logo (overlay)
└── lightning-image.jpg           # Background decoration
```

#### Naming Conventions

- Lowercase with hyphens: `killer-cats-logo.svg`
- Descriptive names: `animated-cat.gif`
- Organized by category: `band-members/`

#### Formats

- **SVG**: Vector graphics (logo)
- **PNG**: Transparent images (decorations)
- **JPEG**: Photos (band pictures)
- **GIF**: Animations (cat game)

### audio/

#### `hard-rock-audio.mp3`
**Purpose**: Background music for the site.

**Format**: MP3

**Usage**: Played via custom audio player.

**Controls**: Play/pause, volume slider.

### sounds/

#### `cat-meow.mp3`
**Purpose**: Sound effect for cat animations.

**Format**: MP3

**Usage**: Triggered during cat animation sequence.

### descriptions/

#### Markdown Biography Files

**Files**:
- `ky.md`: Ky's biography
- `jay.md`: Jay's biography  
- `xavi.md`: Xavi's biography
- `ren.md`: Ren's biography

**Format**: Markdown

**Processing**: Converted to HTML using Markdig library.

**Structure**:
```markdown
# Member Name's Bio

## Early Life
Content...

## Musical Journey
Content...

## Influences
Content...
```

## Properties Directory

### launchSettings.json

**Purpose**: Development launch configuration.

**Contains**:
- Development server settings
- Environment variables
- Browser launch options
- Port configurations

**Example**:
```json
{
  "profiles": {
    "KillerCatsFromOuterSpace": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:8080",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

## Documentation Directory

### docs/

Complete documentation for the project.

**Files**:
1. `API_REFERENCE.md`: Component and API documentation
2. `ARCHITECTURE.md`: System architecture overview
3. `DEPLOYMENT.md`: Deployment instructions
4. `DEVELOPMENT.md`: Development guide
5. `PROJECT_STRUCTURE.md`: This file
6. `TROUBLESHOOTING.md`: Common issues and solutions

**Organization**:
- Markdown format
- Table of contents
- Code examples
- Cross-references

## File Naming Conventions

### General Rules

1. **PascalCase**: C# files and classes
   - `EventsModel.cs`
   - `IndexModel.cs`

2. **lowercase-with-hyphens**: Static files
   - `site.css`
   - `killer-cats-logo.svg`
   - `hard-rock-audio.mp3`

3. **camelCase**: JavaScript files
   - `catGame.js`
   - `newsletter.js`

4. **UPPERCASE**: Documentation
   - `README.md`
   - `CONTRIBUTING.md`

### Razor Pages

- View: `PageName.cshtml`
- Model: `PageName.cshtml.cs`
- Shared/Partial: `_ComponentName.cshtml`

### Configuration

- `appsettings.json`
- `appsettings.{Environment}.json`
- `launchSettings.json`

## Size Reference

### Approximate Line Counts

| File | Lines | Purpose |
|------|-------|---------|
| `site.css` | ~1000+ | Main stylesheet |
| `scripts.js` | ~330 | Helper scripts |
| `catGame.js` | ~210 | Game logic |
| `Index.cshtml` | ~92 | Home page view |
| `_Layout.cshtml` | ~293 | Main layout |
| `site.js` | ~89 | Main JS |

### Approximate File Sizes

| Directory | Files | Purpose |
|-----------|-------|---------|
| `wwwroot/` | ~20+ | Static assets |
| `Pages/` | ~7 | Razor pages |
| `Models/` | 1 | Data models |
| `Services/` | 1 | Service interfaces |
| `docs/` | 6 | Documentation |

## Build Output

### Not in Source Control

These directories are created during build:

```
bin/            # Compiled binaries
obj/            # Intermediate build files
publish/        # Published output
```

**Note**: Excluded via `.gitignore`.

## Version Control

### Tracked Files

- Source code (`.cs`, `.cshtml`)
- Static assets (images, CSS, JS)
- Configuration (`.json`, `.csproj`)
- Documentation (`.md`)

### Ignored Files

- Build output (`bin/`, `obj/`)
- IDE files (`.vs/`, `.vscode/`, `*.user`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Logs and temporary files

## Related Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
- [API Reference](./API_REFERENCE.md)
- [Deployment Guide](./DEPLOYMENT.md)
