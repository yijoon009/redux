import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
import { actionCreator } from "../store";

function Home({ toDos, addToDo }) {
  //   console.log(toDos);
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addToDo(text);
    setText("");
    // console.log(text);
  };
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
}

// store.getState()랑 동일.
// redux state로부터 home(component)에 prop으로써 전달함
function mapStateToProps(state) {
  //mapStateToProps()는 Home으로 보내는 props에 return한 값을 추가될 수 있도록 허용
  // return {sexy:true};
  //   console.log(state, ownProps);
  return { toDos: state };
}

// store.dispatch()랑 동일.
function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreator.addToDo(text)),
  };
}

// connect(방금만든 function)(components)
export default connect(mapStateToProps, mapDispatchToProps)(Home);
