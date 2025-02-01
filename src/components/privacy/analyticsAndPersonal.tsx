import React from "react";
interface PrivacySectionProps {
  title: string;
  content: string;
  listItems?: string[];
  moreContents: string;
  content2: string;
  style?: React.CSSProperties;
}

const AnalysisSection = () => {
  return (
    <div>
      <AnalysisContent
        title="Analytics and Performance Metrics"
        content="We may leverage information generated and stored during your use of our Services for our legitimate activities, aiming to provide you with optimal service, solutions, and overall experience. These purposes encompass:"
        listItems={[
          "Delivering targeted advertising or information: Tailoring content based on your preferences and usage patterns.",

          "Conducting research and development: Striving to enhance our Services through continuous improvement.",

          "Developing and maintaining functionality: Creating new features and refining existing ones, involving activities such as statistical analysis, benchmarking, and forecasting Services.",

          "Offering location-based Services: Providing location-relevant content by collecting geo-location data for a personalized experience.",
        ]}
        moreContents="Whenever we utilize your information for our legitimate interests, we commit to processing it in a pseudonymized manner, presenting data at aggregated levels that cannot be traced back to you or any specific individual."
        content2="You retain the right to object to processing based on our legitimate activities, though it's important to note that such objections may impact our ability to provide certain Services or solutions for your benefit.
                     "
        style={{ marginTop: "2rem" }}
      />
    </div>
  );
};

const AnalysisContent: React.FC<PrivacySectionProps> = ({
  title,
  content,
  listItems,
  moreContents,
  content2,
  style,
}) => (
  <div style={style}>
    <h3 className="font-[500]">{title}</h3>
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

    <p>{moreContents}</p>
    <p>{content2}</p>
  </div>
);

export default AnalysisSection;
