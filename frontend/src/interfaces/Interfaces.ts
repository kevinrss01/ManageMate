export interface File {
  id: string;
  name: string;
  type: "pdf" | "jpeg" | "png" | "mp4" | "word" | "mov";
  size: number;
  dateAdded: string;
}
