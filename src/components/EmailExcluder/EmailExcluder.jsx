import { useState } from 'react';
import * as XLSX from 'xlsx';
import { ExcludeContainer, FileInput, FileInputLabel, FilterEmailsButton, Text, Title } from './EmailExcluder.styled';

const EmailExcluder = () => {
  const [mainEmails, setMainEmails] = useState([]);
  const [exclusionEmails, setExclusionEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleMainFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).flat();
      setMainEmails(emailData.map(String).map(email => email.trim()));
      setIsFiltered(false);
      setFilteredEmails([]);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExclusionFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const exclusionEmailSet = new Set(exclusionEmails);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const exclusionData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).flat();
        exclusionData.map(String).map(email => exclusionEmailSet.add(email.trim()));
        setExclusionEmails(Array.from(exclusionEmailSet));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const filterExclusionEmails = () => {
    const filtered = mainEmails.filter(email => !exclusionEmails.includes(email));
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
    <ExcludeContainer>
        <center><Title>Exclude emails</Title></center>
      <div>
        <FileInput type="file" id="main-file-upload" onChange={handleMainFileUpload} />
        <FileInputLabel htmlFor="main-file-upload">Main File</FileInputLabel>
      </div>
      <div>
        <FileInput type="file" id="exclusion-file-upload" onChange={handleExclusionFileUpload} multiple />
        <FileInputLabel htmlFor="exclusion-file-upload">To Exclude</FileInputLabel>
      </div>
      <FilterEmailsButton onClick={filterExclusionEmails}>Filter</FilterEmailsButton>
      {isFiltered && (
        <button onClick={downloadCSV}>Download Filtered CSV</button>
      )}
      <div>
        <Text>Total main emails: {mainEmails.length}</Text>
        <Text>Total exclusion emails: {exclusionEmails.length}</Text>
        {isFiltered && <Text>Filtered emails: {filteredEmails.length}</Text>}
      </div>
    </ExcludeContainer>
  );
};

export default EmailExcluder;
