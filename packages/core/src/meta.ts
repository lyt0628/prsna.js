
type attributeChangedHandler = (oldVal:string, newVal:string)=>undefined;

export class WebCompMetaImpl {
    [key: string]: any;
    mode: ShadowRootMode = 'open';
    name?: string;
    style: string = '';
    template: string = '';
    attrs: Array<string> = [];
    shadowRoot: ShadowRoot | null = null;
    host: (HTMLElement & { webCompMeta: WebCompMetaOption; }) | null = null;
    extend: ElementDefinitionOptions | null = null;

    handlerMap: Map<string, attributeChangedHandler> = new Map();

    on(attr: string, handler: attributeChangedHandler) {
        this.handlerMap.set(attr, handler);
    }

    dispatch(name:string, oldVal:string, newVal:string){
        const handler = this.handlerMap.get(name);
        if(handler){
            handler(oldVal, newVal);
        }else{
            console.warn(`[dispatch] No handler for attribute ${name} of host ${this.host}`);
        }
    }

    copy(){
        let cloned = new WebCompMetaImpl;
        cloned.mode = this.mode;
        cloned.name = this.name;
        cloned.style = this.style;
        cloned.template = this.template;
        cloned.attrs = this.attrs;
        cloned.shadowRoot = this.shadowRoot;
        cloned.host = this.host;
        cloned.extend = this.extend;
        return cloned;
    }
}
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



export interface WebCompMetaOption {
    [key: string]: any; // string index, and can use target[<string key>]
    mode?: ShadowRootMode;
    style?: string;
    template?: string;
    attrs?: Array<string>;
    extend?: ElementDefinitionOptions | null;
}

export interface WebCompMeta {
    [key: string]: any; // string index, and can use target[<string key>]
    style: string;
    template: string;
    on: (attr: string, handler: attributeChangedHandler)=>undefined;
    shadowRoot: ShadowRoot | null;
}

