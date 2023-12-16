import React, { useEffect, useState } from "react";
import { Button, ProgressBar, Toast } from "antd-mobile";
import "./index.css";
import { Typography } from "antd";
import { CheckCard } from "@ant-design/pro-components";
import { useNavigate, useParams } from "react-router-dom";
import myAxios from "../../plugins/myAxios";
import { SecondTargetVO } from "../../models/SecondTargetVO";

const { Text } = Typography;

const TargetPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [secondTargetList, setSecondTargetList] = useState<SecondTargetVO[]>();
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [selectValue, setSelectValue] = useState<number>(0);
  const [selectValueList, setSelectValueList] = useState<number[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>();

  // 获取二级指标列表
  const getSecondTargetList = async () => {
    try {
      const res = await myAxios.get("/target/get/list", {
        params: { targetId: params.targetId },
      });
      if (res.code === 0 && res.data) {
        setSecondTargetList(res.data);
        setPercent((1 / res.data.length) * 100);
      }
    } catch (error) {
      Toast.show({ content: "获取二级指标失败" });
    }
  };

  // 点击前一项
  const previousButton = () => {
    setSelectValueList((prevList) => prevList.slice(0, prevList.length - 1));
    if (secondTargetList) {
      setPercent((targetIndex / secondTargetList?.length) * 100);
    }
    setTargetIndex(targetIndex - 1);
    setSelectValue(0);
  };

  // 点击下一项
  const nextButton = () => {
    const newSelectValue = selectValue; // 从某个地方获取新的元素值
    setSelectValueList((prevList) => [...prevList, newSelectValue]);
    if (secondTargetList) {
      setPercent(((targetIndex + 2) / secondTargetList?.length) * 100);
    }
    setTargetIndex(targetIndex + 1);
    setSelectValue(0);
  };

  // 提交
  const onSubmit = async () => {
    setIsSubmit(true);
    const scoreSum = selectValueList.reduce((acc, curr) => acc + curr, 0);
    const averageScore =
      (scoreSum + selectValue) / (selectValueList.length + 1);

    const scorePointRequest = {
      courseId: params.courseId,
      targetId: params.targetId,
      teacherId: params.teacherId,
      score: averageScore,
    };
    console.log(scorePointRequest);
    const res = await myAxios.post("/target/score/point", scorePointRequest);
    if (res.code === 0) {
      Toast.show({
        icon: "success",
        content: "评价成功",
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    getSecondTargetList().then();
  }, []);
  return (
    <>
      <div className="targetTitleContainer">
        {secondTargetList ? (
          <Text className="targetTitle">
            {secondTargetList[targetIndex].targetChineseName}
          </Text>
        ) : null}
      </div>
      <ProgressBar
        percent={percent}
        style={{
          width: "95%",
          margin: "5px auto",
        }}
      />
      <div className="checkList">
        <CheckCard.Group
          onChange={(value) => {
            if (value) {
              setSelectValue(parseInt(value as string));
            } else {
              setSelectValue(0);
            }
          }}
          style={{ width: "100%" }}
          value={selectValue}
        >
          <CheckCard title="很满意" value={5} style={{ width: "100%" }} />
          <CheckCard title="满意" value={4} style={{ width: "100%" }} />
          <CheckCard title="一般" value={3} style={{ width: "100%" }} />
          <CheckCard title="不满意" value={2} style={{ width: "100%" }} />
          <CheckCard title="很不满意" value={1} style={{ width: "100%" }} />
        </CheckCard.Group>
      </div>
      <div className="buttonGroup">
        <Button
          block
          shape="rounded"
          color="primary"
          size="large"
          onClick={previousButton}
          disabled={targetIndex === 0 || isSubmit}
        >
          上一项
        </Button>
        {targetIndex + 1 !== secondTargetList?.length ? (
          <Button
            block
            shape="rounded"
            color="primary"
            size="large"
            onClick={nextButton}
            disabled={selectValue === 0}
          >
            下一项
          </Button>
        ) : (
          <Button
            block
            shape="rounded"
            color="primary"
            size="large"
            onClick={onSubmit}
            disabled={selectValue === 0 || isSubmit}
          >
            提交
          </Button>
        )}
      </div>
    </>
  );
};

export default TargetPage;
