import BasicCard from "@/components/dashboard/card";
import React, { useState } from "react";
import ProfileSetting from "./profile-setting";
import PasswordReset from "./password-reset";
import NotificationPage from "./notification";
import { Grid, Typography } from "@mui/material";

const index = () => {
  const [page, setPage] = useState<"profile" | "reset" | "notify">("profile");
  return (
    <Grid container>
      <Grid item sm={12} lg={12}>
        <Typography
          sx={{
            color: "#070707",
            fontWeight: "700",
            fontFamily: "Inter",
            marginBottom: "24px",
            fontSize: "24px",
          }}
        >
          Settings
        </Typography>
        <BasicCard>
          <div className="space-x-6 mb-8 px-6">
            <button
              onClick={() => setPage("profile")}
              className={`border-b px-3 py-2 font-int font-[500] border-[#28C0F1] text-[#28C0F1] text-[18px] ${
                page === "profile"
                  ? "text-[#28C0F1] border-[#28C0F1] font-[700]"
                  : "font-[500] border-[#717B8C] text-[#717B8C]"
              } `}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setPage("reset")}
              className={`border-b px-3 py-2 font-int font-[500] border-[#28C0F1] text-[#28C0F1] text-[18px] ${
                page === "reset"
                  ? "text-[#28C0F1] border-[#28C0F1] font-[700]"
                  : "font-[500] border-[#717B8C] text-[#717B8C]"
              } `}
            >
              Password Reset
            </button>
            <button
              onClick={() => setPage("notify")}
              className={`border-b px-3 py-2 font-int font-[500] border-[#28C0F1] text-[#28C0F1] text-[18px] ${
                page === "notify"
                  ? "text-[#28C0F1] border-[#28C0F1] font-[700]"
                  : "font-[500] border-[#717B8C] text-[#717B8C]"
              } `}
            >
              Notification
            </button>
          </div>

          {page === "profile" && <ProfileSetting />}
          {page === "reset" && <PasswordReset />}
          {page === "notify" && <NotificationPage />}
        </BasicCard>
      </Grid>
    </Grid>
  );
};

export default index;
