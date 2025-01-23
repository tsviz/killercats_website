using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using KillerCatsFromOuterSpace.Models;
using System.IO;
using Markdig;

namespace KillerCatsFromOuterSpace.Pages
{
    public class IndexModel : PageModel
    {
        public List<Event> UpcomingEvents { get; set; }
        public string BandName { get; set; } = "Killer Cats from Outer Space";
        public string BandDescription { get; set; } = "We're an intergalactic rock band bringing cosmic sounds to Earth!";
        public List<BandMember> BandMembers { get; set; }

        public void OnGet()
        {
            var eventsModel = new EventsModel();
            eventsModel.OnGet();
            UpcomingEvents = eventsModel.UpcomingEvents;

            BandMembers = new List<BandMember>
            {
                new BandMember { 
                    Name = "Ky", 
                    Instrument = "Lead Vocals, Bass 🎤 🎸", 
                    Description = "✨ The Voice of the Cosmos\n• Powerful vocal range that spans galaxies\n• Thundering bass lines that shake the stars\n• Charismatic stage presence that draws in audiences across the universe", 
                    Bio = ReadDescription("ky.md"), 
                    ProfilePictureUrl = "/images/band-members/artist_placeholder.png" 
                },
                new BandMember { 
                    Name = "Jay", 
                    Instrument = "Drums 🥁", 
                    Description = "🌟 The Rhythm Master\n• Creates cosmic beats that transcend time and space\n• Blends complex rhythms with otherworldly energy\n• Drives the band's intergalactic sound with precision", 
                    Bio = ReadDescription("jay.md"), 
                    ProfilePictureUrl = "/images/band-members/artist_placeholder.png"
                },
                new BandMember { 
                    Name = "Xavi", 
                    Instrument = "Guitar 🎸", 
                    Description = "💫 The Melodic Explorer\n• Weaves celestial melodies through space and time\n• Crafts sonic landscapes from distant galaxies\n• Masters of ethereal guitar harmonies", 
                    Bio = ReadDescription("xavi.md"), 
                    ProfilePictureUrl = "/images/band-members/artist_placeholder.png"
                },
                new BandMember { 
                    Name = "Ren", 
                    Instrument = "Guitar 🎸", 
                    Description = "⚡ The Cosmic Shredder\n• Bends space-time with lightning-fast riffs\n• Channels energy from neutron stars into each solo\n• Creates dimensional rifts with face-melting leads", 
                    Bio = ReadDescription("ren.md"), 
                    ProfilePictureUrl = "/images/band-members/artist_placeholder.png"
                }
            };
        }

        private string ReadDescription(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "descriptions", fileName);
            string markdown = System.IO.File.ReadAllText(filePath);
            var pipeline = new MarkdownPipelineBuilder().UseAdvancedExtensions().Build();
            return Markdown.ToHtml(markdown, pipeline);
        }
    }

    public class BandMember
    {
        public string Name { get; set; }
        public string Instrument { get; set; }
        public string Description { get; set; }
        public string Bio { get; set; }
        public string ProfilePictureUrl { get; set; }
    }
}