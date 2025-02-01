import React from "react";
import { ReactElement } from "react";
import ForgotPass from "@/components/forgotPass";

const ForgetPassPage = () => {
  return (
    <div style={{ background: "rgba(40, 192, 241, 0.11)" }}>
      <ForgotPass />
    </div>
  );
};
ForgetPassPage.getLayout = (Page: ReactElement) => {
  return <>{Page}</>;
};
export default ForgetPassPage;
