import React from "react";

import PrivacySectionHowData from "./howWeUsePersonalD";
import AnalysisSection from "./analyticsAndPersonal";
import YourRightAsADataS from "./yourRightAsADataS";

interface PrivacySectionProps {
  title: string;
  content: string;
  listItems?: string[];
  moreContents: string;
  listType?: "bulleted" | "numbered";
  style?: React.CSSProperties;
}

const PrivacyPolicy = () => {
  return (
    <div>
      <section
        className="bg-[#fff] font-[inter] font-[500] max-w-[1440px] mx-auto md:py-[3rem] py-[2rem] container"
        data-aos="fade-up"
      >
        <h2 className="lg:mt-[150px] mt-[4rem] mb-[3rem] text-center text-[#020d1e] text-[32px] md:text-[40px] font-[800] leading-[44px]">
          Privacy Policy
        </h2>
        <p className="text-[#4F4F4F] mb-6">
          This page presents the up-to-date Privacy Policy for TopiupNg’s
          products and services, along with important notices for our customers.
          Please scroll through the entire pages to access the provided
          document.
        </p>
        <div className="text-[#4F4F4F] flex flex-col justify-center">
          <PrivacySection
            title="ABSTRACT"
            content="This privacy policy, referred to as the 'Policy,' pertains to the websites and mobile applications, collectively known as the 'Sites' provided by TopiupNg. In this document, when mentioning 'AutoBiz,' 'we,' 'us,' or 'our,' we are referring to TopiupNg and its products and services. The Policy outlines our data protection practices across our Sites, products, and subscriber-based services ('Services'). It encompasses the personal data we collect, our methods of collection, the use of personal data, and the procedures for sharing such data with third parties."
            listItems={[
              "The Sites covered by this Policy include our existing websites, mobile applications, and any additional websites and mobile applications created and managed by TopiupNg, with URL; TopiupNg.com",

              "Recognizing the trust you place in us and understanding the paramount importance of your privacy, we adhere to the highest standards to ensure secure transactions and the confidentiality of customer information.",

              "By accessing the Sites, which includes all websites and mobile applications that may be added or removed over time, you agree to the terms and conditions outlined in this Privacy Policy. If you do not wish for your personal data to be processed in accordance with this policy, please refrain from using or accessing the Sites or the Services",

              "We retain the right, at our sole discretion, to modify and update this Policy periodically. Therefore, we encourage you to review the current version of this Policy each time you revisit the Sites.",
            ]}
            moreContents=""
          />
          <PrivacySection
            title="ADEQUACY"
            content="By utilizing the Sites and Services and furnishing your personal data, you explicitly authorize the gathering and utilization of the information you provide to us, consistent with the provisions outlined in this Policy. This includes, but is not restricted to, your agreement to share your personal data in accordance with the terms stipulated in this Policy. In the event that we opt to modify this Policy, such changes will be promptly communicated on this page to ensure your ongoing awareness of the nature of information we gather, how it is utilized, and the circumstances under which it may be disclosed. If you do not consent/agree to the utilization of personal data as delineated in this Policy, kindly refrain from using or accessing the Sites or Services."
            listItems={undefined}
            moreContents=""
          />
          <PrivacySection
            title="CONSENT/AGREEMENT"
            content="The Sites and Services are designed exclusively for individuals who, if they are natural persons and are aged eighteen (18) years or older. Any registration, use, or access by a natural person under eighteen (18) is considered unauthorized, unlicensed, and a violation of this Policy. This includes, but is not restricted to, your agreement to share your personal data in accordance with the terms stipulated in this Policy. In the event that we opt to modify this Policy, such changes will be promptly communicated on this page to ensure your ongoing awareness of the nature of information we gather, how it is utilized, and the circumstances under which it may be disclosed. If you do not consent/agree to the utilization of personal data as delineated in this Policy, kindly refrain from using or accessing the Sites or Services."
            listItems={undefined}
            moreContents=""
          />
          <PrivacySection
            title="LEGITIMATE GROUNDS FOR THE COLLECTION AND PROCESSING OF PERSONAL DATA"
            content="In adherence to the stipulations of the Nigeria Data Protection Regulation (NDPR), the processing of personal data necessitates a legal foundation. Aligning with the provisions of the NDPR, we undertake the processing of your personal data based on the following legal grounds:"
            listItems={[
              "Consent: Your agreement is sought for the processing of personal data, granted through your ongoing use of the Services and the Sites, and pertains to specific purposes.",

              "Performance of a Contract: Processing is undertaken to fulfill contractual obligations between us or a contract in which you are a party, including necessary steps prior to entering such an agreement.",

              "Legal Obligation: Certain personal data retention, particularly account opening information, is mandated by law even after the cessation of business relations.",

              "Legitimate Interest: Processing is conducted to safeguard the vital interests of other data subjects and to achieve the objectives of our business. This includes preventing fraud, money laundering, verifying the identity of data subjects, ensuring customer and business protection, understanding user interactions with our Sites, providing relevant communications, and assessing the effectiveness of promotional campaigns and advertising.",

              "Public Interest: Processing is deemed necessary for the performance of tasks carried out in the public interest or in the exercise of an official public mandate entrusted to us.",
            ]}
            listType="numbered"
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="DATA WE MIGHT GATHER FROM YOU"
            content="When utilizing the Sites or Services, we systematically gather and retain the personal data voluntarily supplied by you on various occasions. In this context, personal data or information encompasses any form of information pertaining to an identified or identifiable natural person, distinguishable by factors such as:"
            listItems={[
              "Full name,",

              "Email address,",

              "Location,",

              "Phone number",
              "Other unique information requested.",
            ]}
            moreContents="To utilize our Services, we may gather personal data such as your complete legal names, gender, email address, mailing address, telephone number, interests, feedback and survey responses, preferences for receiving marketing information from us and our third parties, and your communication preferences, among others.
                      The main objective behind collecting the aforementioned personal data is to offer you a secure, efficient, seamless, and tailored experience. This enables us to deliver Services and features that align with your likely requirements, while also customizing the Sites to enhance the safety and ease of your experience.
                      "
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="HOW WE GATHER DATA"
            content="We gather information directly provided by you, such as during registration, creating an account by subscribing to a plan, pick a domain name, engaging in interactive platform features and templates, posting on our Customer Resolution Channel (CRC) group, seeking customer support, making inquiries, and communicating via email, phone, or post. Additionally, if you partially complete or abandon inputted information on the Sites, we may use this data to remind you to finalize the details.
                      When you access the TopiupNg website your computer is assigned a domain name and internet protocol (IP) address. While the domain name and IP address do not reveal personal details beyond the accessed IP address, we can observe your browsing patterns and technical data about your accessing device through cookies, server logs, and similar technologies. You have the option to set your cookie preferences on our websites.
                      Technical data may also be collected from third parties/public sources, such as analytics providers, advertising networks, and search information providers. Contact, financial, and transaction data may be obtained from providers of technical, payment, credit referencing, and delivery services, both within and outside Nigeria. We employ third-party service providers to safeguard information related to financial crime, fraud, sanctions, and politically exposed persons.
                      We do not claim ownership of provided personal data and will store it only for a reasonable period, taking measures to secure it against foreseeable hazards and breaches. This includes protection against theft, cyber-attacks, viral attacks, unauthorized dissemination, manipulation, and damage from natural elements like rain or fire.
                      We commit not to sell, share, transfer, or rent out personal information in ways other than those disclosed in this Policy and our terms and conditions of use. Generic information not linked to personal identification may be shared with business partners, trusted affiliates, and advertisers."
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="PROVIDING US WITH INFORMATION WITH OTHERS"
            content="If you give us personal data regarding someone else, it is your responsibility to ensure that you have given the necessary notices and obtained explicit consent from the individual to provide us with their personal data. You should also clarify to them how we collect, use, disclose, and retain their personal data or direct them to read our Policy."
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySectionHowData />

          <PrivacySection
            title="SECURITY ASSURANCE"
            content="We may handle your personal data under the premise of having a legitimate interest, primarily for the purpose of preventing fraud and money laundering, as well as verifying your identity. This is crucial for safeguarding our business and ensuring compliance with relevant laws. Moreover, such processing aligns with the contractual obligations associated with the services you've sought.
                      To enhance fraud prevention measures, we may conduct checks using a fraud prevention database. In the event of false or inaccurate information being provided or if fraud is detected, pertinent details may be shared with the lawful enforcement agencies that may access and utilize this information."
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />
          <AnalysisSection />
          <YourRightAsADataS />

          <PrivacySection
            title="ACCURACY OF YOUR DATA"
            content="Maintaining the accuracy and currency of the personal data TopiupNg possesses about you is crucial. Please notify TopiupNg promptly of any changes to your personal data throughout our association. Should you wish to rectify any information, kindly reach out to us to exercise your right of rectification."
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="SECURITY OF YOUR DATA"
            content="To ensure the security of your personal data, we have implemented effective organizational and technical measures. These measures involve storing data on a dedicated and secure server equipped with a minimum of 256-bit encryption. Access to your personal data is restricted to specific employees, and our internal information technology systems are carefully secured. Additionally, we have established procedures to address any suspected data breaches.
                      In the rare occurrence of a data breach, TopiupNg will promptly take action to minimize any potential loss or destruction of data. If deemed necessary, we will notify you and the relevant authorities of such a breach."
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="PRIVACY/CONFIDENTIALITY"
            content="You acknowledge that the sites may contain information marked as confidential by us, and you agree not to disclose such information without our prior written consent. Your information is treated as confidential and will not be shared with any third party unless legally required by the appropriate authorities. We do not sell, share, or rent your personal data to third parties, and your email address will not be used for unsolicited mail. Any emails sent by us will only be related to the agreed-upon services.
                      We implement necessary precautions to safeguard your personal information both online and offline. It is crucial for you to guard against unauthorized access to your password, mobile phone, or computer. Make sure to log off from the Sites when using a shared phone/computer. Additionally, we secure your personal data offline, limiting access to employees, agents, partners, and relevant third parties who we reasonably believe need the information to provide services to you.
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="COOKIES"
            content="We use data collection devices such as ‘cookies’ on certain pages of the Sites. Cookies are small files stored on your hard drive that assist us in providing Services customized to your requirements and tastes. We also offer certain features that are only available through the use of a ‘cookie’. Cookies can also help us provide information, which is targeted to your interests. Cookies may be used whether you choose to register with Us or not.
                      We also use cookies to allow you to enter your password less frequently during a session. Most cookies are ‘session cookies’, meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline our cookies if your browser permits, although in that case you may not be able to use certain features on the Sites and you may be required to re-enter your password more frequently during a session. A cookie cannot read data off your hard disk or read cookie files created by other sites. Use of a cookie is in no way linked to any personally identifiable information while on the Sites. Once you close your browser, the cookie simply terminates. For instance, by setting a cookie on your browser, you would not have to log in a password more than once, thereby saving time while on the Sites.
                      You can choose whether to accept cookies by changing the settings of your browser. You can reset your browser to refuse all cookies or allow your browser to show you when a cookie is being sent. If you reject the cookies on the Sites, you may still be able to use the Sites, but it shall be limited to certain minimal functionality. The only drawback to this is that you may be limited to some areas of Sites or limited to certain functions of the Sites.
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="DISCLAIMER"
            content="We are committed to ensuring the security of your information through appropriate technical and organizational measures, guarding against unauthorized or unlawful processing, as well as accidental loss, destruction, or damage. While we strive to protect your personal data, we cannot guarantee its security when transmitted to other websites through the internet or similar connections. If you have been provided with a password to access specific areas of the Sites, please ensure its confidentiality, as we will not share this password with anyone. As a user of our services, you acknowledge and agree that the responsibility and risk associated with safeguarding your account rest entirely with you. Under no circumstances should you disclose your password to anyone, nor permit anyone else to use your account.
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="UPDATES TO THE PRIVACY POLICY"
            content="In our continuous efforts to enhance our Sites and Services, we may find it necessary to make changes to this Policy. Notifications of significant changes will be communicated through methods such as notices on our websites or emails sent to you (if you have provided your email details), as required by applicable law. We reserve the right to update this Policy at our discretion without prior notice, and your ongoing use of the Sites will indicate your acceptance of any modifications to these terms.
                      The latest terms will be available on our website and mobile Application, and it is your responsibility to periodically review this Privacy Policy for any updates.
                      If, at any point, you believe that we have not handled your personal data in line with this Policy, please contact us. We have designated Customer Support to address such concerns, manage inquiries related to this Policy, and handle requests regarding the exercise of your rights. For any concerns or questions, please reach out to us using the provided contact details below.
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="CONTACT"
            content="No 32, Road 19, Housing Corporation Estate, General-Gas, Akobo, Ibadan.Oyo State
                      Should you have any inquiries, feedback, or requests concerning your privacy and rights, kindly inform us of how we can assist you.
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <PrivacySection
            title="Last Updated: November 10, 2023."
            content="
                      "
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />
        </div>
      </section>
    </div>
  );
};

const PrivacySection: React.FC<PrivacySectionProps> = ({
  title,
  content,
  listItems,
  moreContents,
  listType = "bulleted",
  style,
}) => (
  <div style={style}>
    <h3 className="font-[900]">{title}</h3>
    <p>{content}</p>
    {listItems && (
      <ul
        className={`${
          listType === "numbered" ? "list-decimal" : "list-disc"
        } px-7`}
      >
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
    <p>{moreContents}</p>
  </div>
);

export default PrivacyPolicy;
