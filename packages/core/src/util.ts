

export function deepCopy(obj:any){
    console.log(obj);
    if(typeof obj == 'object' || obj === null){
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


export function defineGet(target:any, name:string, getter:()=>any){
    Object.defineProperty(target, name, {
        get: getter,
        enumerable: true,
        configurable:true,
    })
}


export function defineSet(target:any, name:string, setter:(value:any[])=>void){
    Object.defineProperty(target, name, {
        set: setter,
        enumerable: true,
        configurable:true,
    })
}


export function hasMethod(obj:any, name:string){
    return name in obj && typeof obj[name] == 'function';
}


export function callFuncBefore(cls:{prototype:any}, name:string, func:(self:any, ...args:any[])=>void){
    if(hasMethod(cls.prototype, name)){
        const originalMethod = cls.prototype[name];
        cls.prototype[name] = function(...args:any[]){
        func(this, args)

        originalMethod.apply(this, args)
        }
    }else{
        console.error(`[callFuncBefore] Class does have not method ${name}!!!`);
    }
}


export function wrapEl(elem: string, content: string, cloed = true) {
    let ret = '';
    if (cloed) {
        ret = `<${elem}>${content}</${elem}>`;
    } else {
        ret = `<${elem}/>`;
    }

    return ret;
}

/**
 * Sync fields with attribute.
 * @param el WebComponent ctor
 * @param fields Obervered attributes
 */
export function syncAttr(el: HTMLElement, fields: Array<string>) {

    fields.forEach(
        (field)=>{
            Object.defineProperty(el, field, {
                get: function () {
                        return this.getAttribute(field);
                },
                set: function (value) {
                    if(this[field] != value){
                        this.setAttribute(field, value);
                    }
                }
            });
        }
    )
}


export function mpaconcat(arr: Array<any>, fn: Function) {
    const cloned: Array<any> = deepCopy(arr);

    let ret = '';
    cloned.forEach((item, idx) => {
        ret += fn(item, idx);
    });

    return ret;
}

// For getting support of es-string-html plugins
export function html(template:TemplateStringsArray, ...rest:any){
    let ret = ""
    template.forEach((str, idx)=>{
        ret += `${str}${rest[idx] || ""}`;
    });
    return ret;
}


export function css(template:TemplateStringsArray, ...rest:any){
    let ret = ""
    template.forEach((str, idx)=>{
        ret += `${str}${rest[idx] || ""}`;
    });
    return ret;
}

