using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using KillerCatsFromOuterSpace.Models;

namespace KillerCatsFromOuterSpace.Pages
{
    public class EventsModel : PageModel
    {
        public List<Event> UpcomingEvents { get; set; }

        public void OnGet()
        {
            var events = new List<Event>();

            AddEvent(events, 1, new DateTime(2025, 1, 15), "The Aztec Theatre", "Live performance");
            AddEvent(events, 2, new DateTime(2025, 2, 18), "San Antonio River Walk", "Outdoor concert");
            AddEvent(events, 3, new DateTime(2025, 3, 7), "The Majestic Theatre", "Holiday special");
            AddEvent(events, 4, new DateTime(2025, 4, 12), "San Antonio Event Center - Main Hall", "Trade show");
            AddEvent(events, 5, new DateTime(2025, 4, 22), "San Antonio Convention Center - Exhibit Hall", "Comic con");
            AddEvent(events, 6, new DateTime(2025, 5, 3), "San Antonio Park - Amphitheater", "Outdoor movie night");
            AddEvent(events, 7, new DateTime(2025, 5, 13), "San Antonio Stadium - Field", "Sports game");
            AddEvent(events, 8, new DateTime(2025, 5, 23), "San Antonio Museum of Art", "Art exhibit");
            AddEvent(events, 9, new DateTime(2025, 6, 2), "San Antonio Zoo", "Animal show");
            AddEvent(events, 10, new DateTime(2025, 6, 14), "San Antonio Magik Theater - Main Stage", "Play performance");
            AddEvent(events, 11, new DateTime(2025, 6, 24), "San Antonio Library - Auditorium", "Book reading");
            AddEvent(events, 12, new DateTime(2025, 7, 4), "San Antonio Churchill High School", "Graduation ceremony");
            AddEvent(events, 13, new DateTime(2025, 7, 16), "San Antonio Mall - Center Court", "Fashion show");
            AddEvent(events, 14, new DateTime(2025, 7, 26), "San Antonio Event Center", "Music festival");
            AddEvent(events, 15, new DateTime(2025, 8, 5), "San Antonio Convention Center", "Tech conference");
            AddEvent(events, 16, new DateTime(2025, 8, 15), "San Antonio Park", "Food festival");
            AddEvent(events, 17, new DateTime(2025, 9, 4), "San Antonio Mall", "Shopping festival");

            UpcomingEvents = events;
        }

        private void AddEvent(List<Event> events, int id, DateTime date, string location, string description)
        {
            events.Add(new Event
            {
                Id = id,
                Date = date,
                Location = location,
                Description = description
            });
        }
    }
}