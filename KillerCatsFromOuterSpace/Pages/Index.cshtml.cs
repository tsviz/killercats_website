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
                    Instrument = "Lead Vocals, Bass", 
                    Description = "Ky brings cosmic vocals and thundering bass lines to our interstellar journey.", 
                    Bio = ReadDescription("ky.md"), 
                    ProfilePictureUrl = "/images/artist_placeholder.png" 
                },
                new BandMember { 
                    Name = "Jay", 
                    Instrument = "Drums", 
                    Description = "Jay is a cosmic rhythm master, blending the dynamic sounds of Danny Carey and Abe Cunningham. His drumming brings an electrifying energy to Killer Cats From Outer Space, making every performance an interstellar experience.", 
                    Bio = ReadDescription("jay.md"), 
                    ProfilePictureUrl = "/images/artist_placeholder.png" 
                },
                new BandMember { 
                    Name = "Xavi", 
                    Instrument = "Guitar", 
                    Description = "Xavi weaves celestial melodies through space and time with his guitar mastery.", 
                    Bio = ReadDescription("xavi.md"), 
                    ProfilePictureUrl = "/images/artist_placeholder.png" 
                },
                new BandMember { 
                    Name = "Ren", 
                    Instrument = "Guitar", 
                    Description = "Ren's guitar riffs echo through the cosmos, bringing otherworldly energy to every song.", 
                    Bio = ReadDescription("ren.md"), 
                    ProfilePictureUrl = "/images/artist_placeholder.png" 
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