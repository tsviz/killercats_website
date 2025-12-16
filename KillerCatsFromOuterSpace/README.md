# Killer Cats from Outer Space - Application

This is the main application directory for the Killer Cats from Outer Space website - an ASP.NET Core 8.0 Razor Pages web application.

## 🎸 Overview

A modern, interactive band website featuring:
- **Dynamic Event Management**: Display and schedule band events
- **Interactive Features**: Cat game, audio player, newsletter subscription
- **Band Member Profiles**: Expandable biographies with Markdown support
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Rich Media**: Audio playback, animations, and dynamic content

## 🚀 Quick Start

### Prerequisites
- .NET 8.0 SDK or later
- Any code editor (Visual Studio, VS Code, or Rider recommended)

### Run Locally

```bash
# From this directory
dotnet restore
dotnet run

# Navigate to:
# http://localhost:8080
```

### Development Mode with Hot Reload

```bash
dotnet watch run
```

Changes to `.cs` and `.cshtml` files will automatically reload.

## 📁 Project Structure

```
KillerCatsFromOuterSpace/
├── Pages/                      # Razor Pages (Views + Logic)
│   ├── Index.cshtml           # Home page
│   ├── Index.cshtml.cs        # Home page logic
│   ├── Events.cshtml          # Events listing page
│   ├── Events.cshtml.cs       # Events logic
│   └── Shared/                # Shared components
│       ├── _Layout.cshtml     # Main layout template
│       └── _EventList.cshtml  # Event list partial
├── Models/                     # Data models
│   └── Event.cs               # Event entity
├── Services/                   # Application services
│   └── IEmailService.cs       # Email service interface
├── wwwroot/                    # Static files (served to browser)
│   ├── css/site.css           # Main stylesheet
│   ├── js/                    # JavaScript files
│   │   ├── site.js            # Main JS functionality
│   │   ├── scripts.js         # Helper scripts
│   │   ├── catGame.js         # Cat game logic
│   │   └── newsletter.js      # Newsletter functionality
│   ├── images/                # Image assets
│   ├── audio/                 # Audio files
│   ├── sounds/                # Sound effects
│   └── descriptions/          # Band member bios (Markdown)
├── Program.cs                  # Application entry point
├── Startup.cs                  # Service configuration
├── appsettings.json           # Configuration settings
└── KillerCatsFromOuterSpace.csproj  # Project file
```

## 🎯 Key Features

### Pages

#### Home Page (`/`)
- Band showcase with hero section
- Animated guitar decorations
- Band member profiles with expandable biographies
- Upcoming events preview (top 2 events)
- Interactive cat game toggle
- Fixed audio player

#### Events Page (`/Events`)
- Complete event calendar
- Event scheduling modal
- Location links to maps (Google Maps/Apple Maps)
- Navigation back to home

### Interactive Components

#### Cat Game
- **File**: `wwwroot/js/catGame.js`
- **Duration**: 30 seconds
- **Features**: Score tracking, increasing difficulty, inactivity timeout
- **Trigger**: Cat icon button in navigation

#### Audio Player
- **File**: `wwwroot/audio/hard-rock-audio.mp3`
- **Controls**: Play/pause, volume slider
- **Features**: Visual equalizer, persistent across pages

#### Event Scheduler
- **Modal Form**: Date and details input
- **Integration**: Opens email client with pre-filled information
- **Email**: kk1llercatsfromouterspace@gmail.com

#### Newsletter Subscription
- **Modal Form**: Email input
- **Integration**: Opens email client for subscription
- **Feature**: Email validation

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 8.0**: Web framework
- **Razor Pages**: Server-side rendering
- **Markdig 0.40.0**: Markdown to HTML conversion

### Frontend
- **Bootstrap 5.1.3**: UI framework and responsive grid
- **jQuery 3.5.1**: DOM manipulation and event handling
- **Font Awesome 5.15.3**: Icon library
- **Custom JavaScript**: Game logic, audio player, forms

### Development
- **.NET CLI**: Build and development tools
- **Hot Reload**: Automatic refresh during development

## 📝 Configuration

### Application Settings (`appsettings.json`)

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

### Port Configuration

**Default**: Port 8080 (configured in `Program.cs`)

To change:
```csharp
// Program.cs
webBuilder.UseUrls("http://*:5000");  // Use port 5000
```

### Environment Variables

- `ASPNETCORE_ENVIRONMENT`: Set to `Development` or `Production`
- `ASPNETCORE_URLS`: Override default binding URLs

## 🔧 Development

### Building

```bash
# Build the project
dotnet build

# Build for Release
dotnet build --configuration Release
```

### Running

```bash
# Development mode
dotnet run

# Specific environment
dotnet run --environment Production

# Watch mode (auto-reload)
dotnet watch run
```

### Publishing

```bash
# Publish for deployment
dotnet publish --configuration Release --output ./publish
```

## 📄 Key Files Explained

### Program.cs
**Entry point** - Configures and starts the web host
- Sets up dependency injection
- Configures port (8080)
- Specifies Startup class

### Startup.cs
**Service configuration** - Configures services and middleware
- Registers Razor Pages
- Sets up static files
- Configures HTTPS redirection
- Defines routing

### Pages/Index.cshtml.cs
**Home page logic**
- Loads events from EventsModel
- Initializes band member data
- Reads Markdown biographies
- Converts Markdown to HTML using Markdig

### Pages/Events.cshtml.cs
**Events page logic**
- Manages complete event list
- Hardcoded event data (can be replaced with database)

### Models/Event.cs
**Event entity**
- Properties: Id, Date, Location, Description
- Used throughout the application for event display

## 🎨 Styling

### CSS Files
- **site.css**: Main stylesheet (~1000+ lines)
  - Layout styles
  - Component styles (cards, modals, navigation)
  - Game styles
  - Audio player styles
  - Responsive breakpoints
  - Animations and transitions

### Bootstrap Integration
Uses Bootstrap 5.1.3 for:
- Responsive grid system
- Navigation components
- Modal dialogs
- Form controls
- Utility classes

## 🎮 JavaScript Modules

### site.js
- Bio button toggle functionality
- App initialization
- Scroll to header
- Event listener setup

### scripts.js
- Map integration (Google/Apple Maps)
- Event scheduling form handler
- Newsletter subscription
- Audio player controls
- Form validation

### catGame.js
- Game state management
- Score tracking
- Position randomization
- Timer and speed scaling
- Inactivity detection

### newsletter.js
- Form submission handling
- Email validation
- Modal management

## 📧 Email Integration

The application uses **mailto links** for:
- Event scheduling requests
- Newsletter subscriptions

**Target Email**: kk1llercatsfromouterspace@gmail.com

**Future Enhancement**: Consider server-side email service implementation using the `IEmailService` interface.

## 🔍 Debugging

### Visual Studio
1. Set breakpoints in `.cs` files
2. Press F5 to start debugging
3. Use debugging windows (Locals, Watch, Call Stack)

### VS Code
1. Set breakpoints
2. Press F5 or use Debug panel
3. Use Debug Console for evaluation

### Browser DevTools
- **Console**: JavaScript errors and logs
- **Network**: HTTP requests and responses
- **Elements**: Inspect HTML/CSS
- **Sources**: Debug JavaScript

## 🚀 Deployment

### Local Deployment
```bash
dotnet publish -c Release -o ./publish
cd publish
dotnet KillerCatsFromOuterSpace.dll
```

### Production Deployment Options
- **Azure App Service**: Managed hosting
- **IIS (Windows Server)**: Windows infrastructure
- **Linux (Nginx)**: Linux infrastructure
- **Docker**: Containerized deployment

See [Deployment Guide](../docs/DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Events page displays all events
- [ ] Cat game starts and tracks score
- [ ] Audio player plays music
- [ ] Event scheduler modal works
- [ ] Newsletter modal works
- [ ] All links function correctly
- [ ] Responsive on mobile devices
- [ ] No console errors

### Browser Testing
Test in:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 📚 Additional Documentation

For comprehensive documentation, see the [docs folder](../docs):

- **[Architecture Overview](../docs/ARCHITECTURE.md)**: System design and patterns
- **[Development Guide](../docs/DEVELOPMENT.md)**: Detailed development instructions
- **[Deployment Guide](../docs/DEPLOYMENT.md)**: Deployment to various platforms
- **[API Reference](../docs/API_REFERENCE.md)**: Component and API documentation
- **[Project Structure](../docs/PROJECT_STRUCTURE.md)**: Detailed file organization
- **[Troubleshooting](../docs/TROUBLESHOOTING.md)**: Common issues and solutions

## 🤝 Contributing

See the main repository [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 🌟 About the Band

**Killer Cats from Outer Space** is an electrifying band known for their energetic performances and engaging music. 

### Band Members
- **Ky**: Lead Vocals, Bass 🎤 🎸
- **Jay**: Drums 🥁
- **Xavi**: Guitar 🎸
- **Ren**: Guitar 🎸

### Contact
- **Email**: kk1llercatsfromouterspace@gmail.com
- **Instagram**: [@kk1llercatsfromouterspace](https://www.instagram.com/kk1llercatsfromouterspace)

## 📄 License

This project is open source and available for educational and portfolio-building purposes.

---

**Built with 💜 for Killer Cats from Outer Space**