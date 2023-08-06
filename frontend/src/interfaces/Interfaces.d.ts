export interface File {
  fileId: string;
  name: string;
  type: string;
  size: number;
  dateAdded: string | { seconds: number; nanoseconds: number };
  firebaseURL: string;
}

export interface PercentageAndSizeByFileType {
  [key: string]: { percentage: string; size: string };
  documents: {
    percentage: string;
    size: string;
  };
  images: {
    percentage: string;
    size: string;
  };
  videos: {
    percentage: string;
    size: string;
  };
  others: {
    percentage: string;
    size: string;
  };
}

export interface NumberOfFilesByType {
  [key: string]: number;
  documents: number;
  images: number;
  videos: number;
  others: number;
}

export interface UserStateWithId extends UserState {
  _id: string;
}

// REDUX
export interface UserState {
  [key: string]: string | number | File[] | Invoices[];
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  totalUserStorage: number;
  id: string;
  files: File[];
  invoices: Invoices[];
}

export interface StorageState {
  availableStorage: number;
  usedStorage: number;
}

export interface UpdatePasswordDataType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
export interface UpdateDataType {
  [key: string]: string;
  firstName?: string;
  lastName?: string;
  newEmail?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export interface Invoices {
  id: string;
  billAddress: {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
  totalAmount: number;
  totalStorage: string;
  paymentMethod: string;
  paymentDate: string;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}
