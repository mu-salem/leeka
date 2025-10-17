/**
 * Generate HTML email template for contact form submission
 * @param {Object} data - Contact form data
 * @param {string} data.name - Sender name
 * @param {string} data.email - Sender email
 * @param {string} data.subject - Email subject
 * @param {string} data.message - Email message
 * @returns {string} - HTML formatted email
 */
export const generateContactEmailHTML = ({ name, email, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #4a90e2;
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
          margin: -30px -30px 20px -30px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field label {
          font-weight: bold;
          color: #4a90e2;
          display: block;
          margin-bottom: 5px;
        }
        .field-content {
          background-color: white;
          padding: 10px;
          border-radius: 5px;
          border-left: 3px solid #4a90e2;
        }
        .message-box {
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          border-left: 3px solid #4a90e2;
          min-height: 100px;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>
        
        <div class="field">
          <label>👤 Name:</label>
          <div class="field-content">${name}</div>
        </div>
        
        <div class="field">
          <label>📧 Email:</label>
          <div class="field-content"><a href="mailto:${email}">${email}</a></div>
        </div>
        
        <div class="field">
          <label>📝 Subject:</label>
          <div class="field-content">${subject}</div>
        </div>
        
        <div class="field">
          <label>💬 Message:</label>
          <div class="message-box">${message}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the Lekka Technologies contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate HTML email template for free consultation request
 * @param {Object} data - Consultation form data
 * @param {string} data.name - Client name
 * @param {string} data.email - Client email
 * @param {string} data.phone - Client phone
 * @param {string} data.service - Service interested in
 * @returns {string} - HTML formatted email
 */
export const generateConsultationEmailHTML = ({ name, email, phone, service }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Free Consultation Request</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #28a745;
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
          margin: -30px -30px 20px -30px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field label {
          font-weight: bold;
          color: #28a745;
          display: block;
          margin-bottom: 5px;
        }
        .field-content {
          background-color: white;
          padding: 10px;
          border-radius: 5px;
          border-left: 3px solid #28a745;
        }
        .highlight {
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Free Consultation Request</h1>
        </div>
        
        <div class="field">
          <label>👤 Name:</label>
          <div class="field-content">${name}</div>
        </div>
        
        <div class="field">
          <label>📧 Email:</label>
          <div class="field-content"><a href="mailto:${email}">${email}</a></div>
        </div>
        
        <div class="field">
          <label>📱 Phone:</label>
          <div class="field-content"><a href="tel:${phone}">${phone}</a></div>
        </div>
        
        <div class="field">
          <label>💼 Service Interested In:</label>
          <div class="field-content">${service}</div>
        </div>
        
        <div class="highlight">
          <strong>⚡ Action Required:</strong> Please contact this client within 24 hours to schedule their free consultation.
        </div>
        
        <div class="footer">
          <p>This email was sent from the Lekka Technologies consultation request form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate HTML email template for consultation confirmation (sent to client)
 * @param {string} name - Client name
 * @returns {string} - HTML formatted email
 */
export const generateConsultationConfirmationHTML = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Consultation Request Received</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #4a90e2;
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
          margin: -30px -30px 20px -30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .success-icon {
          text-align: center;
          font-size: 48px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
        .contact-info {
          background-color: #e9f5ff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Thank You for Your Interest!</h1>
        </div>
        
        <div class="success-icon">🎉</div>
        
        <div class="content">
          <h2>Dear ${name},</h2>
          <p>Thank you for requesting a <strong>free consultation</strong> with Lekka Technologies!</p>
          <p>We have received your request and one of our team members will contact you soon to discuss your project needs and schedule a consultation at your convenience.</p>
          <p>We're excited to help bring your ideas to life!</p>
        </div>
        
        <div class="contact-info">
          <h3>In the meantime:</h3>
          <ul>
            <li>Feel free to explore our services on our website</li>
            <li>Check out our portfolio to see our previous work</li>
            <li>You can also reach us directly at <a href="mailto:${process.env.EMAIL}">${process.env.EMAIL}</a></li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>Lekka Technologies</strong></p>
          <p>Building innovative solutions for your business</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
