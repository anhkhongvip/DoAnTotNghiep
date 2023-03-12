import { v2 as cloudinary } from "cloudinary";
async function connectUploadCloud() {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
}

export { connectUploadCloud, cloudinary };
