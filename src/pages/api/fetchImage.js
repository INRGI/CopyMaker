
export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const contentType = response.headers.get('content-type');
      const buffer = await response.buffer();
  
      res.setHeader('Content-Type', contentType);
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  