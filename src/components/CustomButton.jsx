import React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { ColorSchemeCode } from "../enums/ColorScheme";

const CustomButtonRoot = styled(Button)(({ variant, size }) => ({
  backgroundColor:
    variant === "tertiary" ? "transparent" :
      variant === "dangerPrimary" ? ColorSchemeCode.danger30 :
        variant === "dangerSecondary" ? ColorSchemeCode.white :
          variant === "dangerTertiary" ? ColorSchemeCode.white :
            variant === "secondary" ? "transparent" :
              variant === "primary" ? ColorSchemeCode.primary50 :
                variant === "warning" ? ColorSchemeCode.danger30 :
                  variant === "warningSecondary" ? ColorSchemeCode.white :
                    ColorSchemeCode.primary50,
  borderRadius: "6px",
  boxShadow: variant === "primary" ? "0px 1px 2px rgba(15, 15, 15, 0.1), inset 0px 0px 1px rgba(15, 15, 15, 0.1)" : "none",
  outline: variant === "secondary" || variant === "dangerPrimary" || variant === "warningSecondary" ? `1px solid ${ColorSchemeCode.neutral20}` : "1px solid transparent",
  padding: size === "xl" ? "16px 32px !important" : size === "l" ? "12px 16px" : size === "s" ? "6px 16px" : "8px 16px",
  color: variant === "dangerPrimary" ? ColorSchemeCode.primary0 :
    variant === "dangerSecondary" || variant === "dangerTertiary" || variant === "tertiary" ? ColorSchemeCode.danger30 :
      variant === "secondary" || variant === "primary" ? ColorSchemeCode.white :
        variant === "warning" || variant === "warningSecondary" ? ColorSchemeCode.white : ColorSchemeCode.white,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: variant === "dangerPrimary" ? ColorSchemeCode.danger40 :
      variant === "dangerSecondary" || variant === "dangerTertiary" || variant === "tertiary" ? ColorSchemeCode.primary0 :
        variant === "secondary" || variant === "primary" ? ColorSchemeCode.primary0 :
          variant === "warning" ? ColorSchemeCode.danger20 :
            variant === "warningSecondary" ? ColorSchemeCode.danger0 : ColorSchemeCode.primary0,
    color: variant === "dangerPrimary" ? ColorSchemeCode.primary0 :
      variant === "dangerSecondary" || variant === "dangerTertiary" || variant === "tertiary" ? ColorSchemeCode.danger30 :
        variant === "secondary" || variant === "primary" ? ColorSchemeCode.white :
          variant === "warning" || variant === "warningSecondary" ? ColorSchemeCode.white : ColorSchemeCode.white,
    outline: variant === "secondary" || variant === "dangerSecondary" || variant === "warningSecondary" ? `1px solid ${ColorSchemeCode.primary50}` :
      "1px solid transparent",
    boxShadow: "none",
  },
  "&:focus": {
    backgroundColor: variant === "dangerPrimary" ? ColorSchemeCode.danger50 :
      variant === "dangerSecondary" || variant === "dangerTertiary" || variant === "tertiary" ? ColorSchemeCode.primary10 :
        variant === "secondary" || variant === "primary" ? ColorSchemeCode.primary70 :
          variant === "warning" ? ColorSchemeCode.ButtonWarningPressedText :
            variant === "warningSecondary" ? ColorSchemeCode.danger10 : ColorSchemeCode.primary70,
    color: variant === "dangerPrimary" ? ColorSchemeCode.primary0 :
      variant === "dangerSecondary" ? ColorSchemeCode.danger60 :
        variant === "dangerTertiary" ? ColorSchemeCode.danger50 :
          variant === "tertiary" ? ColorSchemeCode.primary70 :
            variant === "secondary" || variant === "primary" ? ColorSchemeCode.primary70 :
              variant === "warning" ? ColorSchemeCode.primary0 :
                variant === "warningSecondary" ? ColorSchemeCode.danger50 : ColorSchemeCode.white,
    outline: variant === "secondary" ? `2px solid ${ColorSchemeCode.danger50}` :
      variant === "dangerSecondary" ? ColorSchemeCode.danger50 :
        variant === "warningSecondary" ? `1px solid ${ColorSchemeCode.danger50}` : "1px solid transparent",
  },
}));

const CustomButton = ({ variant, size, onClick, disabled, className, btntext, icon, ...props }) => {
  return (
    <CustomButtonRoot
      onClick={onClick}
      variant="contained"
      color="primary"
      disabled={disabled}
      className={`U14M ${variant === "secondary" ? "secondary" : variant === "primary" ? "customButton" : variant === "warning" ? "warning" : variant === "warningSecondary" ? "warningSecondary" : "customButton"} ${className}`}
    >
      {icon ? (
        <>
          <div className="d-flex">{icon}</div>
          {btntext !== "" && <div className="ml_6">{btntext}</div>}
        </>
      ) : (
        <div>{btntext}</div>
      )}
    </CustomButtonRoot>
  );
};

export default CustomButton;
