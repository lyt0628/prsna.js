import {Router} from './Router'
import {Route} from './Route'

import { webComponent, css } from '../../core/src/index'




@webComponent('lyt-router', {
    attrs: ['routes', 'rootId'],
    style : css `aaa`
})
export class LYTRouterElement extends HTMLElement{
    router: Router

    constructor(){
        super();
        if(!this.id) this.id = 'lyt-router';

        const routes = this.getAttribute('routes');
        let routeArray = new Array<Route>();
        if(routes){
           routeArray = JSON.parse(routes) as Array<Route>;
        }
        
        let rootId = this.getAttribute('rootId');
        if(!rootId) rootId = this.id;

        this.router = new Router(rootId, routeArray);
    }
}