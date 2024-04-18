console.log("------------------------------1.var------------------------------")
console.log("1_1.변수 선언 방식")
var varNum = 1;
varNum = 2;
console.log(varNum);        //2

var varNum = 3;
console.log(varNum);        //3

console.log("1_2.스코프")
function varFunc(){
    var aa = "aa";
    if(true){
        var a = "a";
        console.log(a);     //a
    }
    console.log(a);         //a
    console.log(aa);
}
varFunc();                  
//console.log(a);             //ReferenceError: a is not defined

console.log("1_3.호이스팅")
console.log(varStr);        //undefined
var varStr = "HelloWorld";


console.log("------------------------------2.let------------------------------")
console.log("2_1.변수 선언 방식")
let letNum = 1;
//재선언 불가능
//let letNum = 2;
letNum = 2;
console.log(letNum);  //2

console.log("2_2.스코프")
function letFunc(){
    if(true){
        let b = "b";
        console.log(b);
    }
    //console.log(b);  //ReferenceError: a is not defined
}
//console.log(b);   //ReferenceError: a is not defined
letFunc();

console.log("2_3.호이스팅")
//호이스팅이 발생하긴 하지만 다르게 동작함에 따라 에러 발생
//console.log(letStr);
let letStr = "HelloWorld";

console.log("------------------------------3.const------------------------------")
console.log("3_1.변수 선언 방식")
const constNum = 1;
console.log(constNum);
// 재선언, 재할당 불가능
//const constNum = 2;
//constNum = 2;

//호이스팅이 발생하긴 하지만 다르게 동작함에 따라 에러 발생
//console.log(constStr);          
//const constStr = "HelloWorld";

console.log("3_2.재할당이 불가능한 const에서도 속성은 변경할 수 있다.")
const obj = {str: "a", num: 123};
obj.str = "b";

console.log(obj.str);       //b

//obj = {str: "c", num: 456 };    TypeError: Assignment to constant variable.

const obj2 = {freezeStr: "a", freezeNum: 123};
Object.freeze(obj2);

obj2.freezeStr = "b";
console.log(obj2);      //{freezeStr: 'a', freezeNum: 123}

//중첩객체에서는 Object.freeze() 적용 안됨 (깊은 복사 x)
const obj3 = {deepFreeze: {freezeStr: "a"}};
Object.freeze(obj3);

obj3.deepFreeze.freezeStr = "변경";
console.log(obj3.deepFreeze.freezeStr);     //변경