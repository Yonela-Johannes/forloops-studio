let apiUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://forloops-studio.vercel.app/';
} else {
  apiUrl = 'https://mysite-server-ruddy.vercel.app/';
}

export const baseUrl = apiUrl;
