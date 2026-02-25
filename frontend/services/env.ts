// src/config/env.ts

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables",
  );
}
