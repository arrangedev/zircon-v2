import { Resend } from 'resend';

export const contactEmails = [
    "nathan@vlyss.com",
];
export const resend = new Resend(process.env.RESEND_KEY! as string);
export const audienceId = process.env.RESEND_AUDIENCE_ID! as string;
