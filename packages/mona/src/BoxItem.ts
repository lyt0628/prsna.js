import { webComponent, html, css, initWebComponent, getWebCompMeta} from "@prsna/core";



@webComponent(
    'p-boxitem', {
        template: html`
        <slot></slot>
        `,
        style: css`<style>
        :host {
            flex-grow: 1;
            flex-shrink: 1;
        }
        </style>`,
        attrs: ['wight'],
    }
)
export class PrsnaBoxItemElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this);
        const meta = getWebCompMeta(this);
        meta.on('wight', (oldVal, newVal)=>{
            this.style.flexGrow = newVal;
        })
    }
}