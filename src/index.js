// state의 data를 저장하는 store 생성
import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");


/* 
  !리덕스가 돌아가는 로직.

  1. store을 생성
  2. reducer 함수 생성 후 store 파라미터에 입력
  2-1. reducer의 파라미터는, (상태 초깃값, action) 여기서 action의 정의들은 아래 4번처럼 전달될 것.
  3. action(값을 변경해주게 함)을 생성 후 store 파라미터에 입력
  4. 위의 action을 store.dispatch({type: "somthing"})를 통해 reducer에 전달하여 값이 변경되게끔 설정.
  5. 이렇게 되면 리듀서를 통해 최종 업데이트 된 값을 store에 저장되고, store에 저장된 최종값을 getState()로 출력.
*/


// store에서 필수적으로 필요로 하는 reducer 함수 -> store의 파라미터로 들어갈 것임.
// reducer은 state의 data(값)를 modify하는 함수 --> reducer에서 리턴하는 값은 작업 중인 application의 최종값이 된다. 
//! 따라서 이 작업 중인 상태값을 주기적 업데이트 하고 싶다면 reducer 함수를 사용하면 될 것임.
const countModifier = (count = 0, action) => {  // return 할 count를 파라미터로 넣어주고  // count는 state임!!
  //! action: 여기에 수정할 state들을 입력한 후 아래와 같이 state를 리턴한다.  
  // reducer함수인 countModifier에 action을 어떻게 전달할까? 23번 줄을 보자. 23번처럼 설정 후 아래의 action에 값이 반영이 될 것임.
  // console.log(action)
  if (action.type === "ADD") {
    return count + 1;
  }
  else if (action.type === "MINUS") {
    return count - 1;
  }
  else {
    return count;
  }

  // // 최종 수정된 값은 아래와 같이 리턴이 되고, 그 값은 store에 저장이 된다.
  // return count;
};

// state의 data를 저장하는 store 생성
// console.log(countStore.getState) --> 리듀서 함수인 countModifier에서 리턴한 값이 출력이 된다.
const countStore = createStore(countModifier);

// reducer함수인 countModifier에 action을 전달하기 위해 store을 사용하여 dispatch로 action을 reducer함수에 보낸다.
countStore.dispatch({ type: "ADD" })
countStore.dispatch({ type: "ADD" })
countStore.dispatch({ type: "ADD" })
countStore.dispatch({ type: "ADD" })
countStore.dispatch({ type: "ADD" })
countStore.dispatch({ type: "MINUS" })


// 최종 state 값. (store에 저장된 최근 변경된 값을 출력.)
console.log(countStore.getState());

/*

! 리덕스 적용 전 바닐라 스크립트  --> redux의 reducer에 새롭게 작성될 것임.

let count = 0;

number.innerText = count;  // 0에서 +,-된 값으로 초기화 /  이 작업은 버튼을 아무리 많이 눌러도 한 번만 작동이 되기 때문에 아래와 같이 함수로 만들어주어 업데이트 해줘야 함.

const updateText = () => {  // number.innerText는 한 번만 일어나기 때문에 함수로 만들어주어 값이 변경될 때마다 업데이트를 해줘야 한다.
  number.innerText = count;
}

const handleAdd = () => {
  count = count + 1;
  updateText();
};


const handleMinus = () => {
  count = count - 1;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);  */