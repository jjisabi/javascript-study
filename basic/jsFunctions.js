console.log("------------------------------1.일급 함수------------------------------")
//1. 변수의 값으로 할당가능하다. -> 하나의 값으로 취급
const sum1 = function (){
    const a = 1;
    const b = 1;
    return a + b;
};

console.log(sum1);             // func1 함수 자체 반환 -> 함수를 하나의 값으로 취급
console.log(sum1());           // func1의 결과 값 반환

//2. 함수의 인자로 받을 수 있다. -> 콜백 함수로 이용
//예제1
function sum2(a, b, callback){
    const result = a + b;
    callback(result);
}

sum2(10,10, function (result) {
    console.log(result);
})

sum2(5,5,(result) => {
    console.log(result);
})

//예제2
function dogs() {
  console.log("멍");
}

function cats() {
  console.log("냥");
}

function sound(type, dogs, cats) {
  if(type === 'dogs') {
    dogs();
  } else if(type === 'cats') {
    cats();
  }
}

sound('dogs', dogs, cats);

//3. 함수의 리턴 값으로 리턴할 수 있다. -> 클로저에 이용
function sum3(){
     return sum1();
}

console.log(sum3());

const sum4 = sum1;
console.log(sum4());

console.log("------------------------------2.고차 함수------------------------------")
const arr = [1, 2, 3, 4];
const newArr = [];

//고차 함수 사용 x
for(let i=0; i<arr.length; i++) {
    newArr.push(arr[i] * 2);
}
console.log(newArr);

//고차 함수 사용 o
//콜백함수를 인자로 받는 map은 고차함수, (item) => {return item *2}는 콜백함수
var newArr2 = arr.map((i) => {return i * 2});
console.log(newArr2);

console.log("---------------------------3.순수/비순수 함수---------------------------")
//JavaScript는 기본적으로 멀티 패러다임 언어인데 그 중 순수함수, 일급함수, 고차함수,  등을 사용하여 함수형 프로그래밍이 가능하게 한다.
//순수함수를 지향하되 100% 순수함수로 작성하는 것은 불가능

console.log("3_1.외부 함수 참조하는 비순수함수 순수함수로 변경")
//비순수
var c = 10;
function sum (a,b){
    const sum = a + b + c;
    return sum;
}

console.log(sum(10, 10));

//순수
function pureSum (a,b){
    const c = 1;
    const sum = a + b + c;
    return sum;
}

console.log(pureSum(10, 10));
    
console.log("3_2. 함수의 인자로 받은 값을 변경하는 비순수 함수를 순수 함수로 변경")
const arr2 = [1,2,3,4,5];

//비순수
const add = (arr2) => {
  arr2.push("add");
  return arr2;
};
const newArr3 = add(arr2);
console.log(arr2);
console.log(newArr3);

//순수
const arr3 = [1,2,3,4,5];
const pureAdd = (arr3) => {
    const copyArr = [...arr3];
    copyArr.push("add");
    return copyArr;
}
const newPureArr = pureAdd(arr3);
console.log(arr3);
console.log(newPureArr);

const pureObj = {str: "abc", num: 123};
const pureFunc = (pureObj) => {
    const copyObj = {...pureObj};
    copyObj.str = "aaa";
    console.log(copyObj);
}

pureFunc();
console.log(pureObj);