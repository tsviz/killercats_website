using System;

namespace KillerCatsFromOuterSpace.Models
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}