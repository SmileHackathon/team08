import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../../../api/discussion";
import Button from "../../ui/Button";
import TextInput from "../../ui/TextInput";

import styles from "./style.module.css"

import logo from "./logo.png";

const Establish = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    // console.log("ディスカッションを作成");
    createDiscussion(data.discussionTitle)
      .then((discussionId) => {
        // console.log("完了", discussionId);
        navigate(`/${discussionId}`);
      })
      .catch((error) => {
        // console.log("失敗");
        setError(`ディスカッションの作成に失敗しました(${error})`);
      });
  };

  return (
    <><div style={{background: "#f4f4f4"}}>
      <header style={{ height: 50, background: "#f4f4f4" ,textAlign: "center"}}>
      <h1>SuggIt!</h1>
      <img src={logo} alt="S mark logo" />
      </header>
      <div id="main" style={{ height: 420 ,background:"#fff"}}>
      </div><div className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="#discussion_title" className={styles.simple_text}>部屋名を入れてね</label>
          <TextInput
            id="discussion_title"
            register={register}
            label="discussionTitle"
            required />
        </form>
        {error ? <div>error</div> : null}
        <div>
          <Button type="submit">ディスカッションを開始</Button>
        </div>
      </div>

      <footer style={{ height: 40,background: "#f4f4f4", color: "#fff" }}>
      </footer>
      </div></>
  );
};

export default Establish;
