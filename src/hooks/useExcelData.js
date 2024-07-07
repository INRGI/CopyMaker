import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const useExcelData = (filePath) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      setData(workbook);
    };

    fetchData();
  }, [filePath]);

  return data;
};

export default useExcelData;
