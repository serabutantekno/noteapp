class emailBody {
  static emailVerification(email, uniqueString) {
    return {
      from: 'Todoapp System',
      to: email,
      subject: 'Email Verification',
      html: `Please <a href="http://localhost:3000/auth/verify/${uniqueString}"> click here </a> to verify your email. Thank you.`
    }
  }
}

const nodemailer = require('nodemailer')

/** nodemailer instance */
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_VERIFICATION_HOST,
  port: process.env.EMAIL_VERIFICATION_PORT,
  auth: {
    user: process.env.EMAIL_VERIFICATION_ADDRESS,
    pass: process.env.EMAIL_VERIFICATION_PASSWORD,
  }
})

const sendMail = (email, mailType, uniqueString) => {

  let mailOptions

  switch (mailType) {
    case "emailVerification":
      mailOptions = emailBody.emailVerification(email, uniqueString)
      break
  }

  return transport.sendMail(mailOptions)
}

module.exports = sendMail
