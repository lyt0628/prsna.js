

import {webComponent, attachShadow, html, css} from '@prsna/core';


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




