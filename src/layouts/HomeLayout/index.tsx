import React, { useEffect, useState } from "react";
// import HomePage from "../../pages/HomePage";
import { ActionSheet, NavBar, Toast } from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { Action } from "antd-mobile/es/components/action-sheet";
import myAxios from "../../plugins/myAxios";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const actions: Action[] = [
    {
      text: "退出登录",
      key: "quit",
      onClick: async () => {
        const res = await myAxios.post("/student/logout");
        if (res.code === 0) {
          Toast.show({
            icon: "success",
            content: "注销成功",
          });
          navigate("/login");
          setVisible(false);
        }
      },
    },
    {
      text: "取消",
      key: "cancel",
      onClick: () => {
        setVisible(false);
      },
    },
  ];

  const [title, setTitle] = useState<string>("学评教系统");
  const right = (
    <div style={{ fontSize: 24 }}>
      <MoreOutline onClick={() => setVisible(true)} />
    </div>
  );

  // 判断title
  const getTitle = () => {
    if (location.pathname.includes("target")) {
      setTitle("细则");
    } else {
      setTitle("学评教系统");
    }
  };

  useEffect(() => {
    console.log(1);
    console.log(location);
    getTitle();
  }, [location]);

  const back = () => {
    if (location.pathname.includes("course")) {
      navigate("/eva");
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <NavBar
        style={{ backgroundColor: "#0076f6", color: "white" }}
        right={right}
        onBack={back}
        backArrow={!location.pathname.endsWith("eva")}
      >
        {title}
      </NavBar>
      <Outlet />
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default HomeLayout;
