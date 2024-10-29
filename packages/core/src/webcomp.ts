import { callFuncBefore, defineGet } from "./util";
import { syncAttr } from "./util";



// export function addStaticMethod(name : string, func: Function){
//     return function(target: any){
//         target[name] = func;
//     }
// }

// export function addSuperClass<T extends { new(...args:any[]):{} }>(superClass: T){ // extens with a obj, that is a class
//     return function <U extends {new(...args:any[]): {}}>(targetClass: U){ 
//         return class extends superClass{
//             constructor(...args:any[]){
//                 super(...args); // Call parent ctor
//                 return new targetClass(...args); // and capp subclass ctor
//             }
//         }
//     }
// }



interface WebCompMeta {
    [key: string]:any, // string index, and can use target[<string key>]
    mode?: ShadowRootMode,
    name?: string,
    style?: string,
    template?: string,
    attrs?: Array<string>,
    shadowRoot?: ShadowRoot | null,
    host?: HTMLElement & {webCompMeta:WebCompMeta} | null,
    extend?: ElementDefinitionOptions | null,
}

interface WebCompMeta_tag {
    [key: string]:any, // string index, and can use target[<string key>]
    style: string,
    template: string,
}

export function webComponent(name:string,  meta:WebCompMeta = {}){
    meta.name = name;
    

    return function<T extends CustomElementConstructor>(target: T){

        // Sync Properties
        if(meta.attrs && meta.attrs.length > 0){
            
            defineGet(target, 'observedAttributes', ()=>meta.attrs);

            if(meta.attrs){
                callFuncBefore(target, 'connectedCallback', (self)=>{
                   if(meta.attrs){ // For Ts Compiler Check
                    syncAttr(self, meta.attrs)
                   }
                })
            }

        }   
        // Proxy for meta
        if(!meta.style) meta.style = '';
        if(!meta.template) meta.template = '';
        if (!meta.attrs) meta.attrs = [];
        if(!meta.mode) meta.mode = 'open';
        if(!meta.host) meta.host = null;
        if(!meta.shadowRoot) meta.shadowRoot = null;
        if(!meta.extend) meta.extend = {extends: lookupExtend(target)};
        
        
        let metaProxy = new Proxy(meta, {
            set: (target: WebCompMeta_tag, key:string, value:any)=>{       
                    target[key] = value;
                    updateShadow(target);
                     return true;
            }
        })
        target.prototype.webCompMeta = metaProxy;
        

        // Define Component
        if(!customElements.get(name) && !meta.extend){
            customElements.define(name, target);
        } else if(!customElements.get(name) && meta.extend){
            customElements.define(name, target, meta.extend);
        } else{
            console.error(`CustomElement name :${name} has been defined!!!!`);
        }
        return target;
    }

}

function lookupExtend<T extends CustomElementConstructor>(target: T): string | undefined{
    const builtinElMap = new Map<any, string>();
    builtinElMap.set(HTMLButtonElement, 'button');

    for (const [el, name] of builtinElMap) {
        if (Object.getPrototypeOf(target) === el) return name;
    }


}

export function attachShadow(context:HTMLElement){

    let meta = (context as HTMLElement & {webCompMeta: WebCompMeta}).webCompMeta

    const shadowRoot = context.attachShadow({
        mode: meta.mode || "open"
    });

    meta.shadowRoot = shadowRoot
    meta.host = context as HTMLElement & {webCompMeta:WebCompMeta};

    updateShadow(meta);
}


function updateShadow(meta:WebCompMeta){

    if(meta.shadowRoot){
        meta.shadowRoot.innerHTML = `${meta.style}${meta.template}`
    }
}

export function getWebCompMeta(context:HTMLElement){
    return (context as HTMLElement & {webCompMeta: WebCompMeta_tag}).webCompMeta;
}