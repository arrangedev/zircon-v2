import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Img,
    Button
} from "@react-email/components";
import * as React from "react";

interface TextItem {
    label?: string;
    value: React.ReactNode;
}

interface CTA {
    message: string;
    href: string;
    buttonText: string;
}

interface EmailTemplateInterface {
    previewText: string;
    heading: string;
    body: TextItem[];
    cta?: CTA;
}

export const EmailTemplate = ({
    previewText,
    heading,
    body,
    cta,
}: EmailTemplateInterface) => {
    const previewTextMsg = previewText;

    return (
        <Html>
            <Head />
            <Preview>{previewTextMsg}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[500px]">
                        <Section className="mt-[32px] w-full flex justify-center items-center mx-auto">
                            <Img
                                width="480"
                                height="290"
                                src="https://www.vlyss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvlyss-pod.1cff21cc.png&w=3840&q=75"
                                alt="Vlyss Logo"
                            />
                        </Section>
                        <Heading className="text-black text-[26px] font-normal text-center p-0 my-[10px] mx-0">
                            {heading}
                        </Heading>
                        <Section className="mt-[20px]">
                            {body.map((item, index) => (
                                <Text key={index} className="text-center text-black text-[20px] leading-[18px]">
                                    {item.label && <strong>{item.label}</strong>}
                                    {item.label ? ": " : ""}
                                    {item.value}
                                </Text>
                            ))}
                        </Section>
                        {
                            cta &&
                            <Section className="mt-[20px] text-center">  {/* Added text-center to Section */}
                                <Text className="text-center text-black text-[20px] leading-[18px]">
                                    {cta.message}
                                </Text>
                                <Button
                                    href={cta.href}
                                    style={{
                                        backgroundColor: "#ff72fa",
                                        padding: "16px 28px", // slightly larger padding
                                        borderRadius: "8px", // slightly curved border radius
                                        color: "#ffffff", // white text
                                        fontWeight: "600", // slightly bold text
                                        fontSize: "20px", // slightly larger text
                                        display: "inline-block", // ensure the button respects text alignment
                                        marginTop: "10px", // optional: add a bit of space above the button
                                    }}
                                >
                                    {cta.buttonText}
                                </Button>
                            </Section>
                        }
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};