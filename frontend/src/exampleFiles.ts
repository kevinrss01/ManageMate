import { File, Invoices } from "@/interfaces/Interfaces";
export const files: File[] = [
  {
    id: "1",
    name: "WhitePaper",
    type: "pdf",
    size: 2045,
    dateAdded: "2022-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "2",
    name: "imageOfThisAmazingDay",
    type: "jpeg",
    size: 55000,
    dateAdded: "2023-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "3",
    name: "Image",
    type: "png",
    size: 57000,
    dateAdded: "2019-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "4",
    name: "musique",
    type: "mp4",
    size: 1700,
    dateAdded: "2017-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "5",
    name: "test5",
    type: "word",
    size: 1200,
    dateAdded: "2018-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "6",
    name: "Video-example",
    type: "mov",
    size: 1200000,
    dateAdded: "2019-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "7",
    name: "word-test",
    type: "word",
    size: 1200,
    dateAdded: "2018-06-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "8",
    name: "test8",
    type: "jpeg",
    size: 80000,
    dateAdded: "2018-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "9",
    name: "test8",
    type: "png",
    size: 280000,
    dateAdded: "2018-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
  {
    id: "10",
    name: "Podcast-200-minutes",
    type: "mp4",
    size: 1700000,
    dateAdded: "2017-05-05",
    firebaseUrl:
      "https://firebasestorage.googleapis.com/v0/b/monstock-2b0f9.appspot.com/o/WhitePaper.pdf?alt=media&token=8b9b5b9e-5b9e-4b7e-8b9b-5b9e4b7e8b9b",
  },
];

export const invoicesExample: Invoices[] = [
  {
    id: "1",
    billAddress: {
      firstName: "John",
      lastName: "Doe",
      company: "Doe & Co",
      address: "1 avenue des champs élysées",
      postalCode: "75015",
      city: "Paris",
      country: "France",
    },
    totalAmount: 20,
    totalStorage: "20go",
    paymentMethod: "CB",
    paymentDate: "2021-05-05",
  },
  {
    id: "2",
    billAddress: {
      firstName: "John",
      lastName: "Doe",
      company: "Doe & Co",
      address: "1 avenue des champs élysées",
      postalCode: "75015",
      city: "Paris",
      country: "France",
    },
    totalAmount: 20,
    totalStorage: "20go",
    paymentMethod: "CB",
    paymentDate: "2020-05-05",
  },
];
