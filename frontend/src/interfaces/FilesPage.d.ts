import { string } from "yup";

export interface TypeFilter {
  type: string;
  underFilterType: {
    displayName: string;
    extension?: string;
    function: string;
  }[];
}
