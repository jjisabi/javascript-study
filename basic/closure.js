console.log("------------------------------클로저 개념------------------------------")    
//외부 함수의 변수를 참조하는 내부함수1
var outer1 = function () {
    var a = 1;
    var inner = function () {
        console.log(++a);
    }
    inner();
}
outer1();
outer1();
outer1();

//외부 함수의 변수를 참조하는 내부함수2
var outer2 = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    }
    return inner();
}

console.log(outer2());
console.log(outer2());
console.log(outer2());

//외부 함수의 변수를 참조하는 내부함수3
var outer3 = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    }
    // console.log("1 " + inner);     //function () {...}
    // console.log("2 " + inner());   //2
    // console.log("3 " + inner);     //function () {...}
    // console.log("4 " + inner());   //3
    return inner;
}

console.log(outer3());      //function () {...} 출력

var outer3Var = outer3();   //inner 함수 자체 function () {...} 를 참조
console.log(outer3Var());   //2  inner 함수 function () {...} 자체를 호출
console.log(outer3Var());   //3
console.log(outer3Var());   //4

console.log("------------------------------return 없이도 클로저 발생------------------------------")
//예제1 - window 메서드에 전달할 콜백 함수 내부에서 지역변수 참조
// (function () {
//     var a = 0;
//     var intervalId = null;
//     var inner = function (){    //클로저 함수
//         if (++a >=10 ){
//             clearInterval(intervalId);
//         }
//         console.log(a);
//     };
//     interverId = setInterval(inner, 1000);
// })();

//예제2 - eventListener
// (function () {
//     var count = 0;
//     var button = document.createElement("button");
//     button.innerText = "click";
//     button.addEventListener("click", function (){
//         console.log(++count, "times clicked");
//     })
//     document.body.appendChild(button);
// })


console.log("------------------------------클로저 메모리 관리------------------------------")
var outer3 = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    }
    // console.log("1 " + inner);     //function () {...}
    // console.log("2 " + inner());   //2
    // console.log("3 " + inner);     //function () {...}
    // console.log("4 " + inner());   //3
    return inner;
}

console.log(outer3());      //function () {...} 출력

var outer3Var = outer3();   //inner 함수 자체 functio () {...} 를 참조
console.log(outer3Var());   //2  inner 함수 function () {...} 자체를 호출
console.log(outer3Var());   //3
console.log(outer3Var());   //4

outer3 = null;


console.log("------------------------------클로저 활용 사례------------------------------")
//예시1 콜백 함수 내부에서 외부 데이터 사용하고자 할때
var fruits = ['mandarin', 'watermelon', 'grape'];   //외부 데이터
var ul = document.createElement("ul");

fruits.forEach((item) => {                      //A
    var li = document.createElement("li");
    li.innerText = item;
    li.addEventListener("click", () => {        //B
        alert(item);
    })
    ul.appendChild(li);
});

document.body.appendChild(ul);

//예시2 함수 외부로 분리하여 공통함수로 사용
var alertFruit = function (item){
    //alert(item);
}

fruits.forEach((item) => {                      //A
    var li = document.createElement("li");
    li.innerText = item;
    //li.addEventListener("click", alertFruit);
    li.addEventListener("click", alertFruit.bind(null, fruits));
    ul.appendChild(li);
});

document.body.appendChild(ul);
alertFruit(fruits[1]);

//예시3 접근 권한 제어(정보 은닉)
//자동차 객체
// var car = {
//     fuel: Math.ceil(Math.random() * 10 + 10),
//     power: Math.ceil(Math.random() * 3 + 2),
//     moved: 0,
//     run: function () {
//         var km = Math.ceil(Math.random * 6);
//         var wasteFuel = km / this.power;
//         if(this.fuel < wasteFuel){
//             console.log("이동불가");
//             return;
//         }
//     this.fuel -= wasteFuel;
//     this.moved += km;
//     console.log(km = "km 이동 (총 " + this.moved + "km)")
//     }
// }

// car.fuel = 200;
// console.log("car.fuel: " + car.fuel);


//클로저로 변수 보호
var createCar = function (){
    var fuel = Math.ceil(Math.random() * 10 + 10)   //return 하지 않음으로써 외부 접근 제한, priviate 상태
    var power = Math.ceil(Math.random() * 3 + 2)
    var moved = 0;  //getter만 부여하여 읽기 전용 속성 부여

    return {
        get moved(){
            return moved;
        },
        run: function () {
            var km = Math.ceil(Math.random * 6);
            var wasteFuel = km / this.power;
            if(this.fuel < wasteFuel){
                console.log("이동불가");
                return;
            }
        }
    }
}

//car.fuel = 200;
//console.log("car.fuel: " + car.fuel);

//예시4 부분 적용 함수
//부분 적용 함수: n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 원래 함수의 실행 결과를 있게끔 하는 함수

//4_1 bind 메서드를 활용한 부분 적용 함수
//4_1_1 bind 메서드 -> 1) this 미리 적용 목적 2) 부분 적용 함수 구현 목적
//Function.prototype.bind(thisArg[,arg1[,arg2[, ...]]])
var bindFunc = function (a,b,c,d){
    console.log(this,a,b,c,d);
}

bindFunc (1,2,3,4);

var bindfunc2 = bindFunc.bind({x:1});
bindfunc2(5,6,7,8);

var bindFunc3 = bindFunc.bind({x:1}, 4, 5);
bindFunc3(6,7)          //(x:1) 4 5 6 7
bindFunc3(8,9)

//4_2 bind 메서드를 활용한 부분 적용 함수
var add = function (){                          //외부 함수
    var result = 0;
    for (var i = 0; i<arguments.length; i++){   //내부 함수
        result += arguments[i];
    }
    return result;                              //외부 함수 종료 될 때 내부함수 결과 값 return
};

//var addPartial = add.bind(null, 1,2,3,4,5);
//console.log(addPartial(6,7,8,9,10));

//예시5 별도 부분 적용 함수 구현
var partial = function (){
    var originalPartialArgs = arguments;
    var func = originalPartialArgs[0];
    if(typeof func !== "function"){
        throw new Error("첫 번째 인자가 함수가 아닙니다.");
    }
    return function (){
        var partialArgs = Array.prototype.slice.call(originalPartialArgs,1);
        var restArgs = Array.prototype.slice.call(arguments);
        return func.apply(this, partialArgs.concat(restArgs));
    };
};

var add = function(){
    var result = 0;
    for(var i = 0; i<arguments.length; i++){
        result += arguments[i];
    }
    return result;
};

var addPartial = partial(add, 1,2,3,4,5);
console.log(addPartial(6,7,8,9,10));

var dog = {
    name: "강아지",
    greet: partial(function(prefix, suffix){
        return prefix + this.name + suffix;
    }, "멍멍, ")
}

dog.greet("입니다.");

//예시5 디바운스 부분 적용 함수
var debounce = function (eventName, func, wait){
    var timeoutId = null;
    return function (event){
        var self = this;
        console.log(eventName, "event 발생");
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(self, event), wait);
    };

    var moveHandler = function (e) {
        console.log("move event 처리");
    };

    var wheelHandler = function (e){
        console.log("wheel event 처리");
    };

    document.body.addEventListener("mousemove", debounce("move", moveHandler, 500));
    document.body.addEventListener("mousewheel", debounce("wheel", wheelHandler, 700));

}


//커링 함수
//커링 함수: 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것 / 부분함수와 달리 한 번에 하나의 인자만 전달함
var curry3 = function (func) {
    return function (a){
        return function (b){
            return func(a, b);
        };
    };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8));       
console.log(getMaxWith10(25));