import React from "react";
interface PrivacySectionProps {
    title: string;
    content: string;
    listItems?: string[];
    content2: string;
    listItems2?: string[];
    moreContents: string;
    moreContents2: string;
    style?: React.CSSProperties;
  }

const YourRightAsADataS = () => {
  return (
    <div>
<PrivacySectionYour
                      title="YOUR RIGHTS AS A DATA SUBJECT"
                      content="Your personal data is safeguarded by legal rights outlined in the NDPR, granting you the following entitlements:"
                       listItems={[
                        "The right to be informed about how we utilize your personal data and access the information we hold about you.",

                        "The right to rectify or erase your personal data, or impose restrictions on its processing.",

                        "The right to object to the processing of your personal data, particularly when it is based on our legitimate interests. Please be aware that this objection may impact our ability to provide ongoing services to you.",

                        "The right to receive your information, provided to us on an automated basis, in a structured, commonly used, and machine-readable format, or transmit it directly to another organization, where technically feasible (known as \"data portability\").",

                        "If the processing of your personal data relies on your consent, the right to withdraw that consent, subject to legal or contractual restrictions.",
                        
                        "The right to object to decisions based on automated processing of your personal data, including profiling.",

                        "The right to lodge a complaint with the supervisory authority responsible for data protection matters.",
                      ]}
                      
                      content2="Please note that if you request a copy of your personal data, a fee may be applicable. To exercise any of the aforementioned rights, follow these procedures:" 

                      listItems2={["Submit your request in writing through your usual registered channel (e.g., by registered email or CRC group).",

                    "Clearly specify the right you intend to exercise.",
                    ]}
                      moreContents="For more details or to exercise your data protection rights, please contact us via TopiupNg.com"
                      moreContents2="
                      We aim to process all subject access requests within thirty (30) days. In the event of any necessary extension, we will communicate this through existing consented channels at no cost. Please be aware that during a transitional period while we update your preferences, you may still receive existing communications.
                      "
                       style={{ marginTop: "2rem" }}  />


        </div>
  );
};

const PrivacySectionYour: React.FC<PrivacySectionProps> = ({ title, content, listItems, content2, listItems2, moreContents, moreContents2, style }) => (
  <div style={style}>
    <h3 className="font-[900]">{title}</h3>
    <p>{content}</p>
    {listItems && (
      <ul className="list-disc px-7">
        {listItems?.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
          <li key={index}>{item}</li>
        ))}
        
      </ul>
    )}
<p>{content2}</p>
{listItems2 && (
  <ol className= "px-14 list-disc">
    {listItems2?.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
      <li key={index}>{item}</li>
    ))}    
  </ol>
    )}

    <p>{moreContents}</p>
    <p>{moreContents2}</p>
  </div>
);

export default YourRightAsADataS;
