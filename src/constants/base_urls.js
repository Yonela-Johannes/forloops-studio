let apiUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://mysite-server-ruddy.vercel.app/api/';
} else {
  apiUrl = 'http://localhost:4000/api/';
}

export const baseUrl = apiUrl;
