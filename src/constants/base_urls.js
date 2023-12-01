let apiUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://forloops-studio.vercel.app/';
} else {
  apiUrl = 'http://localhost:4000/api/';
}

export const baseUrl = apiUrl;
