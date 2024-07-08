import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'sheriffgaye5@gmail.com',
      pass: 'yeka bmeo vyhy veed',
    }
  });
  
  