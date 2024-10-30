export declare function deepCopy(obj: any): any;
export declare function defineGet(target: any, name: string, getter: () => any): void;
export declare function defineSet(target: any, name: string, setter: (value: any[]) => void): void;
export declare function hasMethod(obj: any, name: string): boolean;
export declare function callFuncBefore(cls: {
    prototype: any;
}, name: string, func: (self: any, ...args: any[]) => void): void;
export declare function wrapEl(elem: string, content: string, cloed?: boolean): string;
export declare function syncAttr(el: HTMLElement, fields: Array<string>): void;
export declare function mpaconcat(arr: Array<any>, fn: Function): string;
export declare function html(template: TemplateStringsArray, ...rest: any): string;
export declare function css(template: TemplateStringsArray, ...rest: any): string;
