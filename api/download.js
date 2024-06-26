import https from 'https';
import { PassThrough } from 'stream';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  try {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        throw new Error(`Network response was not ok, status: ${response.statusCode}`);
      }

      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'] || `attachment; filename="${url.split('/').pop()}"`;

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', contentDisposition);

      const passThrough = new PassThrough();
      response.pipe(passThrough).pipe(res);
    }).on('error', (error) => {
      console.error('Error fetching image:', error.message);
      res.status(500).send(`Error fetching image: ${error.message}`);
    });
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send(`Error fetching image: ${error.message}`);
  }
}
