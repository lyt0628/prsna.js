import { callFuncBefore, deepCopy, defineGet, hasMethod } from "./util";
import { syncAttr } from "./util";
import { WebCompMeta, WebCompMetaImpl, WebCompMetaOption } from "./meta";



export function webComponent(name:string,  metaOpt:WebCompMetaOption = {}){


    return function<T extends CustomElementConstructor>(target: T){
        let metaImplObj = new WebCompMetaImpl;
        metaImplObj.name = name;
        if(metaOpt.style !== undefined) metaImplObj.style = metaOpt.style;
        if(metaOpt.template !== undefined) metaImplObj.template = metaOpt.template;
        if(metaOpt.attrs != undefined) metaImplObj.attrs = metaOpt.attrs;
        if(metaOpt.mode != undefined) metaImplObj.mode = metaOpt.mode;
        if(metaOpt.extend === undefined) {
            metaImplObj.extend = {extends: lookupExtend(target)};
        }else {
            metaImplObj.extend = metaOpt.extend;
        }
        

        // Sync fields with attributes
        if(metaImplObj.attrs.length > 0){
      
            defineGet(target, 'observedAttributes', ()=>metaImplObj.attrs);
    
            // Declare connectedCallback function if not exists
            if(!hasMethod(target.prototype, 'connectedCallback')){
                target.prototype.connectedCallback = ()=>{};
            }
            callFuncBefore(target, 'connectedCallback', (self)=>{
                if(metaOpt.attrs){ // For Ts Compiler Check
                    syncAttr(self, metaOpt.attrs)
                }
            })

            // Dispatch attribute Changed Callback
            if(!target.prototype.attributeChangedCallback){
                target.prototype.attributeChangedCallback = function(name:string, oldVal:string, newVal:string){
                    (this as HTMLElement & {webCompMeta: WebCompMetaImpl})
                        .webCompMeta.dispatch(name, oldVal, newVal);
                }
            }

        }   

        target.prototype.webCompMeta =  new Proxy(metaImplObj, {
            set: (metaObj, key:string, value:any)=>{       
                    metaObj[key] = value;
                    updateShadow(metaObj);
                     return true;
            }
        });


        // Define Component
        if(!customElements.get(name) && !metaImplObj.extend){
            customElements.define(name, target);
        } else if(!customElements.get(name) && metaImplObj.extend){
            customElements.define(name, target, metaImplObj.extend);
        } else{
            console.error(`[webComponent] CustomElement name :${name} has been defined!!!!`);
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

export function initWebComponent(context:HTMLElement, attachShadow = true){
    let protoMeta = Object.getPrototypeOf(context).webCompMeta as WebCompMetaImpl;

    Object.defineProperty(context, 'webCompMeta',{
        value: protoMeta.copy(),
    });

    let meta = (context as HTMLElement & {webCompMeta: WebCompMetaOption}).webCompMeta;

    meta.host = context;
    if(attachShadow){
        const shadowRoot = context.attachShadow({
            mode: meta.mode || "open"
        });
        meta.shadowRoot = shadowRoot;
        updateShadow(meta);
    }

    // let webCompContext = context  as HTMLElement & {webCompMeta:WebCompMetaOption};
    
    // webCompContext.webCompMeta = deepCopy(webCompContext);
}


function updateShadow(meta:WebCompMetaOption){
    if(meta.shadowRoot){
        meta.shadowRoot.innerHTML = `${meta.style}${meta.template}`
    }
}

export function getWebCompMeta(context:HTMLElement){
    return (context as HTMLElement & {webCompMeta: WebCompMeta}).webCompMeta;
}