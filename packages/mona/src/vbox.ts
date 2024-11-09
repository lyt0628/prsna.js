import { webComponent, html, css, initWebComponent, getWebCompMeta} from "../../core/src/index";

import {CSS_RESET_BOX} from './reset'

@webComponent(
    'p-vbox', {
        template: html`
        <slot></slot>
        `,
        style: css`<style>
        :host {
            flex-grow: 1;
            flex-shrink: 1;
        }


        :host {
            ${CSS_RESET_BOX}
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-start;

            background-color: var(--mona-color-fore-aux3);
        }
        </style>`,
        attrs: ['wight'],  
    }
)
export class PrsnaVBoxElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this);
        const meta = getWebCompMeta(this);
        meta.on('wrap', (oldVal, newVal)=>{console.log(newVal)});
        meta.on('wight', (oldVal, newVal)=>{
            this.style.flexGrow = newVal;
        });


    }

}