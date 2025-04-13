using System.Threading.Tasks;
using KillerCatsFromOuterSpace.Services;
using KillerCatsFromOuterSpace.Models;
using Moq;
using Xunit;

namespace KillerCatsFromOuterSpace.Tests
{
    public class EmailServiceTests
    {
        [Fact]
        public async Task SendNewsletterSubmissionAsync_ShouldBeCalledOnce()
        {
            // Arrange
            var mockEmailService = new Mock<IEmailService>();
            var email = "test@example.com";

            // Act
            await mockEmailService.Object.SendNewsletterSubmissionAsync(email);

            // Assert
            mockEmailService.Verify(service => service.SendNewsletterSubmissionAsync(email), Times.Once);
        }
    }

    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {

        }
    }

    public class EventTests
    {
        [Fact]
        public void Event_ShouldSetAndGetPropertiesCorrectly()
        {
            // Arrange
            var eventModel = new Event();
            var id = 1;
            var date = new DateTime(2025, 4, 13);
            var location = "New York";
            var description = "A killer cat concert!";

            // Act
            eventModel.Id = id;
            eventModel.Date = date;
            eventModel.Location = location;
            eventModel.Description = description;

            // Assert
            Assert.Equal(id, eventModel.Id);
            Assert.Equal(date, eventModel.Date);
            Assert.Equal(location, eventModel.Location);
            Assert.Equal(description, eventModel.Description);
        }
    }
}
