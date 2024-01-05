let apiUrl;
let siteUrl;
let callbackUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://myblog-707i.onrender.com/api/';
  siteUrl = 'https://forloops-studio.vercel.app/';
  callbackUrl = 'https://myblog-707i.onrender.com/api/api/auth/callback/google'
} else {
  apiUrl = 'http://localhost:4000/api/';
  siteUrl = 'http://localhost:5173';
  callbackUrl = 'http://localhost:3000/api/auth/callback/google'
}

export const baseUrl = apiUrl;
export const website = siteUrl;
export const callback = callbackUrl;
