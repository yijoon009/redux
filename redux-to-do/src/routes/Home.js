import React, { useState } from "react";
import { connect } from "react-redux";

function Home(props) {
  console.log(props);
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul></ul>
    </div>
  );
}

// function 내용은 getCurrentState하는 함수
// redux state로부터 home(component)에 prop으로써 전달함
function mapStateToProps(state) {
  //mapStateToProps()는 Home으로 보내는 props에 return한 값을 추가될 수 있도록 허용
  // return {sexy:true};
  //   console.log(state, ownProps);
  return { toDos: state };
}

// connect(방금만든 function)(components)
export default connect(mapStateToProps)(Home);
