import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

//reducer는 data를 modify 하는 함수
//유일하게 data를 수정할 수 있는 function
//countModifier가 return 하는 값이 나의 application에 있는 data
const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

//createStore: 내가 변경할 data를 만들어 줌
//createStore는 반드시 함수를 넘겨받아야함
//countStore는 countModifier에서 리턴한 값 그 자체
const countStore = createStore(countModifier);

//dispatch는 countModifier에게 메세지를 보냄
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

console.log(countStore.getState());
