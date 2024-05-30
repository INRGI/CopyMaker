import { useState } from 'react';
import * as XLSX from 'xlsx';

const EmailFilter = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).flat();
      setEmails(emailData);
    };

    reader.readAsArrayBuffer(file);
  };

  const filterEmails = () => {
    const excludeDomains = ['comcast'];
    const filtered = emails.filter(email => {
      return !excludeDomains.some(domain => email.endsWith(`@${domain}.net`));
    });
    setFilteredEmails(filtered);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <textarea
        value={emails.join('\n')}
        readOnly
        rows="20"
        cols="50"
        placeholder="Emails will appear here..."
      />
      <button onClick={filterEmails}>Filter Emails</button>
      <pre>{filteredEmails.join('\n')}</pre>
    </div>
  );
};

export default EmailFilter;
