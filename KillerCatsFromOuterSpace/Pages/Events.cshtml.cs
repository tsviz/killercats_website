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
            var today = DateTime.Today;
            var events = new List<Event>();

            AddEvent(events, today.AddDays(15), "The Aztec Theatre", "Live performance");
            AddEvent(events, today.AddMonths(1).AddDays(20), "San Antonio River Walk", "Outdoor concert");
            AddEvent(events, today.AddMonths(2).AddDays(5), "The Majestic Theatre", "Holiday special");

            UpcomingEvents = events;
        }

        private void AddEvent(List<Event> events, DateTime date, string location, string description)
        {
            events.Add(new Event
            {
                Date = date.ToString("MM-dd-yyyy"),
                Location = location,
                Description = description
            });
        }
    }
}