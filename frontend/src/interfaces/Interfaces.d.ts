export interface File {
  id: string;
  name: string;
  type: "pdf" | "jpeg" | "png" | "mp4" | "word" | "mov";
  size: number;
  dateAdded: string;
  firebaseUrl: string;
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

// REDUX
export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  totalUserStorage: number;
}

export interface StorageState {
  availableStorage: number;
  usedStorage: number;
  files: File[];
}

export interface UpdatePasswordDataType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
export interface UpdateDataType {
  firstName?: string;
  lastName?: string;
  newEmail?: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

export interface Invoices {
  id: string;
  billAddress: {
    firstName: string;
    lastName: string;
    compagny: string;
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
