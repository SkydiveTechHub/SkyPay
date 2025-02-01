import React from "react";
import { ReactElement } from "react";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import Privacy from "@/components/privacy";
import Download from "@/components/download";

const PrivacyPage = () => {
  return (
    <LandingPageLayout>
      <div style={{ background: "white" }}>
        <Privacy />
        <Download bgColor={"#28C0F11C"} />
      </div>
    </LandingPageLayout>
  );
};
PrivacyPage.getLayout = (Page: ReactElement) => {
  return <>{Page}</>;
};
export default PrivacyPage;
