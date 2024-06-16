import { MultipartFile } from "@fastify/multipart";

interface ValidateFileProps {
  file: MultipartFile,
  fileSize: number
};


export const validateFile = ({ file, fileSize }: ValidateFileProps) => {
  const maxSize = 2 * 1024 * 1024;

  const acceptedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml"
  ];

  if (!acceptedMimeTypes.includes(file.mimetype)) return "File extension not accept";

  if (fileSize > maxSize) return "Max size exceeded limit (2MB)";

  return null;
};
