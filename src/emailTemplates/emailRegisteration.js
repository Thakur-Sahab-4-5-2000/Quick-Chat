const generateEmailRegisterTemplate = (userName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Service</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #215F7F;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .header img {
      width: 100px;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h2 {
      color: #333333;
      font-size: 22px;
      margin: 0;
      padding-bottom: 10px;
    }
    .content p {
      color: #666666;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
    }
    .content a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #215F7F;
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 0 0 8px 8px;
      color: #999999;
      font-size: 14px;
    }
    .footer a {
      color: #215F7F;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://your-logo-url.com/logo.png" alt="Logo">
      <h1>Welcome to Our Service!</h1>
    </div>
    <div class="content">
      <h2>Hi ${userName},</h2>
      <p>Thank you for registering with us! We're excited to have you on board.</p>
    </div>
    <div class="footer">
      <p>If you didn't sign up for this account, you can safely ignore this email. If you have any questions, feel free to <a href="mailto:support@yourservice.com">contact us</a>.</p>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export default generateEmailRegisterTemplate;
