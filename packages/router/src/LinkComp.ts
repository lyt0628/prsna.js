

import {Router} from './Router'
import {Route} from './Route'


import { webComponent, html, css, attachShadow, getWebCompMeta } from '../../core/src/index'
import { LYTRouterElement } from './RouterComp'


@webComponent('lyt-link', {
    attrs: ['path', 'routerId'],
    template: html`<slot></slot>`
})
export class LYTLinkElement extends HTMLElement{
    routerId: string | null;
    router: LYTRouterElement | null;
    path: string | null
    constructor(){
        super()
        this.routerId = this.getAttribute('routerId');
        if(!this.routerId) this.routerId = 'lyt-router';
        this.router = document.getElementById(this.routerId) as LYTRouterElement;
        if(!this.router) console.error(`[Link] LYTRouterComponent ${this.routerId} does not exists!`);

        this.path = this.getAttribute('path');
        if(!this.path) console.error(`[Link] path should not be blank`);

    }
    
}