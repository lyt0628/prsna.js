import { webComponent, html, css, initWebComponent, getWebCompMeta} from "@prsna/core";

import {CSS_RESET_BOX} from './reset'

@webComponent(
    'p-header', {
        template: html`
        <p-twoend>
            <p-vbox slot='left'>
                <slot name='logo'>
                    
                <slot name='searchBox'>
            </p-vbox>

            <p-vbox slot='right'></p-vbox>
        </p-twoend>
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
export class PrsnaHeaderElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this);



    }

}