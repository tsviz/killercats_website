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
            UpcomingEvents = GenerateUpcomingEvents();
        }

        private List<Event> GenerateUpcomingEvents()
        {
            var events = new List<Event>();
            var today = DateTime.Today;

            events.Add(new Event
            {
                Date = today.AddDays(15).ToString("MM-dd-yyyy"),
                Location = "The Aztec Theatre",
                Description = "Live performance"
            });

            events.Add(new Event
            {
                Date = today.AddMonths(1).AddDays(20).ToString("MM-dd-yyyy"),
                Location = "San Antonio River Walk",
                Description = "Outdoor concert"
            });

            events.Add(new Event
            {
                Date = today.AddMonths(2).AddDays(5).ToString("MM-dd-yyyy"),
                Location = "The Majestic Theatre",
                Description = "Holiday special"
            });

            return events;
        }
    }
}