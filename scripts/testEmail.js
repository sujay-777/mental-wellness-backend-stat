const { sendEmail } = require('../services/emailService');
const config = require('../config/config');

async function testEmail() {
  console.log('Testing email functionality...');
  console.log('Email configuration:');
  console.log('- Host:', config.EMAIL_HOST);
  console.log('- Port:', config.EMAIL_PORT);
  console.log('- User:', config.EMAIL_USER);
  console.log('- From:', config.EMAIL_FROM);
  
  if (!config.EMAIL_USER || !config.EMAIL_PASS) {
    console.error('❌ Email credentials not configured!');
    console.log('Please set EMAIL_USER and EMAIL_PASS in your .env file');
    return;
  }

  const testEmail = {
    to: config.EMAIL_USER, // Send to yourself for testing
    subject: 'Test Email - Mental Wellness Reminder System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Email System Test</h2>
        <p>Hello!</p>
        <p>This is a test email to verify that the reminder system is working correctly.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #34495e; margin-top: 0;">Test Details:</h3>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          <p><strong>System:</strong> Mental Wellness Reminder System</p>
        </div>
        
        <p>If you received this email, the email system is working correctly!</p>
        
        <p>Best regards,<br>Mental Wellness Team</p>
      </div>
    `
  };

  try {
    console.log('Sending test email...');
    const result = await sendEmail(testEmail.to, testEmail.subject, testEmail.html);
    
    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('Message ID:', result.messageId);
    } else {
      console.error('❌ Failed to send test email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error during email test:', error.message);
  }
}

// Run the test
testEmail().then(() => {
  console.log('Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
}); 