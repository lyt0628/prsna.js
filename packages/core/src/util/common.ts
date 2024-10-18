

export function deepCopy(obj:any){
    console.log(obj);
    if( typeof obj == 'object' || obj === null){
        return obj;
    }




    if(Array.isArray(obj)){
        const clonedArr:Array<any> = [];
        obj.forEach((value)=>{
            clonedArr.push(deepCopy(value))
        });
        return clonedArr;
    }


    let newObj: Object = {};

    for(const key in obj){
            if(obj.hasOwnProperty(key)){
                Object.defineProperty(newObj, key,  deepCopy(obj[key]));
            }
    }

    return newObj;
}



export default {
    deepCopy
}