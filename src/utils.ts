import ngrok from 'ngrok';

const proto = 'http';
const s = `${proto}s://`;
export const generateDevDomain = async () =>
  (
    await ngrok.connect({
      proto,
      addr: process.env.PORT,
    })
  ).split(s)[1];
