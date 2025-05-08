
import { transporter } from "../../config/email";
import { SentMessageInfo } from 'nodemailer';
import { MAIL_USERNAME } from "../../config/env";
import EmailTemplateShared from "../../shared/providers/email/email";

class Mailer {
  static async SendEmail(email: string, title: string, htmlContent: string): Promise<SentMessageInfo> {
    try {
      const mailOptions = {
        from: MAIL_USERNAME,
        to: email,
        subject: title,
        html: htmlContent,
      };
      const send = await transporter.sendMail(mailOptions);
      return send;
    } catch (err) {
      console.error(err);
      throw new Error('Erro no envio do email: ' + err);
    }
  }

  static async SendTemplateEmail(email: string, title: string, templateName: string, data: any) {
    try {
      const htmlContent = await EmailTemplateShared.compileTemplate(templateName, data);
      return await this.SendEmail(email, title, htmlContent);
    } catch (error) {
      throw new Error(`Erro ao enviar email com template: ${error}`);
    }
  }


}

export default Mailer;