import { useState } from 'react';
import * as XLSX from 'xlsx';

const EmailFilter = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).flat();
      setEmails(emailData.map(String).map(email => email.trim()));
      setIsFiltered(false);
      setFilteredEmails([]);
    };

    reader.readAsArrayBuffer(file);
  };

  const filterEmails = () => {
    const excludeDomains = ['comcast'];
    const filtered = emails.filter(email => {
      const parts = email.split('@');
      if (parts.length !== 2) return false;
      const emailDomain = parts[1];
      return !excludeDomains.some(domain => emailDomain.includes(domain));
    });
    setFilteredEmails(filtered);
    setIsFiltered(true);
  };

  const downloadCSV = () => {
    const ws = XLSX.utils.aoa_to_sheet(filteredEmails.map(email => [email]));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Emails');
    XLSX.writeFile(wb, 'YourNewCSV.csv');
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={filterEmails}>Filter Emails</button>
      {isFiltered && (
        <button onClick={downloadCSV}>Download New CSV</button>
      )}
      <div>
        <p>Total emails: {emails.length}</p>
        {isFiltered && <p>Filtered emails: {filteredEmails.length}</p>}
      </div>
    </div>
  );
};

export default EmailFilter;
