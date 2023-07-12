import { TypeFilter } from "@/interfaces/FilesPage";
import {
  UserState,
  File,
  PercentageAndSizeByFileType,
  NumberOfFilesByType,
} from "@/interfaces/Interfaces";

export const formatFileSizeFromBytes = (sizeInBytes: number): string => {
  //bytes === octets
  if (sizeInBytes === 0) {
    return " ";
  }

  if (sizeInBytes < 1024) {
    return `${sizeInBytes} o`; // o stands for octets
  }

  const sizeInKb = sizeInBytes / 1024;
  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} Ko`; // Ko stands for kilooctets
  }

  const sizeInMb = sizeInKb / 1024;
  if (sizeInMb < 1024) {
    return `${sizeInMb.toFixed(1)} Mo`; // Mo stands for mégaoctets
  }

  const sizeInGb = sizeInMb / 1024;
  return `${sizeInGb.toFixed(1)} Go`; // Go stands for gigaoctets
};

export const getPercentageAndSizeByFileType = (
  files: File[],
  userData: UserState
): PercentageAndSizeByFileType => {
  const documentTypes = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "csv",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "html",
    "css",
    "js",
    "ts",
    "json",
    "lain",
  ];
  const imageTypes = ["jpeg", "jpg", "png", "gif", "svg"];
  const videoTypes = ["mp4", "mov", "avi", "flv", "mkv"];
  let otherTypes = ["mp3", "wav", "ogg", "zip", "rar"];
  const allTypes = [
    ...documentTypes,
    ...imageTypes,
    ...videoTypes,
    ...otherTypes,
  ];

  const totalSize: Record<string, number> = {};

  files.forEach((file: File) => {
    let fileType = file.name.split(".").pop() || file.name;
    fileType = fileType === file.name ? file.type : fileType;

    totalSize[fileType] = (totalSize[fileType] || 0) + file.size;
    if (!allTypes.includes(fileType)) {
      otherTypes.push(fileType);
    }
  });

  const calculateTotalSize = (types: string[]): number => {
    return types.reduce((total, type) => total + (totalSize[type] || 0), 0);
  };

  const calculatePercentage = (size: number): string => {
    return ((size * 100) / userData.totalUserStorage).toFixed(2);
  };

  return {
    documents: {
      percentage: calculatePercentage(calculateTotalSize(documentTypes)),
      size: formatFileSizeFromBytes(calculateTotalSize(documentTypes)),
    },
    images: {
      percentage: calculatePercentage(calculateTotalSize(imageTypes)),
      size: formatFileSizeFromBytes(calculateTotalSize(imageTypes)),
    },
    videos: {
      percentage: calculatePercentage(calculateTotalSize(videoTypes)),
      size: formatFileSizeFromBytes(calculateTotalSize(videoTypes)),
    },
    others: {
      percentage: calculatePercentage(calculateTotalSize(otherTypes)),
      size: formatFileSizeFromBytes(calculateTotalSize(otherTypes)),
    },
  };
};

export const getNumberOfFilesByType = (files: File[]): NumberOfFilesByType => {
  const documentTypes = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "csv",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "html",
    "css",
    "js",
    "ts",
    "json",
    "lain",
  ];
  const imageTypes = ["jpeg", "jpg", "png", "gif", "svg"];
  const videoTypes = ["mp4", "mov", "avi", "flv", "mkv"];
  let otherTypes = ["mp3", "wav", "ogg", "zip", "rar"];
  const allTypes = [
    ...documentTypes,
    ...imageTypes,
    ...videoTypes,
    ...otherTypes,
  ];

  const totalFiles: Record<string, number> = {};

  files.forEach((file: File) => {
    let fileType = file.name.split(".").pop() || file.name;
    fileType = fileType === file.name ? file.type : fileType;

    totalFiles[fileType] = (totalFiles[fileType] || 0) + 1;
    if (!allTypes.includes(fileType)) {
      otherTypes.push(fileType);
    }
  });

  const calculateTotal = (types: string[]): number => {
    return types.reduce((total, type) => total + (totalFiles[type] || 0), 0);
  };

  return {
    documents: calculateTotal(documentTypes),
    images: calculateTotal(imageTypes),
    videos: calculateTotal(videoTypes),
    others: calculateTotal(otherTypes),
  };
};

export function getTimeSinceAdd(
  dateInput: string | { seconds: number; nanoseconds: number }
): string {
  let date: Date;

  if (typeof dateInput === "string") {
    date = new Date(dateInput);
  } else {
    // If the input is an object with 'seconds' and 'nanoseconds',
    // convert it to a JavaScript Date object
    date = new Date(dateInput.seconds * 1000 + dateInput.nanoseconds / 1000000);
  }

  if (date.toString() === "Invalid Date") {
    return "Inconnu";
  }

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: "an", seconds: 60 * 60 * 24 * 365 },
    { name: "mois", seconds: 60 * 60 * 24 * 30 },
    { name: "semaine", seconds: 60 * 60 * 24 * 7 },
    { name: "jour", seconds: 60 * 60 * 24 },
    { name: "heure", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
  ];

  for (const unit of units) {
    const count = Math.floor(seconds / unit.seconds);
    if (count >= 1) {
      const plural = count > 1 ? "s" : "";
      return `${count} ${unit.name}${plural}`;
    }
  }
  return "moins d'une minute";
}

export const typeFilter: TypeFilter[] = [
  {
    type: "date",
    underFilterType: [
      {
        displayName: "Du plus récent au plus ancien",
        function: "dateGrowing",
      },
      {
        displayName: "Du plus ancien au plus récent",
        function: "dateDecreasing",
      },
    ],
  },
  {
    type: "poids",
    underFilterType: [
      {
        displayName: "Poids Croissant",
        function: "sizeGrowing",
      },
      {
        displayName: "Poids Décroissant",
        function: "sizeDecreasing",
      },
    ],
  },
  {
    type: "type de fichier",
    underFilterType: [
      {
        displayName: "Text (txt)",
        extension: "txt",
        function: "filesType",
      },
      {
        displayName: "Image JPG",
        extension: "jpg",
        function: "filesType",
      },
      {
        displayName: "Image JPEG",
        extension: "jpeg",
        function: "filesType",
      },
      {
        displayName: "Image PNG",
        extension: "png",
        function: "filesType",
      },
      {
        displayName: "Document PDF",
        extension: "pdf",
        function: "filesType",
      },
      {
        displayName: "Document word (docx)",
        extension: "docx",
        function: "filesType",
      },
      {
        displayName: "Spreadsheet",
        extension: "xlsx",
        function: "filesType",
      },
      {
        displayName: "Audio (mp3)",
        extension: "mp3",
        function: "filesType",
      },
      {
        displayName: "Video (mp4)",
        extension: "mp4",
        function: "filesType",
      },
      {
        displayName: "Webpage",
        extension: "html",
        function: "filesType",
      },
      {
        displayName: "JavaScript",
        extension: "js",
        function: "filesType",
      },
      {
        displayName: "CSS",
        extension: "css",
        function: "filesType",
      },
      {
        displayName: "MOV",
        extension: "mov",
        function: "filesType",
      },
    ],
  },
];

export const iconsType: Record<string, string> = {
  pdf: "Fichier document",
  jpeg: "Fichier image",
  jpg: "Fichier image",
  png: "Fichier image",
  gif: "Fichier image",
  svg: "Fichier image",
  mp4: "Fichier vidéo",
  mov: "Fichier vidéo",
  avi: "Fichier vidéo",
  flv: "Fichier vidéo",
  mkv: "Fichier vidéo",
  doc: "Fichier Word",
  docx: "Fichier Word",
  txt: "Fichier texte",
  csv: "Fichier CSV",
  xls: "Fichier Excel",
  xlsx: "Fichier Excel",
  ppt: "Fichier PowerPoint",
  pptx: "Fichier PowerPoint",
  mp3: "Fichier audio",
  wav: "Fichier audio",
  ogg: "Fichier audio",
  zip: "Fichier compressé",
  rar: "Fichier compressé",
  html: "Fichier HTML",
  css: "Fichier CSS",
  js: "Fichier JavaScript",
  ts: "Fichier TypeScript",
  json: "Fichier JSON",
  lain: "Fichier texte",
};
