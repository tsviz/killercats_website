# Architecture Overview

## Table of Contents
- [Overview](#overview)
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [Design Patterns](#design-patterns)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Security Considerations](#security-considerations)

## Overview

The Killer Cats from Outer Space website is built using a modern, scalable architecture based on ASP.NET Core Razor Pages. The application follows a server-side rendering approach with progressive enhancement through client-side JavaScript.

## Application Architecture

### Architecture Style
- **Pattern**: Model-View-Controller (MVC) with Razor Pages
- **Rendering**: Server-Side Rendering (SSR) with client-side enhancements
- **Communication**: RESTful patterns for API interactions

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (Razor Pages, Views, CSS, JS)        │
├─────────────────────────────────────────┤
│         Application Layer               │
│      (Page Models, Services)            │
├─────────────────────────────────────────┤
│          Domain Layer                   │
│        (Models, Entities)               │
├─────────────────────────────────────────┤
│       Infrastructure Layer              │
│  (External Services, Email, etc.)       │
└─────────────────────────────────────────┘
```

### Key Components

#### 1. Presentation Layer
- **Razor Pages** (`.cshtml`): Server-rendered HTML with C# code
- **Page Models** (`.cshtml.cs`): Code-behind files handling page logic
- **Static Assets**: CSS, JavaScript, images, audio files
- **Layouts**: Shared templates (`_Layout.cshtml`)

#### 2. Application Layer
- **Page Models**: Handle HTTP requests and responses
- **Services**: Business logic and external integrations
  - `IEmailService`: Email functionality interface

#### 3. Domain Layer
- **Models**: Domain entities
  - `Event`: Represents band events
  - `BandMember`: Represents band member information

#### 4. Infrastructure Layer
- **Static File Serving**: Images, CSS, JavaScript, audio
- **Markdown Processing**: Markdig for bio content
- **External Services**: Email, maps integration

## Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| .NET | 8.0 | Runtime framework |
| ASP.NET Core | 8.0 | Web framework |
| Razor Pages | 8.0 | Page-based programming model |
| Entity Framework Core | 8.0 | ORM (configured for future use) |
| Markdig | 0.40.0 | Markdown to HTML conversion |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Bootstrap | 5.1.3 | UI framework and responsive design |
| jQuery | 3.5.1 | DOM manipulation and AJAX |
| Font Awesome | 5.15.3 | Icon library |
| Custom JavaScript | - | Interactive features (game, player) |

### Development Tools
- **.NET CLI**: Build, run, and manage the project
- **Git**: Version control
- **Visual Studio/VS Code**: IDEs

## Design Patterns

### 1. Page Model Pattern
Each Razor Page follows the Page Model pattern, separating UI from logic:

```csharp
public class IndexModel : PageModel
{
    public List<Event> UpcomingEvents { get; set; }
    
    public void OnGet()
    {
        // Handle GET requests
    }
}
```

### 2. Service Pattern
Services encapsulate business logic:

```csharp
public interface IEmailService
{
    Task SendNewsletterSubmissionAsync(string email);
}
```

### 3. Repository Pattern
Data access is abstracted (ready for implementation):

```csharp
// Event data is currently in-memory
// Can be extended to use repositories
```

### 4. Dependency Injection
ASP.NET Core's built-in DI container manages service lifetimes:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddRazorPages();
    // Services can be registered here
}
```

## Component Architecture

### Page Structure

#### Index Page (Home)
```
Index.cshtml
├── Header & Navigation
│   ├── Logo & Dropdown Menu
│   ├── Game Toggle Button
│   └── Audio Player Controls
├── Hero Section
│   ├── Band Name & Description
│   └── Spinning Guitar Animations
├── Upcoming Events Preview
│   └── Event Cards (Top 2)
└── Band Members Section
    └── Member Cards with Bios
```

#### Events Page
```
Events.cshtml
├── Header & Navigation
├── Events Hero Section
├── All Events List
│   └── Event Cards with Location Links
└── Schedule Event Modal
```

### JavaScript Modules

#### 1. Cat Game (`catGame.js`)
- **Purpose**: Interactive catch-the-cat game
- **Features**: 
  - Score tracking
  - Dynamic difficulty (speed increases)
  - 30-second timer
  - Inactivity detection
- **State Management**: Window-scoped singleton pattern

#### 2. Audio Player (`site.js`, `scripts.js`)
- **Purpose**: Custom audio player controls
- **Features**:
  - Play/pause toggle
  - Volume control
  - Visual equalizer
- **Integration**: Multiple instances for different UI locations

#### 3. Event Scheduler (`scripts.js`)
- **Purpose**: Event booking functionality
- **Features**:
  - Modal form
  - Date validation (future dates only)
  - Email integration (mailto links)
  - Form validation

#### 4. Newsletter (`newsletter.js`, `scripts.js`)
- **Purpose**: Newsletter subscription
- **Features**:
  - Email validation
  - Modal management
  - Email integration

## Data Flow

### Request Flow

```
User Request
    ↓
Browser
    ↓
ASP.NET Core Middleware Pipeline
    ↓
Routing (maps URL to Razor Page)
    ↓
Page Model (OnGet/OnPost methods)
    ↓
Business Logic / Services
    ↓
Data Access (in-memory or future DB)
    ↓
View Rendering (Razor Engine)
    ↓
HTML Response
    ↓
Browser
    ↓
Client-Side JavaScript Enhancement
```

### Event Scheduling Flow

```
User clicks "Schedule Event"
    ↓
Modal opens with form
    ↓
User fills date and details
    ↓
Client-side validation
    ↓
Form submission
    ↓
JavaScript formats data
    ↓
Mailto link opens email client
    ↓
Modal closes and resets
```

### Newsletter Subscription Flow

```
User clicks "Join Newsletter"
    ↓
Modal opens
    ↓
User enters email
    ↓
Validation
    ↓
Mailto link with email data
    ↓
Email client opens
    ↓
Modal closes
```

## Security Considerations

### Current Implementation

1. **Input Validation**
   - Client-side validation on forms
   - Date validation for event scheduling

2. **HTTPS Redirection**
   - Configured in production mode
   - Uses HSTS headers

3. **Content Security**
   - Static file serving with proper MIME types
   - No user-generated content storage

4. **Email Integration**
   - Uses mailto links (client-side)
   - No server-side email credentials stored

### Future Enhancements

1. **Anti-Forgery Tokens**
   - Add CSRF protection for form submissions
   - Implement request verification tokens

2. **Server-Side Validation**
   - Implement model validation
   - Add business rule validation

3. **Database Security**
   - Connection string encryption
   - SQL injection prevention via EF Core

4. **Authentication & Authorization**
   - Admin panel for event management
   - Role-based access control

## Scalability Considerations

### Current State
- **Stateless Architecture**: No session state dependencies
- **Static Content**: Easily cacheable CSS, JS, images
- **In-Memory Data**: Events are hardcoded

### Scaling Options

1. **Horizontal Scaling**
   - Application is stateless and can run multiple instances
   - Load balancer can distribute traffic

2. **Database Integration**
   - EF Core already configured
   - Easy migration to SQL Server, PostgreSQL, etc.

3. **CDN Integration**
   - Static assets can be served from CDN
   - Improves global performance

4. **Caching**
   - Response caching for static pages
   - Distributed cache for shared data

## Performance Optimization

### Implemented Optimizations

1. **Asset Optimization**
   - CDN-hosted libraries (Bootstrap, jQuery)
   - Font Awesome via CDN

2. **Lazy Loading**
   - Images loaded as needed
   - Bio content expanded on demand

3. **Efficient Rendering**
   - Partial views for reusable components
   - Minimal server-side processing

### Future Optimizations

1. **Asset Bundling & Minification**
   - Combine and minify CSS/JS files
   - Image optimization and compression

2. **Response Compression**
   - Enable Gzip/Brotli compression

3. **Browser Caching**
   - Set cache headers for static assets

## Deployment Architecture

### Development Environment
```
Developer Machine
    ↓
dotnet run
    ↓
Kestrel Web Server (port 8080)
    ↓
http://localhost:8080
```

### Production Environment (Recommended)
```
Internet
    ↓
Reverse Proxy (Nginx/IIS)
    ↓
ASP.NET Core Application (Kestrel)
    ↓
Static Files / Database / External Services
```

## Extensibility Points

### Easy Extensions

1. **New Pages**
   - Add new `.cshtml` and `.cshtml.cs` files
   - Automatic routing

2. **Services**
   - Implement interface
   - Register in DI container

3. **Models**
   - Create new model classes
   - Add to page models

4. **UI Components**
   - Create partial views
   - Reuse across pages

### Integration Points

1. **Database**
   - EF Core context ready
   - Add migrations and models

2. **External APIs**
   - Service layer ready for integration
   - HTTP client can be injected

3. **Authentication**
   - ASP.NET Identity packages included
   - Ready for configuration

## Conclusion

The application follows modern ASP.NET Core best practices with a clean separation of concerns. The architecture is designed to be maintainable, scalable, and extensible while keeping the current implementation simple and focused on the band's needs.
