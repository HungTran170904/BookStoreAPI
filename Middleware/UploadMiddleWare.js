import multer from "multer";
export const UploadMiddleWare=multer({
          storage: multer.memoryStorage(),
          limits: {
            fileSize: 4 * 1024 * 1024,
          }
        }).single("image");