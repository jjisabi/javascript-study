console.log("------------------------------1. 변수 선언 방법------------------------------")    
//변수 선언
var a;

//선언한 변수에 데이터 할당
a = 10;

//변수 선언과 할당 동시에 -> 변수 초기화
var a = 10;

console.log("------------------------------2. 기본형/참조형 데이터 데이터 저장 방법------------------------------")
//기본형 데이터에서 값 변경 시 새로운 데이터 공간에 저장하여 완전히 별개의 데이터가 된다. => 불변성
var a = "abc" ; //@100
a = a + "def";  //@200

var b = 5;      //@300
var c = 5;      //@300

b = 7;          //@400

//참조형 데이터에서 값 변경 시 프로퍼티를 변경하는 것으로 변수 obj가 참조하고 있는 주소값은 동일하다. 프로퍼티 값이 변경될 수 있다. => 가변성
var obj = {a: "a", b: 123};
console.log("before: " + obj.a);        //a
obj.a = 2;
console.log("after: " + obj.a);         //2

console.log("------------------------------3. 참조형 데이터 복사------------------------------")
//1. 객체의 프로퍼티 변경 시
var a1 = 10;
var b1 = a1;
console.log("b1: " + b1)    //10

var obj1 = {c: 10, d: 'ddd'};
var obj2 = obj1;
console.log("obj1.c: " + obj1.c)    //10
console.log("obj2.c: " + obj2.c)    //10

b1 = 15;
console.log("a1: " + a1)    //10
console.log("b1: " + b1)    //15

obj2.c = 20;
console.log("obj1.c: " + obj1.c)    //20
console.log("obj2.c: " + obj2.c)    //20

//2. 객체 자체를 변경했을 때
var obj3 = obj1;

obj3 = {...obj1, c:30};
console.log("obj1.c: " + obj1.c)    //20
console.log("obj3.c: " + obj3.c)    //20

console.log("------------------------------4. 참조형 데이터의 가변성 문제점과 해결------------------------------")
var user = {name: "짱구", pwd: 1234};

function changePwd(user, newPwd){
  var newUser = user;
  newUser.pwd = newPwd;

  if(user.pwd === newUser.pwd){
    console.log("새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.");
  }else{
    return newUser;
  }
}
var user2 = changePwd(user, 5678);
console.log("pwd 변경 전: " + user.pwd);
//console.log("pwd 변경 후: " + user2.pwd);   //user2 undefined


//문제 해결
function changePwdSolution(user, newPwd){
  var newUser = user;
  newUser = {...user, pwd: newPwd};

  if(user.pwd === newUser.pwd){
    console.log("새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.");
  }else{
    return newUser;
  }
}

var user3 = changePwdSolution(user, 4321);
console.log("pwd 변경 전: " + user.pwd);
console.log("pwd 변경 후: " + user3.pwd);


console.log("------------------------------null, undefined------------------------------")
var aa;
console.log(aa);      //undefined

var aObj = {a: 1};
console.log(aObj.b);  //undefined

//반환값 없는 함수는 undefined를 반환한 것으로 간주
var func = function () {};
console.log(func());  //undefined

//배열객체(var arr1 = []; 이렇게 적는 것들)는 실제로 Array 생성자 함수를 사용하여 생성 됨. Prototype에서 배웠다 ! 
//생성자 함수 Array로 인스턴스 arr1을 만들고 arr1은 Array가 가지고 있는 prototype을 사용한다.
var arr1 = new Array(3);  
console.log(arr1);   // , ,

//null은 기본형이지만 typeof로 접근하면 object가 출력된다. 
//따라서 변수의 값이 null인지 판별하려면 typeof나 동등연산자(==)말고 일치연산자(===)로 판별해야 한다.
var bb = null;
console.log(bb);
console.log (typeof bb);

console.log(null == undefined);
console.log(null === undefined);
console.log(bb === null);

console.log("------------------------------깊은 복사 구현은 'deepCopy.js'에 따로------------------------------")    