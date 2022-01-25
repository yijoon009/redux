import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 14. dispatch에 들어갈 파라미터(object)만 리턴하는 함수
// 이거 만들면서 원래 addToDo 이름을 dispatchAddToDo로 변경
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// 3. reducer는 두개의 arguments 가져
// 4. current state, action
const reducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_TODO:
      //더 간단하게
      // return [...state, { text: action.text, id: Date.now() }];
      const newToDoObj = { text: action.text, id: Date.now() };
      return [...state, newToDoObj];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

// 1. createStore
// 2. reducer 작성해
const store = createStore(reducer);

// 6. store가 변하는지 한번 확인해보자
store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  // console.log(e.target.parentNode.id);
  const id = parseInt(e.target.parentNode.id);
  // 13. {type:DELETE_TODO, id} 이런걸 다시 refactoring 해보자
  // 이런건 주로 reducer 바로 위에 선언
  store.dispatch(deleteToDo(id));
};

// 9. toDo를 페인트칠해보자
const paintToDos = () => {
  const toDos = store.getState();
  // 10. 매번 store가 변할때마다 paintToDos가 실행되니까
  // 아예 ul html을 지워버리고 매번 새로 작성시키자
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    // 11. to do를 삭제하기위해서 버튼필요해
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    // 12. deleteToDo 함수 생성
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// 8. todo를 delete 하기위해 paintToDos가 변하는지 확인해보자
store.subscribe(paintToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";

  // 5. store에 dispatch보내
  // store.dispatch({ type: ADD_TODO, text: toDo });
  // 7. 위에 줄을 addToDo로 function화 시키는 refactoring 진행
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
