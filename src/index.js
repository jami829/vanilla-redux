// state의 data를 저장하는 store 생성
import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;  // 이렇게 초기 설정을 하지않으면 초기에 아무런 숫자도 렌더가 되지않아있을것임

/* 
  !리덕스가 돌아가는 로직.

  1. store을 생성
  2. reducer 함수 생성 후 store 파라미터에 입력
  2-1. reducer의 파라미터는, (상태 초깃값, action) 여기서 action의 정의들은 아래 4번처럼 전달될 것.
  3. action(값을 변경해주게 함)을 생성 후 store 파라미터에 입력
  4. 위의 action을 store.dispatch({type: "somthing"})를 통해 reducer에 전달하여 값이 변경되게끔 설정.
  5. 이렇게 되면 리듀서를 통해 최종 업데이트 된 값을 store에 저장되고, store에 저장된 최종값을 getState()로 출력.
  6. subscribe로 innerText와 함께 렌더될 값을 설정

  dispatch: 우리가 store와 커뮤니케이션을 하게 도와줌
  subscribe: 우리가 변화는 것을 구독하게끔해줌  (69번 줄 참고)
*/


// store에서 필수적으로 필요로 하는 reducer 함수 -> store의 파라미터로 들어갈 것임.
// reducer은 state의 data(값)를 modify하는 함수 --> reducer에서 리턴하는 값은 작업 중인 application의 최종값이 된다. 
//! 따라서 이 작업 중인 상태값을 주기적 업데이트 하고 싶다면 reducer 함수를 사용하면 될 것임.
const countModifier = (count = 0, action) => {  // return 할 count를 파라미터로 넣어주고  // count는 state임!!
  //! action: 여기에 수정할 state들을 입력한 후 아래와 같이 state를 리턴한다.  
  // reducer함수인 countModifier에 action을 어떻게 전달할까? 23번 줄을 보자. 23번처럼 설정 후 아래의 action에 값이 반영이 될 것임.
  // console.log(count, action)
  /* 
  ? if문 아래에 switch 구문으로 리팩토링 할 것임.
    if (action.type === "ADD") {
      return count + 1;
    }
    else if (action.type === "MINUS") {
      return count - 1;
    }
    else {
      return count;
    } */
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return count - 1;
    default:
      return count;
  }
  // // 최종 수정된 값은 아래와 같이 리턴이 되고, 그 값은 store에 저장이 된다.
  // return count;
};

// state의 data를 저장하는 store 생성
// console.log(countStore.getState) --> 리듀서 함수인 countModifier에서 리턴한 값이 출력이 된다.
const countStore = createStore(countModifier);

// reducer함수인 countModifier에 action을 전달하기 위해 store을 사용하여 dispatch로 action을 reducer함수에 보낸다.
// countStore.dispatch({ type: "ADD" })
// countStore.dispatch({ type: "ADD" })
// countStore.dispatch({ type: "ADD" })
// countStore.dispatch({ type: "ADD" })
// countStore.dispatch({ type: "ADD" })
// countStore.dispatch({ type: "MINUS" })

// 해당 버튼을 누르게 되면 dispatch가 작동해 reducer에 action 의 정의를 전달하게 된다. (-> redecer은 그 action을 토대로 state를 업데이트하고 store에 저장하게 된다.)
const handleAdd = () => {
  countStore.dispatch({ type: "ADD" })
}
const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" })
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// subscribe : 우리에게 store 안에 있는 변화들을 확인할 수 있게해줌.
// 이것을 이용해서 바로 innerText로 변화한 값이 즉각 렌더되도록 할 것임.
const onChange = () => {
  // console.log("오오옹ㄴ체이이니지지")
  // console.log(countStore.getState());
  // 렌더가 될 number를 업데이트 시켜주자!
  number.innerText = countStore.getState();
}
countStore.subscribe(onChange);  // 이렇게 해줘야 onChange의 변경되는 값, 즉 store안에 변경되는 값들을 확인할 수 있음, 안해주면 아무리 onChange함수를 사용하더라도 확인 불가.
                                // onChange 함수는 store에 변화가 있을 때마다 감지해서 불려지는건데, 이게 subscribe 역할이 큼




// 최종 state 값. (store에 저장된 최근 변경된 값을 출력.)
// console.log(countStore.getState());

/*

! 리덕스 적용 전 바닐라 스크립트  --> 위와 같이 redux의 reducer에 새롭게 작성될 것임.

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



/*
  정리

  1. reducer 함수는 현재 상태의 값과 함께 불려지는 function ex) count = 0 혹은 업데이트 된 현재 상태 값.
  1-1. action과 함께 불려지며, 이는 reducer 함수와 소통하는 도구. 사용법?이라고 생각해도 되겠다.("이 타입의 action은 **을 위한 것이다.")
  즉, reducer 함수는 current state 와 action이 함께 불려짐.
  1-2. reducer이 return하는 것은 application의 현재 상태값이 된다.

  2. action 을 reducer에 보내는 방법은 dispatch를 이용한다.
  2-1. action은 무조건 객체이어야만 한다.
  2-2. action은 type이 있어야 한다.
  2-3. dispatch가 리듀서를 불러서 current state(현재 상태값)와 내가 보낸 action을 더해 작동시킨다.

  3. 만약 내가 change를 store에서 감지하고 싶다면, 그 change를 "구독"하면 된다.
  3-1. onChange 함수를 생성하여 그 안에 innerText를 사용. -> html을 업데이트 할 수 있게 해주는 function
*/