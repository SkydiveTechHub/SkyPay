import React from "react";
interface PrivacySectionProps {
  title: string;
  content: string;
  listItems?: string[];
  listItems2?: string[];
  moreContents: string;
  style?: React.CSSProperties;
}

const PrivacySectionHowData = () => {
  return (
    <div>
      {/* <section className="bg-[#fff] font-[inter] font-[500] max-w-[1440px] mx-auto md:py-[3rem] py-[2rem] container">
        <h2 className="lg:mt-[150px] mt-[4rem] mb-[3rem] text-center text-[#020d1e] text-[40px] font-[800] leading-[44px]">
          Privacy Policy
        </h2>
        <p className="text-[#4F4F4F] mb-6">
          This page presents the up-to-date Privacy Policy for TopiupNg’s products and services, along with important notices for our customers. Please scroll through the entire pages to access the provided document.
        </p>
        <div className="text-[#4F4F4F] flex flex-col justify-center"> */}

      <PrivacySectionHow
        title="HOW WE USE YOUR PERSONAL DATA"
        content="The objective behind collecting your personal data is to provide you with an efficient, enjoyable, secure, and seamless customer experience. Your personal data may be utilized for the following purposes:"
        listItems={[
          "Providing the requested services and support to you.",

          "Facilitating transactions and sending notifications.",

          "Verifying your identity.",

          "Resolving disputes and troubleshooting problems.",

          "Managing risk, detecting, preventing, and/or remediating fraud or other potentially prohibited or illegal activities.",

          "Detecting, preventing, or remediating violations of policies or applicable user agreements.",

          "Improving services by implementing aggregate customer preferences.",

          "Managing and protecting our information technology infrastructure.",

          "Contacting you at any time through your provided telephone number, email address, or other contact details.",

          "Notifying you about activities on your account, troubleshooting problems with your account, and collecting fees or monies owed.",

          "Monitoring traffic patterns and usage of the Sites to help improve the Sites' design and layout.",

          "Recording and storing communications made via phone, Skype, or the website chat function.",

          "Personalizing your experience on our Sites or in communications/advertising.",

          "Providing customer service, including responding to your inquiries and fulfilling any requests for information.",

          "Sending you important information regarding the services and/or other technical notices, updates, security alerts, support, and administrative messages.",

          "Polling your opinions through surveys or questionnaires.",

          "As deemed necessary or appropriate by TopiupNg:",
        ]}
        listItems2={[
          "To comply with a legal obligation, where processing is necessary for TopiupNg to comply with the law.",

          "To enforce or apply this Policy.",
          "To protect TopiupNg’s legitimate interests, privacy, property, or safety, and/or those of a third party, as long as your rights do not override those interests.",
        ]}
        moreContents="Furthermore, we may monitor and record our communications with you, including emails and phone conversations, for training, quality assurance purposes, and to meet our legal and regulatory obligations in general.
                      "
        style={{ marginTop: "2rem" }}
      />
    </div>
  );
};

const PrivacySectionHow: React.FC<PrivacySectionProps> = ({
  title,
  content,
  listItems,
  listItems2,
  moreContents,
  style,
}) => (
  <div style={style}>
    <h3 className="font-[900]">{title}</h3>
    <p>{content}</p>
    {listItems && (
      <ul className="list-decimal px-7">
        {listItems?.map(
          (
            item:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              // | React.PromiseLikeOfReactNode
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>
    )}

    {listItems2 && (
      <ol className="px-14 list-disc">
        {listItems2?.map(
          (
            item:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              // | React.PromiseLikeOfReactNode
              | null
              | undefined,
            index: React.Key | null | undefined
          ) => (
            <li key={index}>{item}</li>
          )
        )}
      </ol>
    )}

    <p>{moreContents}</p>
  </div>
);

export default PrivacySectionHowData;
