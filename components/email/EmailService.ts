import nodemailer from 'nodemailer';
import handlebars from 'handlebars/runtime'; // Ensure you're using runtime version
import fs from 'fs';
import path from 'path';
import { transporter } from './transporter';

export const sendEmail = async (subscriberEmail: string, courseTitle: string) => {
  try {

    const templatePath = path.join(process.cwd(), 'components/email/template.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');

    const template = handlebars.compile(templateSource);
    const htmlToSend = template({ courseTitle });

    await transporter.sendMail({
      from: '"Course Platform" <sheriffgaye5@gmail.com>',
      to: subscriberEmail,
      subject: "New Course Published",
      text: `A new course titled "${courseTitle}" has been published. Check it out now!`,
      html: htmlToSend,
    });

    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};