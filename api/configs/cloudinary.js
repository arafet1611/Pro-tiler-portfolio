import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to test Cloudinary connection
export const testCloudinaryConnection = async () => {
  try {
    // Test by making a simple API call
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected successfully!");
    console.log("Cloudinary status:", result.status);
    return true;
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);

    // Check which environment variables are missing
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.error("Missing: CLOUDINARY_CLOUD_NAME");
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      console.error("Missing: CLOUDINARY_API_KEY");
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      console.error("Missing: CLOUDINARY_API_SECRET");
    }

    return false;
  }
};

// Function to test upload capabilities
export const testCloudinaryUpload = async () => {
  try {
    // Create a simple test image (a small red dot)
    const testImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

    const result = await cloudinary.uploader.upload(testImage, {
      folder: "test-uploads",
    });

    console.log("✅ Cloudinary upload test successful!");
    console.log("Uploaded image URL:", result.secure_url);

    // Clean up the test image
    await cloudinary.uploader.destroy(result.public_id);
    console.log("✅ Test image cleaned up");

    return true;
  } catch (error) {
    console.error("❌ Cloudinary upload test failed:", error.message);
    return false;
  }
};

export default cloudinary;
