

import {webComponent, attachShadow, html, css} from '../../core/src/index';






@webComponent('lyt-button', {
    template: html`<slot></slot>`,    
    style: css`<style>

    </style>`,
})
export class LYTButtonComponent extends HTMLButtonElement {
    dom : any | null = null
    text : string | null  = ''

    /**
     *
     */
    constructor() {
        super();
        attachShadow(this);
     
    }
   
}




