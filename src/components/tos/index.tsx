import React from "react";
import TosSection5 from "./tosSection5";

interface TosSectionProps {
  title: string;
  content: string;
  listItems?: string[];
  moreContents: string;
  listType?: "bulleted" | "numbered";
  style?: React.CSSProperties;
}
const TosComp = () => {
  return (
    <div>
      <section
        className="bg-[#fff] text-[#4F4F4F] font-[inter] font-[500] max-w-[1440px] mx-auto md:py-[3rem] py-[2rem] container"
        data-aos="fade-up"
      >
        <h2 className="lg:mt-[150px] mt-[4rem] mb-[3rem] text-center text-[#020d1e] text-[32px] md:text-[40px] font-[900] leading-[44px]">
          Terms of Service Agreement
        </h2>
        <p className=" mb-6">
          This page contains the current corporate Terms of Service for the
          products and services available on Skypay, and notices for our
          customers.
          <br />
          To view the documents presented on this page, kindly scroll from the
          beginning to the end.
        </p>
        <div>
          <p className="font-[900] mb-6">
            Last Revised: 10/11/2023
            <br />
            PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY, AS IT
            CONTAINS IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS AND
            REMEDIES.
          </p>

          <TosSection
            title="1. OVERVIEW"
            content={`This "Terms of Service Agreement \" (referred to as the "Agreement") is a contract entered into Skypay and between Skypay.com and users and becomes effective upon your use of this website ("Site") or mobile app or when you electronically accept it. The Agreement outlines the general terms and conditions for using the Site/APP, along with the products and services you purchase or access through it (collectively referred to as the “Services”). Specific Services have their own Agreements and additional policies, which are in addition to this Agreement. If there is ever a conflict between the terms of a Services Agreement and this Agreement, the terms of the relevant Services Agreement will take precedence. In this Agreement, “we,” “us,” or “our” denotes Skypay, while “you,” “your,” “User,” or “customer” refers to any individual or entity that accepts this Agreement, has account access, or uses the Services. This Agreement does not grant any rights or benefits to third parties.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="2. MODIFICATION OF AGREEMENT, SITE OR SERVICES"
            content={`Skypay reserves the exclusive right to make alterations or adjustments to this Agreement, along with any integrated policies or agreements, at its sole discretion. These alterations or adjustments will take effect immediately upon being posted on this Site/APP. If you continue to use this Site/APP or the Services after such changes or modifications have been applied, it will signify your acceptance of the most recent version of this Agreement. If you do not agree with the latest version of this Agreement, please refrain from using or continuing to use this Site/APP or the Services. Furthermore, Skypay may periodically inform you of these changes or modifications through email. Thus, it's crucial to keep your account information up to date. Skypay cannot be held liable or responsible if you fail to receive email notifications due to an inaccurate email address. Additionally, 
      Skypay RETAINS THE RIGHT TO ADJUST, MODIFY OR DISCONTINUE ANY FACET OF THIS SITE/APP OR THE SERVICES, WHICH INCLUDES, BUT IS NOT LIMITED TO, PRICES AND FEES AT ANY TIME.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="3. ADEQUACY; AUTHORITY"
            content={`This Site/APP and the Services are exclusively for individuals or entities ("Users") capable of creating legally binding contracts according to the law. By using this Site/APP or the Services, you confirm that you are:
    `}
            listItems={[
              "A minimum of eighteen (18) years old.",

              "Legally qualified to enter into contracts as per applicable law.",

              'Not prohibited by the laws of Nigeria or any other relevant jurisdiction from purchasing or receiving the Services. If you are agreeing to this Agreement on behalf of a business entity, you assure that you have the legal authority to bind that corporate entity to the terms and conditions in this Agreement. In such a case, the terms "you," "your," "User," or "customer" refer to the corporate entity. If, after you electronically accept this Agreement, Skypay discovers that you lack the legal authority to bind the corporate entity, you will be personally responsible for fulfilling the obligations outlined in this Agreement, including, but not limited to, payment responsibilities. Skypay will not be held liable for any losses or damages resulting from Skypay\'s reliance on any instruction, notice, document, or communication that Skypay reasonably believes to be legitimate and originating from an authorized representative of your corporate entity. In cases where the authenticity of any such instruction, notice, document, or communication is reasonably doubted, Skypay reserves the right (but has no obligation) to request further authentication from you. You also agree to abide by the terms of this Agreement for transactions conducted by you, anyone acting on your behalf, and anyone who uses your account or the Services, whether or not authorized by you.',
            ]}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="4. YOUR ACCOUNT"
            content={`To access certain features on this Site/APP or utilize specific Services, you'll need to create an Account. When creating your Account, you assure Skypay that all the information you provide is accurate, up-to-date, and complete. It's your responsibility to maintain the accuracy and completeness of your Account details. If Skypay suspects that your Account information is false, inaccurate, outdated, or incomplete, it reserves the right to suspend or terminate your Account at its sole discretion. You are the only one responsible for any activity on your Account, whether or not authorized by you, and you must safeguard your Account information, including your customer number/login, password, and Payment Method(s) (as defined below). For security reasons, Skypay suggests changing your password at least every six (6) months. If there's a security breach or any unauthorized use of your Account, you must promptly inform Skypay. Skypay is not responsible for any losses resulting from unauthorized Account use.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          />

          <TosSection5 />

          <TosSection
            title="6. USER CONTENT"
            content={`This Site and its Services, including those hosted with Skypay, offer features for Users to create and share User Submissions, such as ideas, opinions, and content, and User Content, which includes literary, artistic, and other works. When posting such content, Users must ensure they have the necessary rights and permissions to do so and that it doesn't infringe on third-party rights. Skypay asserts exclusive ownership of User Submissions posted on the site and can use them freely without compensation. For other User Content, Users grant Skypay a broad license to use and distribute the content on the site and for promoting Skypay’s business. These licenses are generally perpetual, but Skypay won't use "private" or "password protected" content for promotional purposes. If you have content hosted by Skypay, you retain ownership rights in that content.`}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="7. AVAILABILITY OF WEBSITE/SERVICES:"
            content={`This agreement outlines that the provider will strive to keep the Site/APP and Services available 24/7, but acknowledges that various factors like equipment issues, maintenance, or unforeseen events may disrupt access. The provider disclaims liability for such interruptions.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />
          <TosSection
            title="8. MONITORING OF CONTENT; ACCOUNT TERMINATION POLICY: "
            content={`Skypay generally doesn't pre-screen user content but reserves the right to remove content or terminate access for violations of the agreement, as determined at their discretion. They may also do so if a user is a repeat offender, and they can remove data from their servers.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="9. DISCONTINUED SERVICES; END OF LIFE POLICY:"
            content={`Skypay can stop offering Services or features at any time. Skypay aims to notify users in advance of discontinuation and offer options for migration, prorated credits, or refunds. Skypay may also migrate users to an updated version without notice, and aren't liable for any disruptions.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="10. BETTER SERVICES:"
            content={` Better Services are pre-release versions with potential issues, Skypay can modify or discontinue them. Users are encouraged to provide feedback and must keep it confidential. Any intellectual property from user feedback belongs to Skypay. Skypay may disclaims all warranties for Better Services and may use user feedback for various purposes, including product and services development.`}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="
      11. FEES AND PAYMENTS"
            content={`You agree that your Payment Method may be charged by our entity. If, during your purchase, your payment was identified as being processed in the available banks provided to you, your transaction will be processed by Skypay.(A) GENERAL TERMS, INCLUDING AUTOMATIC RENEWAL TERMS
      Payment Due at Time of Order; Non-Refundable. You agree to pay all amounts due for Services at the time you order them. All amounts are non-refundable especially after services rendered or product bought successfully. 
      Price Changes. Skypay reserves the right to change its prices and fees at any time, and such changes shall either be posted online at this Site/APP and effective immediately without need for further notice to you or notice shall be provided to you by email. If you have purchased or obtained Services for a period of months or years, changes in prices and fees shall be effective when the Services in question come up for renewal as further described below.
      Payment Types. Except as prohibited in any product-specific agreement, there will be needed to fund your wallet to perform successful transactions by using any of the following “Payment Methods”:`}
            listItems={[
              " Valid credit card",

              "Electronic payment from your personal or business checking account, as appropriate",

              "PayPal",

              "International Payment Option",

              "Via in-store credit balances, if applicable;",
              "Or Any other method you use to pay for Services as determined by Skypay in its sole and absolute discretion, each a “Payment Method”. ",
            ]}
            listType="numbered"
            moreContents="The Skypay feature automatically places an order for the applicable Service and charges the default Checkout Payment Method for your Account. Confirmation of that order will be sent to the email address on file for your Account. Your Payment Method on file must be kept valid if you have any active Services in your Account. 
      Auto-Renewal Terms. Other than as required by applicable law, Skypay does not retain hard copies or electronic versions of mandate, standing order or standing instruction forms and/or any signed consents relating to your usage of our automatic renewal services, and we are therefore unable to provide any such document upon request. You may view or change your automatic renewal settings at any time by logging into your Skypay account.
      "
            style={{ marginTop: "2rem" }}
          />
          <TosSection
            title="12. ADDITIONAL RESERVATION OF RIGHTS"
            content={`Skypay expressly reserves the right to deny, cancel, terminate, suspend, lock, or modify access to (or control of) any Account or Services (including the right to cancel or transfer any domain name registration) for any reason (as determined by Skypay in its sole and absolute discretion), including but not limited to the following: 
    `}
            listItems={[
              "To correct mistakes made by Skypay in offering or delivering any Services (including any domain name registration)",

              "To protect the integrity and stability of, and correct mistakes made by, any domain name registry or registrar.",

              "To assist with our fraud and abuse detection and prevention efforts.",

              "To comply with court orders against you and/or your domain name or website and applicable local, state, national and international laws, rules and regulations.",

              "To comply with requests of law enforcement, including subpoena requests.",

              "To comply with any dispute resolution process.",

              "To defend any legal action or threatened legal action without consideration for whether such legal action or threatened legal action is eventually determined to be with or without merit.",

              "To avoid any civil or criminal liability on the part of Skypay, its officers, directors, employees and agents, as well as Skypay’s affiliates, including, but not limited to, instances where you have sued or threatened to sue Skypay.",

              "To respond to an excessive amount of complaints related in any way to your Account, domain name(s), or content on your website that could result in damage to Skypay’s business, operations, reputation or shareholders.",

              "To respond to an excessive amount of complaints related in any way to your Account, domain name(s), or content on your website that could result in damage to Skypay’s business, operations, reputation or shareholders.",
            ]}
            listType="numbered"
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="13. NO SPAM POLICY"
            content={`We maintain a strict "No Spam" policy and do not tolerate the transmission of unsolicited messages. Our web servers are continuously monitored to detect any signs of spam, and we have established a dedicated spam abuse complaint center to handle reports of potential spam abuse. If any of our customers are suspected of using our products and services for spamming purposes, a thorough investigation will be conducted. If we find evidence of spam, appropriate actions will be taken to address the issue.
      For clarity, we define spam as the sending of Unsolicited Commercial Email (UCE), Unsolicited Bulk Email (UBE), or Unsolicited Facsimiles (Fax). This includes the transmission of email or facsimiles to recipients for advertising or other purposes without obtaining prior informed consent to receive such communications. Examples of spam may include, but are not limited to:
    `}
            listItems={[
              "Email Messages",
              "Newsgroup postings",
              "Windows system messages",
              'Pop-up messages (referred to as "adware" or "spyware" messages)',
              "Instant messages (using AOL, MSN, Yahoo, or other instant messenger programs)",
              "Online chat room advertisements",
              "Guestbook or Website Forum postings",
              "Facsimile solicitations",
              "Text/SMS messages",
            ]}
            moreContents="We are committed to maintaining a spam-free environment for our users and will take the necessary steps to enforce this policy."
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="16. TRADEMARK AND COPYRIGHT CLAIMS"
            content={`Skypay is committed to safeguarding intellectual property rights. If you wish to file;
    `}
            listItems={[
              "A trademark claim for the infringement of a mark that you possess a valid, registered trademark or service mark for,",
              "A copyright claim for material that you hold a legitimate copyright for, please consult the Skypay Trademark section for guidance.",
            ]}
            moreContents=""
            listType="numbered"
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="17. LINKS TO THIRD-PARTY WEBSITES"
            content={`This Site/APP and the Services available on it may include links to third-party websites not owned or controlled by Skypay. Skypay holds no responsibility for the content, terms, conditions, privacy policies, or practices of these third-party websites. Furthermore, Skypay does not engage in content censorship or editing on these third-party websites. When you use this Site or the Services offered on it, you explicitly absolve Skypay from any liability related to your usage of any third-party website. It is advisable for you to exercise caution when leaving this Site or the Services provided on it and to review the terms and conditions, privacy policies, and other governing documents of any other website you may choose to visit.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="18. DISCLAIMER OF REPRESENTATIONS AND WARRANTIES"
            content={`Your use of this Site/APP and its services is at your own risk, provided "as is," "as available," and "with all faults." Skypay and its personnel disclaim all warranties, including implied warranties of title, merchantability, fitness for a particular purpose, and non-infringement. They do not vouch for the accuracy, completeness, or content of the Site, linked sites, or their services, and assume no liability. Additionally, auto-generated outputs have not been validated for accuracy or intellectual property clearance, and Skypay offers no warranty in this regard. No information or advice, oral or written, from Skypay or its agents constitutes legal or financial advice or warranties about the Site or services. This disclaimer of warranties remains in effect even after this Agreement's termination and applies to the fullest extent permitted by law.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="19. SUBSEQUENT PARTIES AND TRANSFEREES"
            content={`This Agreement will be legally binding on the involved parties and will also benefit their heirs, successors, and assignees.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="20. TITLES AND HEADINGS"
            content={`The titles and headings in this Agreement are provided for convenience and reference purposes only and should not be used to alter or interpret the agreement between the parties as otherwise stated herein. Each commitment and arrangement in this Agreement should be considered as a distinct and autonomous commitment or arrangement for all intents and purposes. If a court with the appropriate jurisdiction deems any provision (or a portion thereof) of this Agreement to be unlawful, void, or unenforceable, the remaining provisions (or portions of provisions) of this Agreement will remain unaffected and will be considered valid and enforceable to the maximum extent allowed by the law.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="21. CONTACT INFORMATION"
            content={`If you have any inquiries or concerns regarding this Agreement, please feel free to reach out to us via email or traditional mail using the following contact information:`}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />

          <TosSection
            title="Skypay is a registered trademark of CDLP HUB LTD."
            content={`No 32, Road 19, Housing Corporation Estate, General Gas, Akobo, Ibadan, Nigeria.
    `}
            listItems={undefined}
            moreContents=""
            style={{ marginTop: "2rem" }}
          />
        </div>
      </section>
    </div>
  );
};

const TosSection: React.FC<TosSectionProps> = ({
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

export default TosComp;
