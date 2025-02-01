import { AuthContext } from "@/context/authcontext/authcontext";
import { Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const index = () => {
  const auth = useContext(AuthContext);
  const user = auth?.userData;
  const [copied, setCopied] = useState(false);
  return (
    <div className="space-y-8">
      <div className="relative">
        <Typography
          sx={{
            color: "#070707",
            fontWeight: "700",
            fontFamily: "Inter",
            marginTop: "2rem",
          }}
        >
          Referral
        </Typography>
        <img
          src="/images/png/percentage.png"
          alt="percent"
          className="w-[70px] md:w-[200px] h-[70px] md:h-[200px] rotate absolute right-6 bottom-[15rem] md:bottom-0 animate-bounce mb-16"
        />
        <div
          style={{ backgroundColor: "rgba(230, 249, 255, 0.4)" }}
          className="pl-12 pr-8 pt-4 mt-6 pb-6"
        >
          <div className="w-full  mt-2 mb-4">
            <p
              className=" text-[30px] md:text-[56px] font-[800] font-int"
              style={{ color: "rgba(4, 26, 142, 1)" }}
            >
              Refer & Earn
            </p>
          </div>
          <p
            className="md:pr-[32rem] mb-12"
            style={{ color: "rgba(127, 129, 135, 1)" }}
          >
            Earn up to <span className="font-[600]">NGN 1000</span> on every
            referral, when your friend tops up their account and pay a bill on{" "}
            <span className="font-[600]">Skypay</span> and also get cashbacks
            on transactions you make.
          </p>
          <div
            style={{ backgroundColor: "rgba(40, 192, 241, 1)" }}
            className="flex space-x-2 p-2 "
          >
            <p
              className="font-int text-[10px] md:[70px]"
              style={{ color: "rgba(255, 255, 255, 1)" }}
            >
              <span className="font-[700]">Referral Link:</span>{" "}
              https://Skypay.com.ng/0/Register.php?referral=
              {user?.referral_code}
            </p>{" "}
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(
                  "https://Skypay.com.ng/0/Register.php?referral=" +
                    user?.referral_code
                );
                setCopied(true);
              }}
            >
              <FileCopyIcon
                style={{ color: copied ? "red" : "rgba(255, 255, 255, 1)" }}
              />
            </button>
          </div>
          <p
            className="font-int text-[14px] md:[70px]"
            style={{ color: "rgba(51, 51, 51, 1)" }}
          >
            Copy referral code/link and send to your friend
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
