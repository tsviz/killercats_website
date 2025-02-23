using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Threading.Tasks;

namespace KillerCatsFromOuterSpace.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;
    private readonly IWebHostEnvironment _environment;

    public EmailService(
        IConfiguration configuration, 
        ILogger<EmailService> logger,
        IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _logger = logger;
        _environment = environment;
    }

    public async Task SendNewsletterSubmissionAsync(string email)
    {
        _logger.LogInformation("Creating email message for {Email}", email);
        
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Killer Cats", _configuration["EmailSettings:FromEmail"]));
        message.To.Add(new MailboxAddress("Newsletter Admin", _configuration["EmailSettings:NewsletterEmail"]));
        message.Subject = "New Newsletter Subscription";
        
        message.Body = new TextPart("html")
        {
            Text = $"<p>New subscription request from: <strong>{email}</strong></p>"
        };

        using var client = new SmtpClient();
        try
        {
            _logger.LogInformation("Connecting to SMTP server {Host}:{Port}", 
                _configuration["EmailSettings:SmtpHost"],
                _configuration["EmailSettings:SmtpPort"]);

            await client.ConnectAsync(
                _configuration["EmailSettings:SmtpHost"],
                int.Parse(_configuration["EmailSettings:SmtpPort"]),
                false);

            _logger.LogInformation("Connected, attempting authentication");
            await client.AuthenticateAsync(
                _configuration["EmailSettings:SmtpUser"],
                _configuration["EmailSettings:SmtpPassword"]);

            _logger.LogInformation("Authentication successful, sending email");
            await client.SendAsync(message);
            _logger.LogInformation("Email sent successfully");
            
            await client.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email for {Email} - Error: {Message}", email, ex.Message);
            throw;
        }
    }
}
