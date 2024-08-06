import { Link } from "@react-email/components";
import * as React from "react";

import { EmailTemplate } from "./components/EmailTemplate";

interface NewsletterNotificationInterface {
    email: string;
    newsletterCount: string
}

// email that notifies zircon
export const NewsLetterNotification = ({
    email,
    newsletterCount
}: NewsletterNotificationInterface) => {
    const previewText = email;
    const heading = "New Newsletter Signup!";
    const body = [
        { label: "New signup", value: email },
        { label: "Newsletter count", value: `${newsletterCount} subscribers` },
    ];

    return (
        <EmailTemplate
            previewText={previewText}
            heading={heading}
            body={body}
        />
    );
};

interface NewsletterConfirmationInterface {
    email: string;
}

// email sent to newsletter sign up
export const NewsletterConfirmation = ({ email }: NewsletterConfirmationInterface) => {
    const previewText = "You've joined the Zircon Newsletter!";
    const heading = "Welcome onboard to the Zircon Newsletter!";
    const body = [
        {
            value: (
                <>
                    We&apos;re so happy you decided to join the conversation on all things Zircon!
                    Don&apos;t worry, we don&apos;t plan on spamming you. This newsletter is simply an
                    avenue through which we publicize announcements and, occasionally, our
                    thoughts on the state of technology, design, and culture.
                </>
            ),
        },
        {
            value: (
                <>
                    Want to become a Zircon customer? Book a meeting with the Zircon team
                    using <Link href="https://cal.com/hello-zircon/15min">this link</Link>.
                </>
            ),
        },
        {
            value: (
                <>
                    If you ever want to unsubscribe from the Zircon Newsletter, simply click{" "}
                    <Link href={`https://zircon.com/api/newsletter?=${email}`}>this link</Link>.
                </>
            ),
        },
    ];

    return (
        <EmailTemplate
            previewText={previewText}
            heading={heading}
            body={body}
        />
    );
};

export const NewsletterUnsubscribe = () => {
    const previewText = "You're unsubscribed";
    const heading = "We're sorry to see you go!"
    const body = [
        { value: "We thank you for being a part of the Zircon Newsletter, and we're sorry to see you go" },
        { value: <>Please feel free to rejoin at any time on <Link href="https://zircon.com#newsletter">our website</Link>.</> }
    ];

    return (
        <EmailTemplate 
            previewText={previewText}
            heading={heading}
            body={body}
        />
    );
};