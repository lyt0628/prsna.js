import { webComponent, html, css, initWebComponent, getWebCompMeta} from "../../core/src/index";

import {CSS_RESET_BOX} from './reset'

@webComponent(
    'p-twoend', {
        template: html`
        <slot name='left'></slot>
        <slot name='right'></slot>
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
            justify-content: space-between;

        }
        </style>`,
        attrs: ['wight'],  
    }
)
export class PrsnaTwoEndElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this);



    }

}