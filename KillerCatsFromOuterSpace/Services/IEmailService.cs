using System.Threading.Tasks;

namespace KillerCatsFromOuterSpace.Services
{
    public interface IEmailService
    {
        Task SendNewsletterSubmissionAsync(string email);
    }
}
