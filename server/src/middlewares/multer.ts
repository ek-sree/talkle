import multer from "multer";

const fileTypes: { [key: string]: string[] } = {
  avatar: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  images: ["image/jpeg", "image/png", "image/jpg"],
  videos: ["video/mp4", "video/mkv", "video/avi"],
};

export const upload = (type: "avatar" | "images" | "videos") => {
  const storage = multer.memoryStorage();

  const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (fileTypes[type].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${type}. Allowed types: ${fileTypes[type].join(", ")}.`));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: type === "videos" ? 100 * 1024 * 1024 : 5 * 1024 * 1024,
    },
  });
};
