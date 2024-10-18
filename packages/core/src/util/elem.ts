export function wrapEl(elem:string, content:string, cloed=true){
    let ret = '';
    if(cloed){
        ret = `<${elem}>${content}</${elem}>`;
    }else{
        ret = `<${elem}/>`
    }
    
    return ret;
}


export function syncAttr(el:HTMLElement, fields:Array<string>){


    for (var field in fields){
        Object.defineProperty(el, field, {
            value: new Proxy(el, {
                get: function(target, prop){
                    if(typeof prop == 'string'){
                        return target.getAttribute(prop)
                    }
                },
                set: function(target, prop, newVal){
                    if(typeof prop == 'string'){
                        target.setAttribute(prop, newVal)
                    }
                    return newVal;
                }
            })
        })


    }
}

export default {
    wrapEl,
    syncAttr
}