import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const PriorityDetails = ({ productName }) => {
  const [csvData, setCsvData] = useState([]);
  const [unsubDetails, setUnsubDetails] = useState({});

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('/prioriti.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true, skipEmptyLines: true });
        setCsvData(parsedData.data);
      } catch (err) {
        console.error("Failed to fetch and parse CSV data", err);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    const getProductDetails = (productName) => {
      // Trim whitespace from productName and CSV data for accurate comparison
      const trimmedProductName = productName.trim();
      const productDetails = csvData.find(item => item.PRODUCT.trim() === trimmedProductName);

      if (productDetails) {
        setUnsubDetails({
          unsubText: productDetails['UNSUB TEXT'] || 'N/A',
          unsubId: productDetails['UNSUB ID'] || 'N/A',
          voluumUnsubId: productDetails['Voluum unsub ID'] || 'N/A',
          unsubUrl: productDetails['UNSUB URL'] || 'N/A'
        });
      } else {
        setUnsubDetails({});
      }
    };

    if (productName) {
      getProductDetails(productName);
    }
  }, [productName, csvData]);

  return (
    <div>
      {Object.keys(unsubDetails).length > 0 ? (
        <div>
          <h2>Unsubscribe Details for {productName}</h2>
          <p><strong>Unsubscribe Text:</strong> {unsubDetails.unsubText}</p>
          <p><strong>Unsubscribe ID:</strong> {unsubDetails.unsubId}</p>
          <p><strong>Voluum Unsubscribe ID:</strong> {unsubDetails.voluumUnsubId}</p>
          <p><strong>Unsubscribe URL:</strong> <a href={unsubDetails.unsubUrl} target="_blank" rel="noopener noreferrer">{unsubDetails.unsubUrl}</a></p>
        </div>
      ) : (
        <p>No details available for {productName}</p>
      )}
    </div>
  );
};

export default PriorityDetails;
