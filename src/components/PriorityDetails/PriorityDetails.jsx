import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess } from "../../helpers/toastics";
import { Container, Text, Title, TitleOfText } from "./PriorityDetails.styled";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PriorityDetails = ({ productName }) => {
  const dispatch = useDispatch();
  const { domainId } = useParams();
  let domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

  const [csvData, setCsvData] = useState([]);
  const [unsubDetails, setUnsubDetails] = useState({});
  const [unsubStart, setUnsubStart] = useState(domain ? domain.unsubStart : "");
  const [unsubEnd, setUnsubEnd] = useState(domain ? domain.unsubEnd : "");
  const [typeOfUnsub, setTypeOfUnsub] = useState(
    domain ? domain.typeOfUnsub : ""
  );

  let link = "";

  useEffect(() => {
    setUnsubStart(domain ? domain.unsubStart : "");
    setUnsubEnd(domain ? domain.unsubEnd : "");
    setTypeOfUnsub(domain ? domain.typeOfUnsub : "");
  }, [domain, domainId, dispatch]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("/prioriti.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        });
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
      const productDetails = csvData.find((item) => {
        const productParts = item.PRODUCT.split(/[/\\]/).map((part) =>
          part.trim()
        );
        return productParts.includes(trimmedProductName);
      });

      if (productDetails) {
        setUnsubDetails({
          unsubText: productDetails["UNSUB TEXT"] || "N/A",
          unsubId: productDetails["UNSUB ID"] || "N/A",
          voluumUnsubId: productDetails["Voluum unsub ID "] || "N/A",
          unsubUrl: productDetails["UNSUB URL"] || "N/A",
        });
      } else {
        setUnsubDetails({});
      }
    };

    if (productName) {
      getProductDetails(productName);
    }
  }, [productName, csvData]);

  if (
    typeOfUnsub === "UNSUB ID" &&
    unsubStart !== "" &&
    unsubEnd !== "" &&
    unsubDetails?.unsubId !== ""
  ) {
    link = `${unsubStart}${unsubDetails.unsubId}${unsubEnd}`;
  } else if (
    typeOfUnsub === "Voluum unsub ID " &&
    unsubStart !== "" &&
    unsubEnd !== "" &&
    unsubDetails?.voluumUnsubId !== ""
  ) {
    link = `${unsubStart}${unsubDetails.voluumUnsubId}${unsubEnd}`;
  }

  return (
    <>
      {Object.keys(unsubDetails).length > 0 ? (
        <Container>
          <Title>Unsubscribe Details for {productName}</Title>
          <p>
            <TitleOfText>Unsubscribe Text: </TitleOfText>
            <Text
              onClick={() => {
                navigator.clipboard.writeText(unsubDetails.unsubText);
                toastSuccess("Unsubscribe Text copied");
              }}
              dangerouslySetInnerHTML={{ __html: unsubDetails.unsubText }}
            />
          </p>

          {typeOfUnsub === "UNSUB ID" &&
            unsubDetails.unsubId !== "N/A" &&
            unsubStart !== "" &&
            unsubEnd !== "" && (
              <p>
                <TitleOfText>Unsubscribe ID link: </TitleOfText>{" "}
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    toastSuccess("Unsubscribe ID link copied");
                  }}
                >
                  {link}
                </Text>
              </p>
            )}

          {unsubDetails.unsubId !== "N/A" &&
            !link && (
              <p>
                <TitleOfText>Unsubscribe ID: </TitleOfText>{" "}
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(unsubDetails.unsubId);
                    toastSuccess("Unsubscribe ID copied");
                  }}
                >
                  {unsubDetails.unsubId}
                </Text>
              </p>
            )}

          {typeOfUnsub === "Voluum unsub ID " &&
            unsubDetails.voluumUnsubId !== "N/A" &&
            unsubStart !== "" &&
            unsubEnd !== "" && (
              <p>
                <TitleOfText>Voluum Unsubscribe ID link: </TitleOfText>{" "}
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                    toastSuccess("Voluum Unsubscribe ID copied");
                  }}
                >
                  {link}
                </Text>
              </p>
            )}

          {unsubDetails.voluumUnsubId !== "N/A" &&
            !link && (
              <p>
                <TitleOfText>Voluum Unsubscribe ID: </TitleOfText>{" "}
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(unsubDetails.voluumUnsubId);
                    toastSuccess("Voluum Unsubscribe ID copied");
                  }}
                >
                  {unsubDetails.voluumUnsubId}
                </Text>
              </p>
            )}

          {unsubDetails.unsubUrl !== "N/A" && (
            <p>
              <TitleOfText>Unsubscribe URL: </TitleOfText>{" "}
              <Text
                onClick={() => {
                  navigator.clipboard.writeText(unsubDetails.unsubUrl);
                  toastSuccess("Unsubscribe URL copied");
                }}
              >
                {unsubDetails.unsubUrl}
              </Text>
            </p>
          )}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default PriorityDetails;
