// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApiResponseData } from "@/models/api";
import { FormField, FormFieldType } from "@/models/form";
import type { NextApiRequest, NextApiResponse } from "next";

const FIELDS: FormField[] = [
  {
    type: FormFieldType.TEXT,
    label: "Full Name",
    key: "name",
    placeholder: "Enter your full name",
    value: "John Doe",
    maxLength: 30,
    required: true,
    errorMessages: {
      required: "Full name is required",
      maxLength: "Full name cannot exceed 30 characters",
    },
  },
  {
    type: FormFieldType.EMAIL,
    label: "Email",
    key: "email",
    placeholder: "Enter your email address",
    required: true,
    pattern: "^\\S+@\\S+\\.\\S+$",
    errorMessages: {
      required: "Email is required",
      pattern: "Please enter a valid email address",
    },
  },
  {
    type: FormFieldType.TEL,
    label: "Phone Number (8 digits)",
    key: "phoneNumber",
    placeholder: "Enter your phone number",
    required: true,
    pattern: "(^[0-9]{4}$|^[0-9]{8}$)",
    errorMessages: {
      required: "Phone number is required",
      pattern: "Please enter a valid phone number",
    },
  },
  {
    type: FormFieldType.DATE,
    label: "Date of Birth",
    key: "dob",
    required: true,
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    errorMessages: {
      required: "Date of birth is required",
      pattern: "Please enter a valid date",
    },
  },
  {
    type: FormFieldType.DATETIME,
    label: "Date Time",
    key: "dateTime",
    pattern:
      "^(19|20)\\d\\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]$",
    required: false,
    errorMessages: {
      pattern: "Please enter a valid date time",
    },
  },
  {
    type: FormFieldType.TIME,
    label: "Time",
    key: "time",
    required: false,
  },

  {
    type: FormFieldType.URL,
    label: "URL",
    key: "url",
    placeholder: "URL",
    required: true,
    pattern: `^(?:(?:http|https|ftp):\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-._~:\\/?#[\\]@!$&'()*+,;=%]+$`,
    errorMessages: {
      required: "URL is required",
      pattern: "Invalid URL",
    },
  },
  {
    type: FormFieldType.PASSWORD,
    label: "Password",
    key: "password",
    placeholder: "Enter your password",
    required: true,
    minLength: 12,
    errorMessages: {
      required: "Password is required",
      minLength: "Password must be at least 12 characters",
    },
  },
  {
    type: FormFieldType.HIDDEN,
    label: "Hidden Field (This input field is hidden)",
    key: "hidden",
    value: "hidden",
    required: false,
  },

  {
    type: FormFieldType.NUMBER,
    label: "Age",
    key: "age",
    placeholder: "Enter your age",
    required: true,
    min: 18,
    max: 110,
    step: 1,
    errorMessages: {
      required: "Age is required",
      min: "Age must be at least 18",
      max: "Age cannot exceed 110",
    },
  },
  {
    type: FormFieldType.SELECT,
    label: "Favorite Color",
    placeholder: "Select your favorite color",
    key: "color",
    value: "blue",
    options: [
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
      { label: "Purple", value: "purple", disabled: true },
    ],
    required: true,
    errorMessages: {
      required: "Favorite color is required",
    },
  },
  {
    type: FormFieldType.CHECKBOX,
    label: "Terms and Conditions",
    placeholder: "I agree to the terms and conditions",
    key: "terms",
    required: true,
    errorMessages: {
      required: "You must agree to the terms and conditions",
    },
  },
  {
    type: FormFieldType.RADIO,
    label: "Contact Preference",
    key: "contactPreference",
    required: true,
    value: "email",
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "SMS", value: "sms" },
    ],
    errorMessages: {
      required: "Contact Preference is required",
    },
  },
  {
    type: FormFieldType.TEXTAREA,
    label: "Please describe yourself",
    key: "personalDescription",
    placeholder: "Enter a brief description of yourself",
    required: true,
    maxLength: 500,
    errorMessages: {
      required: "Description is required",
      maxLength: "Description cannot exceed 500 characters",
    },
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<FormField[]>>
) {
  // adding timeout here to simulate network delay, making the loading spinner visible
  setTimeout(() => {
    if (req.method === "GET") {
      const response = { success: true, data: FIELDS };
      console.log({ response });
      res.status(200).json(response);
    } else {
      res
        .status(405)
        .json({ success: false, errorMessage: "Method Not Allowed" });
    }
  }, 2000);
}
