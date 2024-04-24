const deepCopy = require("../deepCopy.js");

const originArray = [1, 2, 3, 4];

const originFunc = function(){console.log("test")};

const originDate = new Date();

const originMap = new Map([["a", 1],["b", 2]]);

const originSet = new Set([1, 2, 3, 4]);

const originObj = {
        nested: {
            primitiveType: {
                str: "a",
                num: 1,
                nullType: null,
            },
            objectType: {
                objArray: originArray,
                objFunc: originFunc,
                objDate: originDate,
                objRegExp: /\d{3}-\d{4}-\d{4}/,
                objMap: originMap,
                objSet: originSet
            }
        }
    }

describe("1. `기본형` 원본 데이터와 복사 한 데이터가 같은 지 확인한다.", () => {
    const origin = originObj.nested.primitiveType;
    const copy = (deepCopy(originObj)).nested.primitiveType;

    it("1_1. string", () => {
        const copyStr = copy.str = "b";
        expect(copyStr).not.toBe(origin.str);
    });

    it("1_2. number", () => {
        const copyNum = copy.num = 3;
        expect(copyNum).not.toBe(origin.num);
    });

    it("1_3. null", () => {
        const copyNullType = copy.nullType = "abc";
        expect(copyNullType).not.toBe(origin.nullType);
    });

})

describe("2. `참조형` 원본 데이터와 복사 한 데이터가 같은 지 확인한다.", () => {
    const origin = originObj.nested.objectType;
    const copy = (deepCopy(originObj)).nested.objectType;

    it("2_1. Array", () => {
        copy.objArray = [4, 3, 2, 1];
        expect(copy.objArray).not.toEqual(origin.objArray);
    })

    it("2_2. Function", () => {
        copy.objFunc = function(){console.log("test2")};
        expect(copy.objFunc).not.toEqual(origin.objFunc);
    })

    it("2_3. Date", () => {
        copy.objDate = new Date("2023-04-01");
        expect(copy.objDate).not.toEqual(origin.objDate);
    })

    it("2_4. RegExp", () => {
        copy.objRegExp = /\d{6}-\d{7}/;
        expect(copy.objRegExp).not.toEqual(origin.objRegExp);
    })

    it("2_5. Map", () => {
    })

    it("2_6. Set", () => {
    })
})

  


