import Comm from './common';


export function mpaconcat(arr:Array<any>, fn:Function){
    const cloned:Array<any> = Comm.deepCopy(arr);

    let ret = '';
    cloned.forEach((item, idx) => {
        ret += fn(item, idx);
    });

    return ret;
}


export default {
    mpaconcat
}