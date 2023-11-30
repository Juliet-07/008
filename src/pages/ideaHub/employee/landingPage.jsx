import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Add from "../../../assets/addIdea.png";
import Modal from "../../../components/Modal";
import { Input, Textarea } from "@material-tailwind/react";
import { FcIdea } from "react-icons/fc";
import { PiCoinsLight } from "react-icons/pi";
import { toast } from "react-toastify";
import IdeaCard from "./ideaCard";

const IdeaHub = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_EMPLOYEE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [campaignCategory, setCampaignCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [inputValue, setValue] = useState("");
  const [inputValue1, setValue1] = useState("");

  const handleAddField = () => {
    if (additionalFields.length < 5) {
      setAdditionalFields([...additionalFields, { value: "" }]);
    }
  };

  const initialValue = {
    campaignName: "",
    campaignCategory: "",
    groupOwner: "",
    details: "",
    createdBy: "",
    initiatorBranch: "",
    keyFeatures: [],
  };
  const [newCampaign, setNewCampaign] = useState(initialValue);
  const { campaignName, details } = newCampaign;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleInputChange = (index, event) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = { value: event.target.value };
    setAdditionalFields(updatedFields); // Assuming setAdditionalFields is a function to update the state
  };

  const handleCategoryInputChange = (value) => {
    setValue(value);
  };
  const handleSelectCategoryChange = (value) => {
    console.log(value, "values");
    setSelectedCategory(value);
    console.log(selectedCategory, "categories");
  };

  //   handle selection for Groups
  const handleGroupInputChange = (value) => {
    setValue1(value);
  };
  const handleSelectGroupChange = (value) => {
    console.log(value, "values");
    setSelectedGroup(value);
    console.log(selectedGroup, "departments");
  };

  const getIdeas = () => {
    const url = `${apiURL}/GetApprovedCampaingnsForAllEmployees`;
    axios.get(url).then((response) => {
      console.log(response, "for ideas");
      setIdeas(response.data.responseValue);
    });
  };

  const getCategories = () => {
    let category;
    let categoryValue;
    const url = `${apiURL}/GetCampaingnCategoryList`;
    axios.get(url).then((response) => {
      console.log(response);
      category = response.data.responseValue;
      categoryValue = category.map((categories) => {
        return {
          value: categories.CatergoryId,
          label: categories.CatergoryName,
        };
      });
      setCampaignCategory(categoryValue);
    });
  };

  const getDepartments = () => {
    const url = "http://192.168.207.18:8080/api/ActiveDirectory/GetDepartments";
    let details;
    let group;
    axios.get(url).then((response) => {
      console.log(response.data.data, "users");
      details = response.data.data;
      group = details.map((dept) => {
        return { value: dept.email, label: dept.fullName };
      });
      setGroups(group);
      console.log(group, "departments");
    });
  };

  useEffect(() => {
    getIdeas();
    getCategories();
    getDepartments();
    console.log(selectedCategory, "selected category");
    console.log(selectedGroup, "selected group");
  }, [selectedCategory, selectedGroup]);

  const postCampaign = () => {
    const url = `${apiURL}/PostNewCampaign`;
    const payload = {
      ...newCampaign,
      campaignCategory: selectedCategory.value,
      groupOwner: selectedGroup.value,
      createdBy: user.givenname,
      initiatorBranch: "Head Office",
      keyFeatures: additionalFields.map((field) => field.value),
    };
    console.log(payload);
    axios.post(url, payload).then((response) => {
      console.log(response, "response from posting campaign");
      toast.success(response.data.responseMessage);
    });
  };
  return (
    <>
      <div className="w-full h-full p-6">
        {" "}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between px-6">
            <div className="cursor-pointer" onClick={() => setModal(true)}>
              <img src={Add} alt="add-idea" />
            </div>
            <div className="uppercase text-xl mt-4 font-semibold flex items-center">
              welcome to the idea hub{" "}
              <span>
                <FcIdea size={30} />
              </span>
            </div>
            <div>
              <p>Filter By:</p>
              <div>
                <Select label="Filter">
                  <Option>Open Campaigns</Option>
                  <Option>Closed Campaigns</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="text-[#84817E]">
            Your reactions, suggestions are what we need for inovation and for
            shaping the future.
          </div>
          <div className="w-full flex flex-col px-4">
            <p className="text-[#84817E]">Trending Campaigns.........</p>
            <div className="flex items-center justify-between">
              <IdeaCard
                title="Account Opening"
                backgroundColor="#CA9292"
                comments="200 comments"
                likes="20 links"
              />
              <IdeaCard
                title="Credit Card Reward Campaign"
                backgroundColor="#E1FCF1"
                comments="100 comments"
                likes="100 links"
              />
              <IdeaCard
                title="Referral Program Campaign"
                backgroundColor="#FEFFC4"
                comments="20 comments"
                likes="200 links"
              />
            </div>
          </div>
          <div className="w-full h-[60vh] mb-10 py-4 overflow-auto">
            {ideas.map((idea) => (
              <Link to={`/applications/ideaDescription/${idea.campaignId}`}>
                <div className="h-[120px] flex flex-col item-center shadow-xl m-4 text-sm text-gray-800 bg-white/50">
                  <table className="w-full">
                    <thead className="text-[#84817E] font-normal uppercase bg-gray-100">
                      <th className="p-2">campaign name</th>
                      <th className="p-2">campaign category</th>
                      <th className="p-2">posted by</th>
                      <th className="p-2">group</th>
                    </thead>
                    <tbody>
                      <tr className="text-center text-black">
                        <td className="px-4 py-1 ">{idea.campaignName}</td>
                        <td className="px-4 py-1">{idea.campaignCategory}</td>
                        <td className="px-4 py-1">{idea.createdBy}</td>
                        <td className="px-4 py-1">{idea.groupOwner}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full flex items-center justify-around mt-4">
                    <p>Comments:{idea.commentsCount}</p>
                    <p className="flex items-center">
                      Top Staff: {idea.topStaff}
                      <span className="ml-2 flex items-center">
                        {idea.totalCoins}{" "}
                        <PiCoinsLight
                          className="mx-2"
                          color="orange"
                          size={20}
                        />
                      </span>
                    </p>
                    <p></p>
                    <p>{idea.likesCount ? `${idea.likesCount} likes` : ""}</p>
                    <p>Posted:{idea.postedDate}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <div className="p-3 flex flex-col items-center justify-center">
            <div className="uppercase text-[#A09898]">new campaign</div>
            <form className="w-[497px]" onSubmit={handleSubmit(postCampaign)}>
              <div className="mt-4">
                <Input
                  size="lg"
                  label="Idea Title"
                  name="campaignName"
                  value={campaignName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="details"
                  className="block text-[#D3D0D0] text-xs mb-2"
                >
                  Minimum of 300 words
                </label>
                <Textarea
                  size="lg"
                  label="Detailed Description"
                  name="details"
                  value={details}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  Select Category
                </label>
                <Select
                  options={campaignCategory}
                  defaultValue={selectedCategory}
                  onChange={handleSelectCategoryChange}
                  onInputChange={handleCategoryInputChange}
                  isSearchable
                />
              </div>
              {/* <div className="mt-6">
                <label
                  htmlFor="details"
                  className="block text-[#D3D0D0] text-xs mb-2"
                >
                  Add Supporting Document (if any)
                </label>
                <Input type="file" />
              </div> */}
              <div className="mt-6">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  Select Group
                </label>
                <Select
                  options={groups}
                  defaultValue={selectedGroup}
                  onChange={handleSelectGroupChange}
                  onInputChange={handleGroupInputChange}
                  isSearchable
                />
              </div>
              {/* Additional dynamic fields */}
              {additionalFields.map((field, index) => (
                <div key={index} className="mt-6">
                  <Input
                    size="lg"
                    label={`Key Features ${index + 1}`}
                    name={`additionalField${index + 1}`}
                    value={field.value} // Set the value from the field object
                    onChange={(e) => handleInputChange(index, e)} // Call a function to handle the change
                  />
                </div>
              ))}
              <div className="mt-4 flex items-center">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleAddField}
                >
                  Add Potential Benefits
                </button>
                <p className="text-red-600 text-xs pl-2">
                  Kindly add at least one key feature for your campaign
                </p>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full h-[54px] font-bold tracking-wide text-white bg-[#3B1212] uppercase"
                  // onClick={() => setLoading(!loading)}
                >
                  post campaign
                </button>

                {/* <Loader /> */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default IdeaHub;
