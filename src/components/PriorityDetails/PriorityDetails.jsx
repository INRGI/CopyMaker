import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess } from '../../helpers/toastics';
import { Container, Text, Title, TitleOfText } from './PriorityDetails.styled';

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
      const trimmedProductName = productName.trim();
      const productDetails = csvData.find(item => {
        const productParts = item.PRODUCT.split(/[/\\]/).map(part => part.trim());
        return productParts.includes(trimmedProductName);
      });

      if (productDetails) {
        setUnsubDetails({
          unsubText: productDetails['UNSUB TEXT'] || 'N/A',
          unsubId: productDetails['UNSUB ID'] || 'N/A',
          voluumUnsubId: productDetails['Voluum unsub ID '] || 'N/A',
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
    <>
      {Object.keys(unsubDetails).length > 0 ? (
        <Container>
          <Title>Unsubscribe Details for {productName}</Title>
          <p><TitleOfText>Unsubscribe Text: </TitleOfText> 
            <Text onClick={() => {
                  navigator.clipboard.writeText(unsubDetails.unsubText);
                  toastSuccess("Unsubscribe Text copied");
                }} dangerouslySetInnerHTML={{ __html: unsubDetails.unsubText }} />
          </p>
          {unsubDetails.unsubId !== 'N/A' && (
            <p><TitleOfText>Unsubscribe ID: </TitleOfText> <Text onClick={() => {
              navigator.clipboard.writeText(unsubDetails.unsubId);
              toastSuccess("Unsubscribe ID copied");
            }}>{unsubDetails.unsubId}</Text></p>
          )}
          {unsubDetails.voluumUnsubId !== 'N/A' && (
            <p><TitleOfText>Voluum Unsubscribe ID: </TitleOfText> <Text onClick={() => {
              navigator.clipboard.writeText(unsubDetails.voluumUnsubId);
              toastSuccess("Voluum Unsubscribe ID copied");
            }}>{unsubDetails.voluumUnsubId}</Text></p>
          )}
          {unsubDetails.unsubUrl !== 'N/A' && (
            <p><TitleOfText>Unsubscribe URL: </TitleOfText> <Text onClick={() => {
              navigator.clipboard.writeText(unsubDetails.unsubUrl);
              toastSuccess("Unsubscribe URL copied");
            }}>{unsubDetails.unsubUrl}</Text></p>
          )}
          
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default PriorityDetails;
