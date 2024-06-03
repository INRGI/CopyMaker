import { useState } from 'react';
import * as XLSX from 'xlsx';

const EmailFilter = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [excludeDomains, setExcludeDomains] = useState({
    comcast: false,
    gmail: false,
    yahoo: false,
    outlook: false,
    aol: false,
    icloud: false,
    cox: false,
  });

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setExcludeDomains(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const filterEmails = () => {
    const domainsToExclude = Object.keys(excludeDomains).filter(domain => excludeDomains[domain]);
    const filtered = emails.filter(email => {
      const parts = email.split('@');
      if (parts.length !== 2) return false;
      const emailDomain = parts[1];
      return !domainsToExclude.some(domain => emailDomain.includes(domain));
    });
    setFilteredEmails(filtered);
    setIsFiltered(true);
  };

  const downloadCSV = () => {
    const ws = XLSX.utils.aoa_to_sheet(filteredEmails.map(email => [email]));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Emails');
    XLSX.writeFile(wb, 'filtered_emails.csv');
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <label>
          <input
            type="checkbox"
            name="comcast"
            checked={excludeDomains.comcast}
            onChange={handleCheckboxChange}
          />
          Comcast
        </label>
        <label>
          <input
            type="checkbox"
            name="gmail"
            checked={excludeDomains.gmail}
            onChange={handleCheckboxChange}
          />
          Gmail
        </label>
        <label>
          <input
            type="checkbox"
            name="yahoo"
            checked={excludeDomains.yahoo}
            onChange={handleCheckboxChange}
          />
          Yahoo
        </label>
        <label>
          <input
            type="checkbox"
            name="outlook"
            checked={excludeDomains.outlook}
            onChange={handleCheckboxChange}
          />
          Outlook
        </label>
        <label>
          <input
            type="checkbox"
            name="aol"
            checked={excludeDomains.aol}
            onChange={handleCheckboxChange}
          />
          AOL
        </label>
        <label>
          <input
            type="checkbox"
            name="icloud"
            checked={excludeDomains.icloud}
            onChange={handleCheckboxChange}
          />
          Icloud
        </label>
        <label>
          <input
            type="checkbox"
            name="cox"
            checked={excludeDomains.cox}
            onChange={handleCheckboxChange}
          />
          Cox
        </label>
      </div>
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
