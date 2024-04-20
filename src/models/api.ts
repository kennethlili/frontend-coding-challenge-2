import { NextApiRequest } from "next";

export interface ApiResponseData<T> {
  success: boolean;
  data?: T;
  errorMessage?: string;
}

export interface ApiRequestDto<Body> extends NextApiRequest {
  body: Body;
}
