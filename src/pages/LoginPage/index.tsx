import React from "react";
import { Button, Footer, Form, Input, Space, Toast } from "antd-mobile";
import "./index.css";
import { useNavigate } from "react-router-dom";
import myAxios from "../../plugins/myAxios";
import { StudentLoginRequest } from "../../models/StudentLoginRequest";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * 登陆
   * @param studentLoginRequest 登陆参数
   */
  const onFinish = async (studentLoginRequest: StudentLoginRequest) => {
    try {
      const res = await myAxios.post("/student/login", studentLoginRequest);
      if (res.code === 0 && res.data) {
        Toast.show({
          icon: "success",
          content: "登录成功",
        });
        navigate("/eva");
      } else {
        Toast.show({
          icon: "error",
          content: "登录失败",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <span className="title">学评教系统</span>
        <div className="Logo"></div>
      {/*<img src="../../assets/HDU-ITMO.png" className="Logo" alt="logo" />*/}
      <Form
        layout="horizontal"
        mode="card"
        className="loginForm"
        onFinish={onFinish}
        footer={
          <Button
            block
            shape="rounded"
            type="submit"
            color="primary"
            size="large"
          >
            登陆
          </Button>
        }
      >
        <Form.Item
          label="账号"
          name="userAccount"
          rules={[{ required: true, message: "账号不能为空!" }]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="userPassword"
          rules={[{ required: true, message: "密码不能为空!" }]}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
      </Form>
      <Footer
        className="footer"
        content={
          <Space direction="vertical" style={{ "--gap": "1px" }} align="center">
            <span>版权所有 @杭州电子科技大学网路技术培训中心</span>
            <span>浙IC备2023001150号</span>
          </Space>
        }
      ></Footer>
    </div>
  );
};

export default LoginPage;
