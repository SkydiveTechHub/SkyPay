import React from "react";
import { ReactElement } from "react";
import LandingPageLayout from "@/components/layout/landingPageLayout";
import TosComp from "@/components/tos";
import Download from "@/components/download";

const TosPage = () => {
  return (
    <LandingPageLayout>
      <div style={{ background: "white" }}>
        <TosComp />
        <Download bgColor={"#28C0F11C"} />
      </div>
    </LandingPageLayout>
  );
};
TosPage.getLayout = (Page: ReactElement) => {
  return <>{Page}</>;
};
export default TosPage;
