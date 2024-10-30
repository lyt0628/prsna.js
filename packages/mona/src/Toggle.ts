import {webComponent, attachShadow,  getWebCompMeta,
    html, css
} from '@prsna/core';


@webComponent('lyt-toggle',{
    template: html`<div>lyt666</div>`,
    style: css`
    <style>
    div {
    background-color: rebeccapurple;
    }
    </style>`,
})
export class LYTToggleComponent extends HTMLElement{
    innerHTML: string = '';

    constructor(){
        super();
        attachShadow(this);
        let meta = getWebCompMeta(this);
        meta.template += "<div>lyt999</div>";
    }
    
}

