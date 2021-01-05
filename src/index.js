const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

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
minus.addEventListener("click", handleMinus); 