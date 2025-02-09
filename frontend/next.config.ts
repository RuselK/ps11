import dotenv from "dotenv";
import type { NextConfig } from "next";

dotenv.config({ path: "../.env" });


const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY: process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
