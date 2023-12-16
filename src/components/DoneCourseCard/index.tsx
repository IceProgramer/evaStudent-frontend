import React, { useEffect, useState } from "react";
import { CourseVO } from "../../models/CourseVO";
import myAxios from "../../plugins/myAxios";
import { Toast } from "antd-mobile";
import { Card, Space, Tag, Typography } from "antd";
const { Text } = Typography;
import Meta from "antd/es/card/Meta";

const DoneCourseCard: React.FC = () => {
  const [courseList, setCourseList] = useState<CourseVO[]>([]);

  // 获取完成课程信息
  const getDoneCourseList = async () => {
    try {
      const res = await myAxios.get("/student/course/get/done/list");
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
    getDoneCourseList();
  }, []);
  return <>
    <div className="courseList">
      <Space size={15} direction="vertical" style={{ width: "100%" }}>
        {courseList.map((course) => (
            <Card
                key={course.id}
                className="container"
                size={"small"}
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
              <Tag color="processing" bordered={false} className="courseStatus">
                已评
              </Tag>
            </Card>
        ))}
      </Space>
    </div>
  </>;

};

export default DoneCourseCard;
