interface WebCompMeta {
    [key: string]: any;
    mode?: ShadowRootMode;
    name?: string;
    style?: string;
    template?: string;
    attrs?: Array<string>;
    shadowRoot?: ShadowRoot | null;
    host?: HTMLElement & {
        webCompMeta: WebCompMeta;
    } | null;
    extend?: ElementDefinitionOptions | null;
}
interface WebCompMeta_tag {
    [key: string]: any;
    style: string;
    template: string;
}
export declare function webComponent(name: string, meta?: WebCompMeta): <T extends CustomElementConstructor>(target: T) => T;
export declare function attachShadow(context: HTMLElement): void;
export declare function getWebCompMeta(context: HTMLElement): WebCompMeta_tag;
export {};
