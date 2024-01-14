import { v2 as cloudinary } from 'cloudinary'
import { API_KEY, API_SECRET, CLOUDINARY_URL, CLOUD_NAME } from '../Config/index.js';
cloudinary.config({ 
          cloudinary_url:CLOUDINARY_URL,
          cloud_name: CLOUD_NAME, 
          api_key: API_KEY, 
          api_secret: API_SECRET,
          secure: true
});

export const uploadImage = async (file, existsUrl) => {
          const b64 = Buffer.from(file.buffer).toString("base64");
          let dataURI = "data:" + file.mimetype + ";base64," + b64;
          const options = {
            resource_type: "auto",
            use_filename: true,
            unique_filename: true,
            overwrite: true,
            invalidate: true
          };
          if(existsUrl) options.public_id=existsUrl.split("/").slice(-1)[0].split(".")[0];
          try {
            // Upload the image
            const result = await cloudinary.uploader.upload(dataURI, options);
            console.log("Cloudinary uploadImage", result);
            return result.secure_url;
          } catch (error) {
            console.error(error);
          }
      };
