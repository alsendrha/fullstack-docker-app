import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
function App() {
  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log("여긴 유즈이펙트", response);
      setLists(response.data);
    });
  }, []);
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
    console.log("value", value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("/api/value", { value: value }).then((response) => {
      if (response.data.success) {
        console.log("여긴 서브밋 핸들러", response.data.value);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("값을 DB에 넣는데 실패했습니다.");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
