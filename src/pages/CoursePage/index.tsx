import React, { useEffect, useState } from "react";
import { Tabs, Toast } from "antd-mobile";
import myAxios from "../../plugins/myAxios";
import { useNavigate, useParams } from "react-router-dom";
import { TeacherVO } from "../../models/TeacherVO";
import CourseInfoCard from "../../components/CourseInfoCard";

const CoursePage: React.FC = () => {
  const [teacherList, setTeacherList] = useState<TeacherVO[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const [courseId] = useState(params.id);
  const [tabIndex] = useState(params.teacherIndex);

  // 获取教师列表
  const getTeacherList = async () => {
    const res = await myAxios.get("/student/course/get/course/info", {
      params: { courseId: courseId },

    });
    if (res.code === 0 && res.data) {
      setTeacherList(res.data.teacherList);
    } else {
      Toast.show({
        content: "获取教师列表错误",
      });
    }
  };

  useEffect(() => {
    getTeacherList().then();
  }, []);
  return (
    <>
      <Tabs
        onChange={(value) => {
          navigate(`/eva/course/${courseId}/${value}`)
        }}
        defaultActiveKey={tabIndex}
      >
        {teacherList.map((teacherInfo, index) => (
          <Tabs.Tab key={index} title={teacherInfo.teacherName}>
            <CourseInfoCard
              key={teacherInfo.teacherName}
              firstTargetList={teacherInfo.firstTargetVOList ?? []}
              teacherName={teacherInfo.teacherName ?? ""}
              teacherId={teacherInfo.teacherId ?? 0}
            />
          </Tabs.Tab>
        ))}
      </Tabs>
    </>
  );
};

export default CoursePage;
