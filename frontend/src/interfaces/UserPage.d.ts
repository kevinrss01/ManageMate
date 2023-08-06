import { UpdateDataType, UserState } from "@/interfaces/Interfaces";

export interface ComponentPropsUserPage {
  userData: UserState;
  onSubmit?: (data: UpdateDataType) => void;
  isLoading?: boolean;
  typeOfDataFetching?: "names" | "email" | "password" | null;
  isSuccessfullFetching?: boolean;
}
