import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../../../api/discussion";
import Button from "../../ui/Button";
import TextInput from "../../ui/TextInput";

const Establish = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    console.log("ディスカッションを作成");
    createDiscussion(data.discussionTitle)
      .then((discussionId) => {
        console.log("完了", discussionId);
        navigate(`/${discussionId}`);
      })
      .catch((error) => {
        console.log("失敗");
        setError(`ディスカッションの作成に失敗しました(${error})`);
      });
  };

  return (
    <div>
      <h1>ディスカッションを始める - sugit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="#discussion_title">ディスカッション名: </label>
        <TextInput
          id="discussion_title"
          register={register}
          label="discussionTitle"
          required
        />
        <Button type="submit">ディスカッションを開始</Button>
      </form>
      {error ? <div>error</div> : null}
    </div>
  );
};

export default Establish;
