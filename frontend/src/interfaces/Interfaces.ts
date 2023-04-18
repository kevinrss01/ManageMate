export interface File {
  id: string;
  name: string;
  type: "pdf" | "jpeg" | "png" | "mp4" | "word" | "mov";
  size: number;
  dateAdded: string;
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
