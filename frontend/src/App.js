import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
function App() {
  useEffect(() => {
    fetch("/api/values", { method: "GET" }).then((response) => {
      console.log("response", response);
      setLists(response.json().data);
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
    fetch("/api/value", {
      method: "POST",
      body: JSON.stringify({
        value: value,
      }),
    }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        setLists([...lists, response.json().data.value]);
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
