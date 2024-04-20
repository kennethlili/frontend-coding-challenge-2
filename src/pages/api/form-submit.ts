import { ApiRequestDto, ApiResponseData } from "@/models/api";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface FormSubmitRequestDto {
  name: string;
  email: string;
  phoneNumber: string;
  dob: string;
  dateTime?: string;
  time?: string;
  url: string;
  password: string;
  hidden?: string;
  age: number;
  color: "red" | "green" | "blue" | "purple";
  terms: boolean;
  contactPreference: "email" | "phone" | "sms";
  personalDescription: string;
}

export interface FormSubmitResponseDto extends FormSubmitRequestDto {}

export default function handler(
  req: ApiRequestDto<FormSubmitRequestDto>,
  res: NextApiResponse<ApiResponseData<FormSubmitResponseDto>>
) {
  // adding timeout here to simulate network delay, making the loading spinner visible
  setTimeout(() => {
    if (req.method === "POST") {
      const { body } = req;
      res.status(200).json({ success: true, data: body });
    } else {
      res
        .status(405)
        .json({ success: false, errorMessage: "Method Not Allowed" });
    }
  }, 2000);
}
