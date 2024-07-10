import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '1042942150757-2q0dlbnb2ti5dhu68nf8bia7eusuj795.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const API_KEY = 'AIzaSyA4yHLGzLszaPKPS9upLyRrPtqBPvWVnwQ';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const AutoCopies = () => {
  const [productName, setProductName] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
      }).catch(err => {
        setError('Failed to initialize Google API client: ' + err.message);
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error message
    try {
      // Step 1: Fetch the product folder based on the product name in the entire Google Drive
      const productQuery = `name contains '${productName}' and mimeType = 'application/vnd.google-apps.folder'`;
      console.log('Query for product folder:', productQuery);
      let res = await gapi.client.drive.files.list({ q: productQuery });
      console.log('Product folder response:', res);

      if (res.result.files.length === 0) {
        throw new Error('No product folder found with the specified name.');
      }
      const productFolderId = res.result.files[0].id;

      // Step 2: Fetch the "HTML+SL" subfolder within the product folder
      const subFolderQuery = `'${productFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'HTML+SL'`;
      console.log('Query for HTML+SL subfolder:', subFolderQuery);
      const subFolderRes = await gapi.client.drive.files.list({ q: subFolderQuery });
      console.log('HTML+SL subfolder response:', subFolderRes);

      if (subFolderRes.result.files.length === 0) {
        throw new Error('No "HTML+SL" subfolder found.');
      }
      const subFolderId = subFolderRes.result.files[0].id;

      // Step 3: Fetch the "Lift {productNumber}" subfolder within the "HTML+SL" subfolder
      const liftFolderQuery = `'${subFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'Lift ${productNumber}'`;
      console.log('Query for Lift subfolder:', liftFolderQuery);
      const liftFolderRes = await gapi.client.drive.files.list({ q: liftFolderQuery });
      console.log('Lift subfolder response:', liftFolderRes);

      if (liftFolderRes.result.files.length === 0) {
        throw new Error(`No "Lift ${productNumber}" subfolder found.`);
      }
      const liftFolderId = liftFolderRes.result.files[0].id;

      // Step 4: Fetch the HTML file within the "Lift {productNumber}" subfolder
      const htmlFileQuery = `'${liftFolderId}' in parents and mimeType = 'text/html'`;
      console.log('Query for HTML file:', htmlFileQuery);
      const fileRes = await gapi.client.drive.files.list({ q: htmlFileQuery });
      console.log('HTML file response:', fileRes);

      if (fileRes.result.files.length === 0) {
        throw new Error('No HTML file found in the specified subfolder.');
      }
      const fileId = fileRes.result.files[0].id;

      const fileContentRes = await gapi.client.drive.files.get({
        fileId,
        alt: 'media'
      });

      setFileContent(fileContentRes.body);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          placeholder="Product Name" 
        />
        <input 
          type="text" 
          value={productNumber} 
          onChange={(e) => setProductNumber(e.target.value)} 
          placeholder="Product Number" 
        />
        <button type="submit">Fetch File</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <div>
        <h2>File Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: fileContent }} />
      </div>
    </div>
  );
};

export default AutoCopies;
