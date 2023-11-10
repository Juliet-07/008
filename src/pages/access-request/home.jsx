import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { RequestTable } from "./RequestTable";
import { ImplementerTable } from "./implementerTable";

const AccessRequestHomePage = () => {
  const data = [
    {
      label: "My Requests",
      value: "myRequests",
      icon: Square3Stack3DIcon,
      desc: <RequestTable />,
    },
    {
      label: "Pending Requests to Implement",
      value: "pendingRequests",
      icon: UserCircleIcon,
      desc: <ImplementerTable />,
    },
  ];

  return (
    <div className="m-10">
      <Tabs value="dashboard">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};
export default AccessRequestHomePage;
