# Killer Cats from Outer Space - Official Website 🎸🐱🚀

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Razor%20Pages-512BD4)](https://docs.microsoft.com/aspnet/core)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-7952B3?logo=bootstrap)](https://getbootstrap.com/)

Welcome to the official website repository for **Killer Cats from Outer Space** - an intergalactic rock band bringing cosmic sounds to Earth! This is a modern, interactive web application built with ASP.NET Core Razor Pages.

## 🌟 Overview

This project showcases a full-featured band website with event management, interactive games, audio playback, and a dynamic user interface. The website is designed to engage fans and provide information about the band, upcoming events, and merchandise.

## ✨ Key Features

- **🏠 Interactive Home Page**: Dynamic band member profiles with expandable biographies
- **📅 Event Management**: Complete event listing with scheduling capabilities
- **🎮 Cat Game**: Fun, interactive catch-the-cat game with scoring system
- **🎵 Audio Player**: Built-in music player with custom controls
- **📧 Newsletter Subscription**: Email integration for fan engagement
- **📱 Responsive Design**: Mobile-first approach using Bootstrap 5
- **🎨 Modern UI/UX**: Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) or later
- A code editor (Visual Studio, VS Code, or Rider recommended)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tsviz/killercats_website.git
   cd killercats_website
   ```

2. **Navigate to the project directory**
   ```bash
   cd KillerCatsFromOuterSpace
   ```

3. **Restore dependencies**
   ```bash
   dotnet restore
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` (or the URL shown in the console)

## 📁 Project Structure

```
killercats_website/
├── KillerCatsFromOuterSpace/     # Main application directory
│   ├── Pages/                     # Razor Pages
│   │   ├── Index.cshtml          # Home page
│   │   ├── Events.cshtml         # Events listing page
│   │   └── Shared/               # Shared layouts and partials
│   ├── Models/                    # Data models
│   ├── Services/                  # Application services
│   ├── wwwroot/                   # Static files
│   │   ├── css/                  # Stylesheets
│   │   ├── js/                   # JavaScript files
│   │   ├── images/               # Image assets
│   │   ├── audio/                # Audio files
│   │   └── descriptions/         # Band member bios (Markdown)
│   ├── Program.cs                # Application entry point
│   └── Startup.cs                # Service configuration
├── docs/                          # Documentation
├── README.md                      # This file
└── CONTRIBUTING.md               # Contribution guidelines
```

## 📚 Documentation

For comprehensive documentation, please visit the [docs folder](./docs):

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Project Structure](./docs/PROJECT_STRUCTURE.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 8.0**: Web framework
- **Razor Pages**: Server-side rendering
- **Entity Framework Core**: Database ORM (configured)
- **Markdig**: Markdown processing for bios

### Frontend
- **Bootstrap 5.1.3**: UI framework
- **Font Awesome 5.15.3**: Icon library
- **jQuery 3.5.1**: JavaScript library
- **Custom JavaScript**: Interactive features

### Development Tools
- **.NET CLI**: Build and development
- **Git**: Version control

## 🎯 Core Functionality

### Pages
- **Home (`/`)**: Band showcase, member profiles, upcoming events preview
- **Events (`/Events`)**: Complete event calendar with scheduling modal
- **About Section**: Expandable band member biographies with Markdown support

### Interactive Features
- **Cat Game**: Timed clicking game with dynamic difficulty
- **Audio Player**: Custom music player with volume control
- **Event Scheduler**: Modal form for booking requests via email
- **Newsletter Subscription**: Email integration for fan updates

## 🤝 Contributing

We welcome contributions from developers of all skill levels! By contributing, you'll be supporting young artists and building your portfolio.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Good First Issues

New to the project? Look for issues labeled [good first issue](https://github.com/tsviz/killercats_website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## 📝 Configuration

### Application Settings

The application uses `appsettings.json` for configuration:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

### Custom Port

The application is configured to run on port 8080 by default. You can change this in `Program.cs`.

## 🧪 Development

### Building the Project
```bash
dotnet build
```

### Running in Development Mode
```bash
dotnet run --environment Development
```

### Watching for Changes
```bash
dotnet watch run
```

## 🐛 Troubleshooting

Common issues and solutions can be found in the [Troubleshooting Guide](./docs/TROUBLESHOOTING.md).

## 📄 License

This project is open source and available for educational and portfolio-building purposes.

## 📧 Contact

- **Band Email**: kk1llercatsfromouterspace@gmail.com
- **Instagram**: [@kk1llercatsfromouterspace](https://www.instagram.com/kk1llercatsfromouterspace)
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/tsviz/killercats_website/issues)

## 🌟 Acknowledgments

Special thanks to all contributors who help maintain and improve this project!

---

**Built with 💜 for Killer Cats from Outer Space**