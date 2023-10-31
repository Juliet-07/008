import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";
import BranchInfo from "../../components/BranchDetails";
import Icon from "../../assets/icon.png";

const CounterfeitNoteTeller = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { handleSubmit } = useForm();
  const [branchCode, setBranchCode] = useState("");
  const [denomination, setDenomination] = useState("");
  const [currencyNumber, setCurrencyNumber] = useState("");
  const [file, setFile] = useState(null);
  // const [base64URL, setBase64URL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBranchInfo = useCallback((data) => {
    console.log({ data });
    setBranchCode(data.value);
  }, []);

  const handleSelectNoteChange = (e) => {
    setDenomination(e.target.value);
    console.log(denomination, "selected note");
  };

  useEffect(() => {
    console.log(denomination);
  }, [file, denomination]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // to make new file-reader
      let reader = new FileReader();
      // to convert the file to base64
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader, "fileInfo Object");
        baseURL = reader.result;
        console.log(baseURL, "what is here");
        resolve(baseURL);
      };
    });
  };

  // to manage file upload
  const fileUploadHandler = (e) => {
    console.log(e.target.files, "image");
    const image = e.target.files[0];
    setFile(image);
    // if (image) {
    //   getBase64(image)
    //     .then((result) => {
    //       image["base64"] = result;
    //       setFile(image);
    //       setBase64URL(result);
    //       console.log(base64URL, "what is the result");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   setFile(null);
    //   setBase64URL("");
    // }
  };

  const resetForm = () => {
    setBranchCode("");
    setDenomination("");
    // setFile({});
    setCurrencyNumber("");
  };

  const insertConterfeitDetails = () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_DUDCHEQUE}/InsertCounterfeitNote`;
    const formData = new FormData();
    formData.append("BRANCH", branchCode);
    formData.append("DENOMINATION", denomination);
    formData.append("FILES", file);
    formData.append("CURRENCYNUMBER", currencyNumber);
    formData.append("INITIATOR_BY", user.name);
    setTimeout(() => {
      setLoading(false);
      axios.post(url, formData).then((response) => {
        console.log(response, "response from inserting counterfeitnote");
        toast.success(response.data.statusMessage);
        resetForm();
      });
    }, 2000);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-[400px] md:w-[500px] bg-white shadow-xl border rounded-xl my-4">
        <div className="flex flex-col items-center justify-center px-3">
          <img src={Icon} alt="icon" className="w-[60px] h-[60px]" />
          <div className="font-semibold text-lg">Log Counterfeit Note</div>
        </div>
        <div className="w-[450px] my-4 mx-6 flex items-center justify-center">
          <form
            className="w-full max-w-lg flex flex-col gap-6"
            onSubmit={handleSubmit(insertConterfeitDetails)}
          >
            <div>
              <label className="text-[#2b2e35] font-medium mb-3">
                Select Branch
              </label>
              <BranchInfo onForm={handleBranchInfo} />
            </div>
            {/* <Input
              size="lg"
              label="denomination"
              name="denomination"
              value={denomination}
              onChange={(e) => setDenomination(e.target.value)}
            /> */}
            <div>
              <label className="text-[#2b2e35] font-medium mb-3">
                Denomination
              </label>
              <select
                className="block w-full rounded border border-blue-gray-200 bg-transparent px-4 py-3 leading-tight focus:outline"
                value={denomination}
                onChange={handleSelectNoteChange}
              >
                <option value="#5">#5</option>
                <option value="#10">#10</option>
                <option value="#20">#20</option>
                <option value="#50">#50</option>
                <option value="#100">#100</option>
                <option value="#200">#200</option>
                <option value="#500">#500</option>
                <option value="#1000">#1000</option>
              </select>
            </div>
            <Input
              size="lg"
              label="Currency Number"
              name="currencyNumber"
              value={currencyNumber}
              onChange={(e) => setCurrencyNumber(e.target.value)}
              type="number"
            />
            <div>
              <input type="file" name="file" onChange={fileUploadHandler} />
              {file && (
                <div>
                  <p>Selected File: {file.name}</p>
                  <img src={URL.createObjectURL(file)} alt="Selected File" />
                </div>
              )}
            </div>
            <Button
              className="mt-4 bg-red-600"
              fullWidth
              type="submit"
              onClick={insertConterfeitDetails}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CounterfeitNoteTeller;
