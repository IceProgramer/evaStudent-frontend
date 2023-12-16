import React, { useEffect, useState } from "react";
import { CourseVO } from "../../models/CourseVO";
import myAxios from "../../plugins/myAxios";
import { Toast } from "antd-mobile";
import { Card, Space, Tag, Typography } from "antd";

const { Text } = Typography;

import "./index.css";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const UndoneCourseCard: React.FC = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState<CourseVO[]>([]);

  // 获取完成课程信息
  const getUndoneCourseList = async () => {
    try {
      const res = await myAxios.get("/student/course/get/undone/list");
      if (res.code === 0 && res.data) {
        setCourseList(res.data);
      }
    } catch (error) {
      Toast.show({
        content: "获取课程信息失败",
      });
    }
  };

  useEffect(() => {
    getUndoneCourseList().then();
  }, []);
  return (
    <>
      <div className="courseList">
        <Space size={15} direction="vertical" style={{ width: "100%" }}>
          {courseList.map((course) => (
            <Card
              key={course.id}
              className="container"
              size={"small"}
              onClick={() => {
                navigate(`/eva/course/${course.id}/0`);
              }}
              hoverable
            >
              <Meta
                className="courseTitle"
                style={{ width: "72%" }}
                title={course.courseChineseName}
                description={
                  <Text type="secondary" ellipsis={true}>
                    {course.courseEnglishName}
                  </Text>
                }
              />
              <Tag color="warning" bordered={false} className="courseStatus">
                未评
              </Tag>
            </Card>
          ))}
        </Space>
      </div>
    </>
  );
};

export default UndoneCourseCard;
