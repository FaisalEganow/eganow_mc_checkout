import * as yup from "yup";
import { CREDIT_CARD_CVV_REGEX, CREDIT_CARD_MONTH_REGEX, CREDIT_CARD_YEAR_REGEX } from "./constants";

export const validationSchema = yup.object({
  accountNoOrCardNoOrMSISDN: yup
    .string()
    .required("Card number is required")
    .max(16, "Card number must be 16 digits long"),
    name: yup
    .string()
    .required("full name is required"),
  expiryMonth: yup
    .string()
    .required("Expiry month is required")
    .matches(CREDIT_CARD_MONTH_REGEX, "Expiry month must be in MM format"),

  expiryYear: yup
    .string()
    .required("Expiry year is required")
    .matches(CREDIT_CARD_YEAR_REGEX, "Expiry year must be in YY format"),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(CREDIT_CARD_CVV_REGEX, "CVV must be a 3-digit number"),
});
