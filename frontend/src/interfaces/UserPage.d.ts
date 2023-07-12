import { UpdateDataType, UserState } from "@/interfaces/Interfaces";

export interface ComponentPropsUserPage {
  userData: UserState;
  onSubmit: (data: UpdateDataType) => void;
}
