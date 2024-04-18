//중첩 객체를 위한 참조형 데이터 변수 초기화
const originArray = [1, 2, [3, 4]];

const originFunc = function(){console.log("test")};

const originDate = new Date();

const originMap = new Map([["a", 1],["b", 2]]);

const originSet = new Set([1, 2, 3, 4]);

const originObj = {
        str: "a",
        num: {one: 1, two: 2},
        primitiveNull: null, 
        obj: {
            objArray: originArray,
            objFunc: originFunc,
            objDate: originDate,
            objRegExp: /\d{3}-\d{4}-\d{4}/,
            objMap: originMap,
            objSet: originSet
        }
    }

//깊은 복사 함수로 객체 copy    
let copyObj = deepCopy(originObj);

//깊은 복사 함수
function deepCopy(param){
    if(typeof param !== "object" || param === null){
        return param;
    }

    if(Array.isArray(param) === true){
        const copyArr = [];
        param.forEach((i) => copyArr[i] = deepCopy(param[i]));
        return copyArr;
    }

    if(param instanceof Date){
        let copyDate = new Date(param.getTime());
        return copyDate;
    }

    if(param instanceof Map){
        const copyMap = new Map();
        for (let key of param) {
            copyMap.set(deepCopy(key));
        }
        return copyMap;
    }

    if(param instanceof Set){
        const copySet = new Set();
        for(let key of param){
            copySet.add(deepCopy(key))
        }
        return copySet;
    }

    if(param instanceof Object){
        const copyObj = {};
        for(const key in param){
            copyObj[key] = deepCopy(param[key]);
        }
        return copyObj;
    }
}

//테스트 코드
const originPath = originObj.obj
const copyPath = copyObj.obj

console.log("------------------------------1.기본타입 string 복사------------------------------")
copyObj.str = "b";
console.log("originObj.str: " + originObj.str);
console.log("copyObj.str: " + copyObj.str);
console.log(originObj.str === copyObj.str);

console.log("--------------------------2.중첩객체/기본타입 number 복사--------------------------")
copyObj.num.one = 3;
console.log("originObj.num: " + originObj.num.one);
console.log("copyObj.num: " + copyObj.num.one);
console.log(originObj.num === copyObj.num);

console.log("---------------------------3.중첩객체/기본타입 null 복사---------------------------")
copyObj.primitiveNull = 3;
console.log("originObj.primitiveNull: " + originObj.primitiveNull);
console.log("copyObj.primitiveNull: " + copyObj.primitiveNull);
console.log(originObj.primitiveNull === copyObj.primitiveNull);

console.log("------------------------4.중첩객체/참조타입 정규표현식 복사-------------------------")
copyPath.objRegExp = /\d{6}-\d{7}/;
console.log("originPath.objRegExp: " + originPath.objRegExp);
console.log("copyPath.objRegExp: " + copyPath.objRegExp);
console.log(originPath.objRegExp === copyPath.objRegExp);

console.log(originPath.objRegExp.test("010-1234-5678"));
console.log(copyPath.objRegExp.test("010-1234-5678"));
console.log(copyPath.objRegExp.test("000000-0000000"));

console.log(Object.prototype.toString.call(originPath.objRegExp));
console.log(Object.prototype.toString.call(copyPath.objRegExp));

console.log("---------------------------5.중첩객체/참조타입 Date 복사---------------------------")
copyPath.objDate = new Date("2023-04-01");
console.log("originPath.objDate: " + originPath.objDate);
console.log("ccopyPath.objDate: " + copyPath.objDate);
console.log(originPath.objDate === copyPath.objDate);

console.log(Object.prototype.toString.call(originPath.objDate));
console.log(Object.prototype.toString.call(copyPath.objDate));

console.log("---------------------------6.중첩객체/참조타입 Array 복사--------------------------")
copyPath.objArray[2] = ["test",1]
console.log("originPath.objArray[2]: " + originPath.objArray[2]);
console.log("copyPath.objArray[2]: " + copyPath.objArray[2]);
console.log(originPath.objArray[2] === copyPath.objArray[2]);

console.log(Object.prototype.toString.call(originPath.objArray));
console.log(Object.prototype.toString.call(copyPath.objArray));

console.log("--------------------------7.중첩객체/참조타입 Function 복사-------------------------")
copyPath.objFunc = function(){console.log("test2")};
console.log("originPath.objFunc: " + originPath.objFunc);
console.log("copyPath.objFunc: " + copyPath.objFunc);
console.log(originPath.objFunc === copyPath.objFunc);

console.log(Object.prototype.toString.call(originPath.objFunc));
console.log(Object.prototype.toString.call(copyPath.objFunc));

console.log("----------------------------8.중첩객체/참조타입 Map 복사----------------------------")
const originObjMap = originPath.objMap.get("a");
const copyObjObjMap = originPath.objMap.set("a","2");
console.log("originPath.objMap: " + originObjMap);
console.log("copyPath.objMap: " + copyObjObjMap.get("a"));
console.log(originPath.objMap === copyPath.objMap);

console.log(Object.prototype.toString.call(originPath.objMap));
console.log(Object.prototype.toString.call(copyPath.objMap));

console.log("----------------------------9.중첩객체/참조타입 Set 복사----------------------------")
copyPath.objSet.add(5);

for(let data of originPath.objSet){
    console.log("originPath.objSet: " + data);
}

for(let data of copyPath.objSet){
    console.log("copyPath.objSet: " + data);
}
console.log(originPath.objSet === copyPath.objSet);

console.log(Object.prototype.toString.call(originPath.objSet));
console.log(Object.prototype.toString.call(copyPath.objSet));

console.log(originObj.obj === copyObj.obj);



console.log("--------------------------------------deepCopy끝-----------------------------------")
console.log("--------------------------(추가) javascript type 확인하기---------------------------")
// 1.typeof
// [typeof 객체]
// -. number, string, function, object, undefined, boolean 자료형을 문자열로 반환 
// -. null은 기본형 타입이지만 object로 반환
// -. 기본형은 확인 가능하지만 참조형은 객체의 종류를 구분할 수 없다.

// 2.instance of
// [객체 instatnceof 클래스(객체)]
// -. 객체가 어떤 객체(클래스)의 인스턴스인지 boolean으로 반환 
// -. 특정 객체로부터 생성되었는 지 객체의 프로토타입 체인을 검사하는 방식이다.
// -. instanceof only checks if Array.prototype is on an object's [[Prototype]] chain. -> 프로토타입 체인 검사하는 방식이므로
// -. It fails when checking arrays across frames since the Array constructor used for the instance will likely be different to the one used for the test. (js사용하는 환경 영역(realm)이 있고 영역이 다르면 객체, 배열을 인식 못 하는 경우가 있다.)

// 3.Object.prototype.toString
// [Object.prototype.toString.call(객체)]
// -. 모든 타입의 값의 타입을 반환 [object Object],
// -. 최상위 객체인 Object의 toString() 메소드 사용하고, call 함수에 인수로 검사하고자 하는 객체를 전달한다.

// 4.isArray
// [Array.isArray(객체)];
// -. 객체가 Array인지 boolean으로 반환
// -. ES5 method so not supported by older browsers, but it reliably determines if an object is an Array.


//예제1) typeof 결과 값 비교
class A {}

console.log(typeof A);          // 함수니까 function 반환
console.log(typeof new A());    // class로 생성한 값은 객체이므로 object

//예제2) Object.prototype.toString 메소드 사용해보기
var fish = {
    name : "nimo"
};

console.log(fish.toString());
fish.toString = function(){ return "hello " + fish.name;};
console.log(fish.toString());