import { Module } from '@nestjs/common';
import Sib = require('sib-api-v3-sdk');
@Module({})
export class SendMailModule {
  sendMail(toMail: string, subject: string, mailTemplate: string) {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    console.log(process.env.EMAIL_ID);

    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      email: process.env.EMAIL_ID,
    };
    const receivers = [
      {
        email: toMail,
      },
    ];

    return tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      htmlContent: mailTemplate,
    });
  }
}

export const sendMailModule = new SendMailModule();
