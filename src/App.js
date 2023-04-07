import { useState, useEffect } from "react";
import 'animate.css';

const title = {
  color: "tomato",
  textAlign:"center",
};

const input = {
  buttonAdd: { background: "tomato", color: "#fff" },
  borderLeft: "1px solid #000",
  flexDirection: "",
  outline: 0,
  padding: 0,
  fontSize: 20,
  border: "0px solid",
  height: 30,
  background: "#ccc",
  margin: 0
};
function AddToList(props) {
  const handleData = (e) =>
    props.onChange([
      ...props.data,
      { id: props.data.length, name: name, profession: profession }
    ]);

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("mathematician");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        style={input}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
      />
      <select style={input} onChange={(e) => setProfession(e.target.value)}>
        <option value="mathematician">mathematician</option>
        <option value="chemist">chemist</option>
        <option value="physicist">physicist</option>
      </select>
      <button style={{ ...input, ...input.buttonAdd }} onClick={handleData}>
        Add
      </button>
    </div>
  );
}

function ShowList(props) {
  const [profession, setProfession] = useState("all");

  const handleChange = (e) => {
    //set selected profession to useState
    setProfession(e.target.value);

    // animate list of profession with animate.css library
    const animationName = props.animationName || 'zoomIn';
    const element = document.querySelector('.allData');
    element.classList.add('animate__animated', `animate__${animationName}`);
    element.addEventListener('animationend', () => {
      e.stopPropagation();
      element.classList.remove(`animate__animated`, `animate__${animationName}`);
    });

  }
 
  // list that contain all filtered data
  const listItems = props.data.filter(
    (person) => person.profession === profession || profession === "all"
  );
  const filteredData = listItems.map((item) => (
    <li key={item.id}>
      {item.name} / {item.profession}
    </li>
  ));
  return (
    <>
      <select style={{...input,width:"100%"}} onChange={handleChange}>
        <option value="all">all</option>
        <option value="mathematician">mathematician</option>
        <option value="chemist">chemist</option>
        <option value="physicist">physicist</option>
      </select>
      {filteredData.length > 0 ? (
        <>
          <p>List of `{profession}`</p>
          <ul className={"allData"}>{filteredData}</ul>
        </>
      ) : (
        <p> No match data</p>
      )}
    </>
  );
}

export default function App() {
  const [data, setData] = useState([]);
   useEffect(() => {
      const dataFetch = async () => {
        const data = await (
          await fetch(
            "https://raw.githubusercontent.com/xmaddev/loginNew/main/data.json"
            )
        ).json();
  
        // set state when the data received
        setData(data.data);
      };
  
      dataFetch();
    }, []);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60px",
          background: "tomato"
        }}
      ></div>
      <div style={{ width: "200px", margin: "0 auto" }}>
        <div>
          <h1 style={title}>Add some data</h1>
          <AddToList
            style={{ flexDirection: "row" }}
            data={data}
            onChange={setData}
          />
          <h1 style={title}>
            <br />
            Show list of{" "}
          </h1>
          <ShowList data={data} animationName={"zoomIn"}/>
        </div>
      </div>
    </>
  );
}
