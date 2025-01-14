using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace KillerCatsFromOuterSpace.Pages
{
    public class EventsModel : PageModel
    {
        public List<Event> UpcomingEvents { get; set; }

        public void OnGet()
        {
            UpcomingEvents = new List<Event>
            {
                new Event { Date = "2023-10-15", Location = "Local Venue", Description = "Live performance" },
                new Event { Date = "2023-11-20", Location = "City Park", Description = "Outdoor concert" },
                new Event { Date = "2023-12-05", Location = "Downtown Club", Description = "Holiday special" }
            };
        }
    }

    public class Event
    {
        public string Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}