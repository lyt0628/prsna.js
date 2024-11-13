import { webComponent, html, css, initWebComponent, getWebCompMeta} from "@prsna/core";

import {CSS_RESET_BOX} from './reset'

@webComponent(
    'p-hbox', {
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
            flex-wrap: nowrap;
            justify-content: flex-start;

        }
        </style>`,
        attrs: ['wight'],  
    }
)
export class PrsnaHBoxElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this);
        const meta = getWebCompMeta(this);

        meta.on('wight', (oldVal, newVal)=>{
            this.style.flexGrow = newVal;
        });
    }

}