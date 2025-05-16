const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail
    pass: 'your-app-password' // Replace with your Gmail app password
  }
});

// Send booking confirmation emails
exports.sendBookingEmails = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const booking = snap.data();
    const bookingId = context.params.bookingId;

    // Format date and time
    const date = booking.date.toDate();
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email to customer
    const customerMailOptions = {
      from: 'Devin Soup <your-email@gmail.com>',
      to: booking.email,
      subject: 'Booking Confirmation - Devin Soup',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.name},</p>
        <p>Your appointment has been confirmed for:</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>Devin Soup</p>
      `
    };

    // Email to barber
    const barberMailOptions = {
      from: 'Booking System <your-email@gmail.com>',
      to: booking.barberEmail,
      subject: 'New Booking Notification',
      html: `
        <h1>New Booking</h1>
        <p>You have a new booking:</p>
        <p><strong>Customer:</strong> ${booking.name}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Contact:</strong> ${booking.email} / ${booking.phone}</p>
      `
    };

    try {
      await transporter.sendMail(customerMailOptions);
      await transporter.sendMail(barberMailOptions);
      console.log('Emails sent successfully for booking:', bookingId);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  });

// Send reminder emails 2 hours before appointment
exports.sendReminderEmails = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const bookingsRef = admin.firestore().collection('bookings');
    const snapshot = await bookingsRef
      .where('date', '>=', now)
      .where('date', '<=', twoHoursFromNow)
      .where('reminderSent', '==', false)
      .get();

    const emails = [];

    snapshot.forEach(doc => {
      const booking = doc.data();
      const date = booking.date.toDate();
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Reminder to customer
      emails.push(
        transporter.sendMail({
          from: 'Devin Soup <your-email@gmail.com>',
          to: booking.email,
          subject: 'Appointment Reminder - Devin Soup',
          html: `
            <h1>Appointment Reminder</h1>
            <p>Dear ${booking.name},</p>
            <p>This is a reminder that you have an appointment in 2 hours:</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>Devin Soup</p>
          `
        })
      );

      // Reminder to barber
      emails.push(
        transporter.sendMail({
          from: 'Booking System <your-email@gmail.com>',
          to: booking.barberEmail,
          subject: 'Appointment Reminder',
          html: `
            <h1>Appointment Reminder</h1>
            <p>You have an appointment in 2 hours:</p>
            <p><strong>Customer:</strong> ${booking.name}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Contact:</strong> ${booking.email} / ${booking.phone}</p>
          `
        })
      );

      // Mark reminder as sent
      doc.ref.update({ reminderSent: true });
    });

    try {
      await Promise.all(emails);
      console.log('Reminder emails sent successfully');
    } catch (error) {
      console.error('Error sending reminder emails:', error);
    }
  }); 