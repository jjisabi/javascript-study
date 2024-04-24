function deepCopy(param){
    const type = typeof param
    if(param === null && (type !== "object" || type !== "function")){
        return param;
    }

    if(type === "function"){
        const copyFunc = Object.create(Object.getPrototypeOf(param));
        return copyFunc;
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

module.exports = deepCopy;