console.log("------------------------------1. 호이스팅------------------------------")
console.log("1_1.변수 선언 키워드에 따른 호이스팅 비교")
console.log("a: " + a);             //undefined - 키워드 var여서 호이스팅이 되어 에러 발생 안함. 아직 값을 넣지는 않고 var a; 변수 선언만 된 상태이므로 undefined 반환
console.log("aa: " + aa);           //undefined
//console.log("aaa: " + aaa);         //ReferenceError - let, const 호이스팅 안됨
console.log("func: " + func());     //1
//console.log("b: " + b());         //TypeError: b is not a function

var a = 1;
var aa;
let aaa;

function func(){
    return 1;
}

var b = () => {return 1};

console.log("1_2.호이스팅 문제점 - var 키워드, 함수 선언식")
console.log(sum(1,1));    //2 -> sum: 2

function sum(a, b){
  return a + b;
}

console.log(sum(1,1));

//함수 선언식으로 정의 시 함수 내용을 덮어쓸 수 있어 해당 함수를 사용하는 모든 곳에서 값이 변경된다. -> 어디서 변경되었는 지 찾기 어려움
function sum(a,b){
  return "sum: " + (a + b);
}

console.log(sum(1,1));

//함수 표현식으로 정의 시 덮어씌우지 않음
var sum2 = function (a,b) {
  return a + b;
}

console.log(sum2(10, 10));

var sum2 = function(a,b){
  return "sum2: " + (a + b);
}

console.log(sum2(10, 10));


// ** 정리 **
// -. 가급적 함수, 변수를 코드 상단부에 선언하면 호이스팅으로 인한 스코프 꼬임 현상 방지 가능
// -. let, const 키워드를 사용하고 함수는 함수 선언식으로 작성하자 !
// -. 함수 선언식 대신 함수 표현식을 사용하자 !

console.log("------------------------------2. 스코프------------------------------")
//예제1
console.log("2_1. 상위 스코프 -> 하위 스코프 접근 불가능")
var scope_a = 1;
var outer = function(){
  var ineer = function(){
    console.log(scope_a);   //undefined
    var scope_a = 3;
    var scope_b = 5;
  };
  ineer();
  console.log(scope_a);   //1 
  //console.log("하위 스코프 접근 불가능" + scope_b); //ReferenceError: scope_b is not defined
};
outer();    
console.log(scope_a); //1

console.log("2_2. 스코프는 함수를 선언한 시점에 결정된다.")
//예제1
var scope_aa = "global";

function scope_func1() {
  var scope_aa = "local";
  scope_func2();
}

function scope_func2(){
  console.log(scope_aa);
}

scope_func1();    //golbal 함수를 선언한 시점에 스코프 결정, 함수가 중첩되어 있을 때, 내부 함수 내에 해당 변수가 존재하지 않을 경우 상위 스코프에서 해당 변수 찾음
scope_func2();    //global 


//예제2
let z = "global";

function func1() {
    let z = "local";
    console.log(z);     //Local Vriable
    func2();
}

function func2() {
    console.log(z);   //Global Variable
}

func1();


console.log("2_3. 전역 스코프")
var x = 15;

var xFunc = () => {console.log(x)}

xFunc();

console.log("2_4. 지역 스코프 - 함수/블록 스코프")
const y = 20;

var yFunc = () => {
  const y = 25;
  if(true) {
    const y = 30;
    const xx = 35;
    console.log(y); //30
  }
  console.log(y);   //25
  //console.log(xx);  //ReferenceError -> var 변수이면 외부에서 내부 변수 정보도 가지고 올 수 있음
}
console.log("y: " + y); //20

yFunc();