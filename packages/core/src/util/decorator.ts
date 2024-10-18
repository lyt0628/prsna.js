export function addStaticMethod(name : string, func: Function){
    return function(target: any){
        target[name] = func;
    }
}

export function addSuperClass<T extends { new(...args:any[]):{} }>(superClass: T){ // extens with a obj, that is a class
    return function <U extends {new(...args:any[]): {}}>(targetClass: U){ 
        return class extends superClass{
            constructor(...args:any[]){
                super(...args); // Call parent ctor
                return new targetClass(...args); // and capp subclass ctor
            }
        }
    }
}

export function webComponent(name:string){
    return function<T extends CustomElementConstructor>(target: T){
        if(!customElements.get(name)){
            customElements.define(name, target);
        }else{
            console.error(`CustomElement name :${name} has been defined!!!!`);
        }
        return target;
    }

}

export default {
    addStaticMethod, addSuperClass
}