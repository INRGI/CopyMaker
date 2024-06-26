export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('No URL provided');
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    const contentDisposition = response.headers.get('content-disposition') || `attachment; filename="${url.split('/').pop()}"`;

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', contentDisposition);

    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send(`Error fetching image: ${error.message}`);
  }
}
