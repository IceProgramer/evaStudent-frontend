import React from "react";
import { FirstTargetVO } from "../../models/FirstTargetVO";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Space, Tag, Typography } from "antd";

const { Text } = Typography;
import "./index.css";
import Meta from "antd/es/card/Meta";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  firstTargetList: FirstTargetVO[];
  teacherName: string;
  teacherId: number;
}

const CourseInfoCard: React.FC<Props> = (props) => {
  const { firstTargetList, teacherName, teacherId } = props;
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="teacherList">
      <Card size="small">
        <Space size="large">
          <Avatar size="large" shape="square" icon={<UserOutlined />} />
          <Text>{teacherName}</Text>
        </Space>
      </Card>
      <Space
        size={10}
        direction="vertical"
        style={{ width: "100%", marginTop: 10 }}
      >
        {firstTargetList.map((firstTarget) => (
          <Card
            key={firstTarget.id}
            className="container"
            size={"small"}
            onClick={() => {
              if (firstTarget.status === 0) {
                navigate(
                  `/eva/target/${params.id}/${teacherId}/${firstTarget.id}`,
                );
              }
            }}
            hoverable={firstTarget.status === 0}
          >
            <Meta
              className="courseTitle"
              style={{ width: "72%" }}
              title={firstTarget.targetChineseName}
              description={
                <Text type="secondary" ellipsis={true}>
                  {firstTarget.targetEnglishName}
                </Text>
              }
            />
            {firstTarget.status === 0 ? (
              <Tag color="warning" bordered={false} className="courseStatus">
                未评
              </Tag>
            ) : (
              <Tag color="processing" bordered={false} className="courseStatus">
                已评
              </Tag>
            )}
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default CourseInfoCard;
