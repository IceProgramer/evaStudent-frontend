import React, { useEffect } from "react";
import { Tabs } from "antd-mobile";
import UndoneCourseCard from "../../components/UndoneCourseCard";
import DoneCourseCard from "../../components/DoneCourseCard";

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log(sessionStorage.getItem("user"));
  }, []);
  return (
    <>
      <Tabs defaultActiveKey="undone">
        <Tabs.Tab title="已评" key="done">
          <DoneCourseCard />
        </Tabs.Tab>
        <Tabs.Tab title="未评" key="undone">
          <UndoneCourseCard />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default HomePage;
