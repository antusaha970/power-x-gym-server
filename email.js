const emailBody = (name, plan) => {
  return `
  <html>
    <body>
      <h1>Dear ${name},</h1>
  
      <p>I wanted to take a moment to personally thank you for choosing Power-X-Gym as your fitness destination! We are thrilled to have you as a part of our community.</p>
  
      <p>I wanted to remind you that you have selected <strong>${plan}</strong>  and your first class is scheduled on <strong>Sunday</strong>. Please remember to bring your payment for the first class when you come in.</p>
  
      <p>Our gym is known for its high energy and motivational atmosphere, so be prepared to have fun while working out! Our certified trainers are passionate about helping our members achieve their fitness goals and will be there to support and guide you every step of the way.</p>
  
      <p>If you have any questions or concerns before your first class, please don't hesitate to reach out to us. We are here to help make your fitness journey a success!</p>
  
      <p>Thank you again for choosing Power-X-Gym. We look forward to seeing you soon.</p>
  
      <p>Best regards,<br>
      Trainer Power-x-gym</p>
    </body>
  </html>
  
    `;
};

module.exports = emailBody;
