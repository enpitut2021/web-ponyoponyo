import React, { useRef } from "react";
import axios from "axios";

const episode_page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputEl1 = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputEl2 = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    axios({
      method: "POST",
      url: "https://api.digital-future.jp/episode",
      data: {
        user_id: inputEl1.current!!.value,
        desc: inputEl2.current!!.value,
      },
    }).then((response) => console.log("response body:", response.data));
  };

  return (
    <>
      <div>
        <input
          ref={inputEl1}
          type="text"
          placeholder={"create user name here"}
        />
        <br />
        <input ref={inputEl2} type="text" placeholder={"input espisode here"} />
        <button onClick={handleClick}>登録</button>
      </div>
    </>
  );
};
export default episode_page;
