import { TypeFilter } from "@/interfaces/FilesPage";
import {
  UserState,
  File,
  PercentageAndSizeByFileType,
  NumberOfFilesByType,
} from "@/interfaces/Interfaces";

export const formatFileSizeFromBytes = (sizeInBytes: number): string => {
  //bytes === octets

  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`; // B stands for Bytes
  }

  const sizeInKb = sizeInBytes / 1024;
  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} KB`; // KB stands for Kilobytes
  }

  const sizeInMb = sizeInKb / 1024;
  if (sizeInMb < 1024) {
    return `${sizeInMb.toFixed(1)} MB`; // MB stands for Megabytes
  }

  const sizeInGb = sizeInMb / 1024;
  return `${sizeInGb.toFixed(1)} GB`; // GB stands for Gigabytes
};

export const getPercentageAndSizeByFileType = (
  files: File[],
  userData: UserState
): PercentageAndSizeByFileType => {
  let totalSize = {
    pdf: 0,
    jpeg: 0,
    png: 0,
    mp4: 0,
    word: 0,
    mov: 0,
  };
  files.forEach((file: File) => {
    totalSize[file.type] += file.size;
  });

  return {
    documents: {
      percentage: (
        (totalSize.pdf * 100) / userData.totalUserStorage +
        (totalSize.word * 100) / userData.totalUserStorage
      ).toFixed(2),
      size: formatFileSizeFromBytes(totalSize.pdf + totalSize.word),
    },
    images: {
      percentage: (
        (totalSize.jpeg * 100) / userData.totalUserStorage +
        (totalSize.png * 100) / userData.totalUserStorage
      ).toFixed(2),
      size: formatFileSizeFromBytes(totalSize.jpeg + totalSize.png),
    },
    videos: {
      percentage: ((totalSize.mov * 100) / userData.totalUserStorage).toFixed(
        2
      ),
      size: formatFileSizeFromBytes(totalSize.mov),
    },
    others: {
      percentage: ((totalSize.mp4 * 100) / userData.totalUserStorage).toFixed(
        2
      ),
      size: formatFileSizeFromBytes(totalSize.mp4),
    },
  };
};

export const getNumberOfFilesByType = (files: File[]): NumberOfFilesByType => {
  const totalFiles = {
    pdf: 0,
    jpeg: 0,
    png: 0,
    word: 0,
    mov: 0,
    mp4: 0,
  };

  files.forEach((file: File) => {
    totalFiles[file.type] += 1;
  });

  const { pdf, jpeg, png, word, mov, mp4 } = totalFiles;
  return {
    documents: pdf + word,
    images: jpeg + png,
    videos: mov,
    others: mp4,
  };
};

export function getTimeSinceAdd(dateString: string): string {
  const date = new Date(dateString);
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
      if (unit.name == "mois") {
        return `${count} ${unit.name}`;
      }
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
