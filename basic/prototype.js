//객체 생성 방법 1)객체리터럴 이용 2)생성자 이용
//리터럴은 일종의 숏컷이고 둘 다 Object 타입을 갖는 객체로 Object 타입의 메서드인 hasOwnProperty, toString, valueof등을 사용할 수 있다. Object 타입은 모든 객체의 최상위 타입이다.
//자바스크립트에서 상속개념으로 설명하자면 생성한 두 객체는 Object 생성자의 '프로토타입'을 상속받은 객체
var objMadeByLiteral = {};
var objMadeByConstructor = new Object();

var a = {
    attr1: 1
}

var b = {
    attr2:2
}
console.log(b.attr1);   //undefined

b.__proto__ = a;
console.log(b.attr1);   //1

//__proto__ 속성은 [[Prototype]]이 노출 된 것인데 예전 스펙에 legacy, 예제에서는 __proto__를 사용하여 직접 참고하지만 Object.getPrototypeof() 이용해서 참조

//상속: 어떤 객체의 프로퍼티, 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것이며 자바스크립트는 프로토타입 기반 객체지향 프로그래밍 언어로, 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다.
//생성자 함수를 통해 동일한 프로퍼티, 메서드 구조를 갖는 객체 여러개를 생성할 수 있다.
//불필요한 중복 제거
function Friend(name){
    this.name = name;
    this.introduce = ()=>{
        return "안녕하세요" + this.name + "입니다."
    }
}

const friend1 = new Friend("짱구");
const friend2 = new Friend("철수");

console.log(friend1.introduce === friend2.introduce);   //false 인스턴스 생성할 때마다 introduce 메서드를 중복 생성 함 -> 불필요한 중복, 성능 저하 및 메모리 낭비

function PrototypeFriend(name){
    this.name = name;
}

//PrototypeFriend 생성자 함수의 prototype 프로퍼티로 프로토타입에 접근하여 공유 메서드 introduce 생성
PrototypeFriend.prototype.introduce = () => {
    return "안녕하세요" + this.name + "입니다."
}

//PrototypeFriend 생성자 함수가 생성한 모든 인스턴스는 부모 객체 역할을 하는 프로토타입 PrototypeFriend.prototype으로 introduce 메서드를 상속 받는다.
const friend3 = new PrototypeFriend("짱구");
const friend4 = new PrototypeFriend("짱구");
console.log(friend3.introduce === friend4.introduce);   //true 두 인스턴스 모두 같은 메서드 소유하여 불필요한 중복 사라짐

//프로토 타입은 객체 간 상속을 구현하기 위해 사용되고 부모의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티, 메서드를 제공한다.
//자바스크립트 객체는 하나의 프로토타입을 가진다.(Object) , 모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지고 이 내부 슬롯의 값이 프로토타입의 참조이다. (Array -> Object)
//[[Prototype]] 접근 방법: [[Prototype]]에 직접 접근할 수는 없지만 __proto__ 프로퍼티로 간접적으로 접근할 수 있다.
//객체와 생성자 함수, 프로토타입은 서로 연결되어 있다.
//프로토 타입 = [[Prototype]]의 값
//1. 객체는 __proto__ 프로퍼티를 통해 프로토타입은 접근할 수 있다.
//2. 생성자 함수는 자신이 가지고있는 prototype 프로퍼티를 통해 프로토타입은 접근할 수 있다.
//3. 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있다.

//프로퍼티 3가지
//1. __proto__ 프로퍼티
const obj = {};
const parent = {x: 1};

console.log(obj.__proto__);

obj.__proto__ = parent;
console.log(obj.__proto__); //{x:1}

//2. protpotype 프로퍼티
//: 함수 객체만이 protpotype 프로퍼티를 소유하며 생성자 함수가 생성하는 인스턴스의 프로토타입을 가리킨다. 화살표 함수는 프로토타입 생성 x
console.log(PrototypeFriend.prototype === friend3.__proto__);   //true

//3. constructor 프로퍼티
//모든 프로토타입은 constructor 프로퍼티를 가지고, 이 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.
console.log(friend3.constructor == PrototypeFriend);    //true

console.log(friend3.hasOwnProperty("name")); //true

console.log("------------------------------Prototype 기본------------------------------")
//예제1
function Person(name, age){
    this.name = name;
    this.age = age;
}

var person1 = new Person("짱구", 5);

Person.prototype.getName = function(){
    return this.name;
}

console.log("undefined: " + person1.__proto__.getName());   //this 바인딩 할때 .메소드는 메소드 앞에 있는 객체가 this이고 person1.__proto__ 는 아직 정의되어 있지 않기 때문에 undefined (에러는 x)

person1.__proto__.name = "짱구";
console.log(person1.__proto__.getName());                   //person1.__proto__ 객체의 name 지정해주었으므로 name 출력 가능

var person2 = new Person('짱아', 2);
console.log(person2.getName());                            //__proto__없이 인스턴스에서 곧바로 메서드 쓰면 this를 인스턴스로 할 수 있어서 바로 name 출력 가능 -> __proto__ 생략 가능


//예제2
function Human (name, age){
    this.name = name;
    this.age = age;
}

Human.prototype.getName = function (){              //프로토타입에 메서드를 연결한 형태
    console.log(this.name);
}

function Zzang (name, age){
    Human.call(this , name);
}

Zzang.prototype = Object.create(Zzang.prototype);                   //Human.prototype에 연결된 메서드를 Zzang의 __proto__로 상속
Zzang.prototype.constructor = Zzang;                                //Zzang.prototype의 constructor에 Zzang으로 prototype을 재할당 -> 생성자는 Zzang이 된다.

Zzang.prototype.getName = function(){
 Human.prototype.getName.call(this);
 console.log("I am " + this.name);
}

var zzang = new Zzang("신짱");
zzang.getName();




console.log("------------------------------prototype contructor------------------------------")
//constructor 프로퍼티
var arr1 = [1,2];
console.log(Array.prototype.constructor); //Array

console.log(Array.prototype.constructor === Array);     //true
console.log(arr1.__proto__.constructor === Array);      //true
console.log(arr1.constructor === Array);                //true

var arr2 = new arr.constructor(3,4);
console.log(arr2);

//constructor 변경
var NewConstructor = function () {
    console.log("this is new constructor");
};

var dataType = [
    1,
    "test",
    true,
    {},
    [],
    function (){},
    /test/,
    new Number(),
    new String(),
    new Boolean(),
    new Array()
];

dataType.forEach(function (item) {
    item.constructor = NewConstructor;
    console.log(item.constructor.name, "&", item instanceof NewConstructor);        //constructor를 변경하더라도 참조하는 대상이 변경 될 뿐 인스턴스의 원형이나 데이터 타입이 변하는 것은 아님.
});


//원형은 그대로
var Person2 = function (name) {
    this.name = name;
};

var p1 = new Person2("사람1");                           //{name: "사람1"} true
var p1Proto = Object.getPrototypeOf(p1);                //
var p2 = new Person2.prototype.constructor("사람2");
var p3 = new p1Proto.constructor("사람3");
var p4 = new p1.__proto__.constructor("사람4");
var p5 = new p1.constructor("사람5");

[p1, p2, p3, p4, p5].forEach((item) => {
    console.log(item, item instanceof Person2);
})


console.log("------------------------------프로토타입 체인------------------------------")
//예제1 메서드 오버라이드
//메서드 오버라이드 - 메서드 위에 메서드를 덮어씌움, 원본은 그대로 있는 상태에서 그 위에 얹은 것.
//교체는 원본에 접근할 수 없는 형태이지만 언즌ㄴ 형태는 원본이 유지되어 원본에 접근할 수 있다. 
var Person3 = function (name){
    this.name = name;
};

Person3.prototype.getName = function (){
    return this.name;
};

var iu = new Person3("지금");
iu.getName = function (){
    return "바로" + this.name;
}

//가장 가까운 프로퍼티 검색하고 그 다음 가까운 대상 검색
console.log(iu.getName());  //바로지금

//메서드 오버라이딩 된 상황에서 prototype에 있는 메서드 접근
console.log(iu.__proto__.getName());


//예제2 프로토타입 체인
// *** 어떤 생성자 함수이든 prototype은 반드시 객체이기 때문에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재한다. ***

console.log("------------------------------다중 프로토타입 체인------------------------------")
var Grade = function () {
    var args = Array.prototype.slice.call(arguments);
    for(var i = 0; i < args.length; i++){
        this[i] = args[i];
    }
    this.length = args.length;
};

var g = new Grade(100, 80);
Grade.prototype = [];

console.log(g);     // Grade {0: 100, 1: 80, length: 2}
g.pop();
console.log(g);
g.push(90);
console.log(g);