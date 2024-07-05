import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { IOrder } from '../models/Order';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInvoiceEmail = async (to: string, order: IOrder) => {
  const templatePath = path.join(__dirname, '../templates/invoice.ejs');

  const html = await ejs.renderFile(templatePath, {
    customerName: 'Customer Name', // Update with actual customer name
    orderItems: order.orderItems,
    grandTotal: order.grandTotal,
    contactEmail: 'support@example.com',
    companyName: 'Your Company',
    year: new Date().getFullYear(),
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Order Invoice',
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendInvoiceEmail;
