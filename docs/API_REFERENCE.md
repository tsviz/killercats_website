# API and Component Reference

## Table of Contents
- [Overview](#overview)
- [Page Models](#page-models)
- [Models](#models)
- [Services](#services)
- [JavaScript Components](#javascript-components)
- [CSS Classes](#css-classes)
- [Configuration](#configuration)

## Overview

This document provides detailed reference information for the components, models, and APIs in the Killer Cats from Outer Space website.

## Page Models

### IndexModel

**Location**: `Pages/Index.cshtml.cs`

**Purpose**: Handles the home page logic, including band information and event display.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `UpcomingEvents` | `List<Event>` | List of upcoming events (top 2 displayed) |
| `BandName` | `string` | Name of the band (default: "Killer Cats from Outer Space") |
| `BandDescription` | `string` | Band tagline |
| `BandMembers` | `List<BandMember>` | List of band members with profiles |

#### Methods

```csharp
public void OnGet()
```
**Description**: Initializes the page, loads events, and sets up band member information.

**Example**:
```csharp
public void OnGet()
{
    // Loads events from EventsModel
    var eventsModel = new EventsModel();
    eventsModel.OnGet();
    UpcomingEvents = eventsModel.UpcomingEvents;
    
    // Initialize band members
    BandMembers = new List<BandMember> { /* ... */ };
}
```

```csharp
private string ReadDescription(string fileName)
```
**Parameters**:
- `fileName` (string): Name of the Markdown file in `wwwroot/descriptions/`

**Returns**: HTML string converted from Markdown

**Description**: Reads a Markdown file and converts it to HTML using Markdig.

**Example**:
```csharp
string bioHtml = ReadDescription("ky.md");
```

### EventsModel

**Location**: `Pages/Events.cshtml.cs`

**Purpose**: Manages the events listing page.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `UpcomingEvents` | `List<Event>` | Complete list of all band events |

#### Methods

```csharp
public void OnGet()
```
**Description**: Loads all events for the band.

```csharp
private void AddEvent(List<Event> events, int id, DateTime date, 
                      string location, string description)
```
**Parameters**:
- `events`: List to add the event to
- `id`: Unique event identifier
- `date`: Event date
- `location`: Event venue
- `description`: Event description

**Description**: Helper method to add an event to the list.

**Example**:
```csharp
AddEvent(events, 1, new DateTime(2025, 1, 15), 
         "The Aztec Theatre", "Live performance");
```

## Models

### Event

**Location**: `Models/Event.cs`

**Purpose**: Represents a band event.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Id` | `int` | Unique event identifier |
| `Date` | `DateTime` | Date and time of the event |
| `Location` | `string` | Venue or location name |
| `Description` | `string` | Event description |

#### Example

```csharp
var event = new Event
{
    Id = 1,
    Date = new DateTime(2025, 1, 15),
    Location = "The Aztec Theatre",
    Description = "Live performance"
};
```

### BandMember

**Location**: `Pages/Index.cshtml.cs` (inline class)

**Purpose**: Represents a band member's profile.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `Name` | `string` | Member's name |
| `Instrument` | `string` | Instrument(s) played |
| `Description` | `string` | Short description with emojis |
| `Bio` | `string` | Full biography (HTML from Markdown) |
| `ProfilePictureUrl` | `string` | URL to profile picture |

#### Example

```csharp
var member = new BandMember
{
    Name = "Ky",
    Instrument = "Lead Vocals, Bass 🎤 🎸",
    Description = "✨ The Voice of the Cosmos",
    Bio = ReadDescription("ky.md"),
    ProfilePictureUrl = "/images/band-members/artist_placeholder.png"
};
```

## Services

### IEmailService

**Location**: `Services/IEmailService.cs`

**Purpose**: Interface for email-related functionality.

#### Methods

```csharp
Task SendNewsletterSubmissionAsync(string email)
```
**Parameters**:
- `email` (string): Subscriber's email address

**Returns**: `Task`

**Description**: Sends newsletter subscription confirmation.

**Status**: Interface defined, implementation pending.

## JavaScript Components

### CatGame

**Location**: `wwwroot/js/catGame.js`

**Purpose**: Interactive cat-catching game.

#### Namespace

`window.CatGame`

#### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `state.active` | `boolean` | Whether game is active |
| `state.cat` | `HTMLElement` | Cat element reference |
| `state.score` | `number` | Current score |
| `state.speedFactor` | `number` | Current game speed multiplier |

#### Methods

```javascript
initGame()
```
**Description**: Initializes the game, creates DOM elements, and sets up event listeners.

**Usage**:
```javascript
window.initCatGame(); // Global entry point
```

```javascript
toggleGame()
```
**Description**: Starts or stops the game.

```javascript
updateCatPosition()
```
**Description**: Moves the cat to a random position on screen.

```javascript
resetInactivityTimer()
```
**Description**: Resets the 10-second inactivity timeout.

```javascript
endGame()
```
**Description**: Ends the game, displays final score, and cleans up.

#### Game Features

- **Duration**: 30 seconds
- **Inactivity Timeout**: 10 seconds of no clicks
- **Speed Scaling**: Increases difficulty every 5 seconds
- **Scoring**: +1 point per successful click

### Audio Player

**Location**: `wwwroot/js/site.js`, `wwwroot/js/scripts.js`

#### Global Functions

```javascript
togglePlay()
```
**Description**: Toggles audio playback (play/pause).

**Usage**:
```html
<button onclick="togglePlay()">Play/Pause</button>
```

```javascript
setVolume(volume)
```
**Parameters**:
- `volume` (number): Volume level (0.0 to 1.0)

**Description**: Sets the audio player volume.

**Usage**:
```html
<input type="range" min="0" max="1" step="0.1" 
       oninput="setVolume(this.value)">
```

### Event Scheduler

**Location**: `wwwroot/js/scripts.js`

#### Global Functions

```javascript
window.submitEventRequest()
```
**Description**: Handles event scheduling form submission via mailto link.

**Form Fields**:
- `eventDate`: Date input field
- `eventDetails`: Textarea for event details

**Behavior**:
- Validates form inputs
- Formats date as MM-DD-YYYY
- Creates mailto link
- Opens email client
- Closes modal and resets form

#### Modal

**ID**: `scheduleModal`

**Trigger**:
```html
<button data-bs-toggle="modal" data-bs-target="#scheduleModal">
    Schedule Event
</button>
```

### Newsletter System

**Location**: `wwwroot/js/newsletter.js`, `wwwroot/js/scripts.js`

#### Functions

```javascript
openMail()
```
**Description**: Opens email client with newsletter subscription request.

**Form Fields**:
- `emailInput`: Email address input

**Behavior**:
- Reads email from form
- Creates mailto link
- Opens email client
- Closes modal

#### Modal

**ID**: `newsletterModal`

**Trigger**:
```html
<button data-bs-toggle="modal" data-bs-target="#newsletterModal">
    Join Newsletter
</button>
```

### Helper Functions

**Location**: `wwwroot/js/scripts.js`

```javascript
openMap(location)
```
**Parameters**:
- `location` (string): Location name or address

**Description**: Opens the location in appropriate map app (Apple Maps for iOS, Google Maps for others).

**Usage**:
```html
<a href="javascript:void(0)" onclick="openMap('The Aztec Theatre')">
    View on Map
</a>
```

```javascript
playCatAnimation()
```
**Description**: Plays animated cat animation with sound effect.

**Features**:
- Plays cat meow sound
- Animates cat GIF across screen
- Zigzag movement pattern
- Auto-removes after animation

## CSS Classes

### Custom Classes

#### Layout & Structure

| Class | Purpose |
|-------|---------|
| `.killer-cats-title` | Styled band name title |
| `.spinning-guitar` | Animated guitar images |
| `.background-wrapper` | Main content wrapper |
| `.main-content` | Primary content area |

#### Components

| Class | Purpose |
|-------|---------|
| `.event-card` | Event display card |
| `.band-member-card` | Member profile card |
| `.bio-toggle` | Biography expand/collapse button |
| `.bio-content` | Biography content area |
| `.floating-cat` | Cat game element |
| `.score-display` | Game score display |

#### Navigation

| Class | Purpose |
|-------|---------|
| `.secondary-nav` | Secondary navigation bar |
| `.contact-info-inline` | Inline contact information |
| `.social-buttons` | Social media button container |
| `.floating-home-btn` | Floating home button |

#### Modals & Forms

| Class | Purpose |
|-------|---------|
| `.schedule-button` | Floating schedule button |
| `.modal-content` | Modal window content |
| `.form-group` | Form field group |

#### Audio Player

| Class | Purpose |
|-------|---------|
| `.fixed-audio-player` | Fixed position audio player |
| `.custom-controls` | Audio control buttons |
| `.volume-slider` | Volume control slider |
| `.equalizer` | Visual equalizer bars |
| `.boombox-player` | Boombox-style player |

### Bootstrap Classes Used

The application heavily uses Bootstrap 5.1.3 classes:

#### Common Utilities
- `container`, `container-fluid`
- `row`, `col-*`
- `d-flex`, `justify-content-*`, `align-items-*`
- `text-center`, `text-white`
- `bg-dark`, `bg-light`
- `btn`, `btn-primary`, `btn-secondary`
- `modal`, `modal-dialog`, `modal-content`
- `navbar`, `nav-item`, `nav-link`

## Configuration

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

#### Configuration Keys

| Key | Type | Description | Default |
|-----|------|-------------|---------|
| `Logging:LogLevel:Default` | `string` | Default log level | `Information` |
| `Logging:LogLevel:Microsoft` | `string` | Microsoft library log level | `Warning` |
| `AllowedHosts` | `string` | Allowed host names | `*` (all) |

### Program.cs Configuration

```csharp
webBuilder.UseUrls("http://*:8080");
```

**Default Port**: 8080

**Access**: 
- Local: `http://localhost:8080`
- Network: `http://<machine-ip>:8080`

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `ASPNETCORE_ENVIRONMENT` | Set runtime environment | `Development`, `Production` |
| `ASPNETCORE_URLS` | Override binding URLs | `http://+:5000` |

## Partial Views

### _Layout.cshtml

**Location**: `Pages/Shared/_Layout.cshtml`

**Purpose**: Main layout template for all pages.

**Sections**:
- Navigation header
- Secondary navigation
- Schedule button
- Modals (schedule, newsletter)
- Audio player
- Footer

**RenderBody**: Placeholder for page content

**RenderSection**: Optional Scripts section

### _EventList.cshtml

**Location**: `Pages/Shared/_EventList.cshtml`

**Purpose**: Reusable event list component.

**Model**: `IEnumerable<Event>`

**Usage**:
```cshtml
@await Html.PartialAsync("_EventList", Model.UpcomingEvents)
```

## External Dependencies

### NuGet Packages

| Package | Version | Purpose |
|---------|---------|---------|
| Markdig | 0.40.0 | Markdown processing |
| Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore | 8.0.0 | EF Core error pages |
| Microsoft.AspNetCore.Identity.EntityFrameworkCore | 8.0.0 | Identity framework |
| Microsoft.AspNetCore.Identity.UI | 8.0.0 | Identity UI |
| Microsoft.EntityFrameworkCore.SqlServer | 8.0.0 | SQL Server provider |
| Microsoft.EntityFrameworkCore.Tools | 8.0.0 | EF Core tools |

### CDN Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Bootstrap | 5.1.3 | UI framework |
| jQuery | 3.5.1 | DOM manipulation |
| Font Awesome | 5.15.3 | Icons |
| Popper.js | 1.16.1 | Tooltip positioning |

## Asset Paths

### Images

```
/images/killer-cats-logo.svg          - Band logo
/images/killer-cats-main-logo.jpeg    - Main logo (overlay)
/images/guitar.png                     - Spinning guitar decoration
/images/animated-cat.gif               - Animated cat for game
/images/band-playing.jpeg              - Band performance photo
/images/lightning-image.jpg            - Background decoration
/images/band-members/artist_placeholder.png - Member placeholder
```

### Audio

```
/audio/hard-rock-audio.mp3  - Background music
/sounds/cat-meow.mp3        - Cat sound effect
```

### Descriptions

```
/descriptions/ky.md    - Ky's biography
/descriptions/jay.md   - Jay's biography
/descriptions/xavi.md  - Xavi's biography
/descriptions/ren.md   - Ren's biography
```

## Contact Information

### Email

**Band Email**: `kk1llercatsfromouterspace@gmail.com`

Used for:
- Event scheduling requests
- Newsletter subscriptions
- General inquiries

### Social Media

- **Instagram**: [@kk1llercatsfromouterspace](https://www.instagram.com/kk1llercatsfromouterspace)
- **Facebook**: Placeholder link
- **TikTok**: Placeholder link
- **Twitter**: Placeholder link
- **YouTube**: Placeholder link

## Additional Notes

### URL Structure

- Home: `/` or `/Index`
- Events: `/Events`
- Sections: `/#about` (anchor links)

### Routing

ASP.NET Core Razor Pages uses convention-based routing:
- File: `Pages/Index.cshtml` → Route: `/Index` or `/`
- File: `Pages/Events.cshtml` → Route: `/Events`

### Static File Serving

All files in `wwwroot/` are served as static files:
- `wwwroot/css/site.css` → `/css/site.css`
- `wwwroot/js/site.js` → `/js/site.js`
- `wwwroot/images/logo.png` → `/images/logo.png`

## API Endpoints

Currently, the application uses:
- **Razor Pages GET handlers**: `OnGet()` methods
- **Client-side interactions**: JavaScript and mailto links
- **No REST API**: All interactions are page-based

### Future API Considerations

If REST API is needed:
1. Add API controllers
2. Implement proper authentication
3. Add Swagger/OpenAPI documentation
4. Use DTOs for data transfer

## Related Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
