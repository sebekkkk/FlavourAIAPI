/**
 * Modules import
 * -Nodemailer 
 * -Config(.env fast acces)
 */

import nodemailer from "nodemailer";
import config from "../config/config.js";

/**
 * Export Async sendMail function 
 * @param recipient : recipient email
 * @param subject : subject text
 * <--------------->
 * @param text : body of email text
 * @or
 * @param html : body of email html 
 */
export const sendMail = async (recipient, subject, content) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:config.nodemailer_email_user,
            pass:config.nodemailer_pass_user
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"FlavourAI" <${config.nodemailer_email_user}>`,
            to: recipient,
            subject: subject,
            html: content
        });

        console.log(`Email sent to: ${recipient}`, info.messageId);
    } catch (error) {
        console.error(error)
    }

}