using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using KillerCatsFromOuterSpace.Models;

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
                new BandMember { Name = "Ky", Instrument = "Lead Vocals, Bass", Description = "The Singer of the Stars" },
                new BandMember { Name = "Jay", Instrument = "Drums", Description = "Rhythm master from Neptune" },
                new BandMember { Name = "Xavi", Instrument = "Guitar", Description = "Deep space Guitar explorer" },
                new BandMember { Name = "Ren", Instrument = "Guitar", Description = "The Cosmic Shredder" }
            };
        }
    }

    public class BandMember
    {
        public string Name { get; set; }
        public string Instrument { get; set; }
        public string Description { get; set; }
    }
}