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

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const folderName = productName.slice(0, 4);  // BTDD from BTDD30
    const query = `name contains '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`;
    const res = await gapi.client.drive.files.list({ q: query });
    const folderId = res.result.files[0].id;

    const subFolderRes = await gapi.client.drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name contains 'HTML+SL'`
    });
    const subFolderId = subFolderRes.result.files[0].id;

    const fileRes = await gapi.client.drive.files.list({
      q: `'${subFolderId}' in parents and mimeType = 'text/html'`
    });
    const fileId = fileRes.result.files[0].id;

    const fileContentRes = await gapi.client.drive.files.get({
      fileId,
      alt: 'media'
    });

    setFileContent(fileContentRes.body);
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
      <div>
        <h2>File Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: fileContent }} />
      </div>
    </div>
  );
};



export default AutoCopies;
