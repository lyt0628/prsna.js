import {Route} from "./Route"

export class Router {

    rootElem: Element | null;
    routes: Array<Route>;

    constructor(rootId:string, routes: Array<Route>){
        if(!rootId) console.error("[Router] Root Element should not be blank!");
        if(!routes) console.error("[Router] routes should not be null or undefined!");

        this.rootElem = document.getElementById(rootId);
        if(!this.rootElem) console.error(`[Router] Element for rootId ${rootId} does not exists!`);
 
        this.routes = routes;
    }

    init(){
        if(!this.rootElem) return;

        this.navi(window.location.pathname);
    }

    navi(path: string){
        if(!this.rootElem) return;
        const route = this.findRoute(path);
        if(!route){
            console.error(`[Router] Route for ${path} does not exists`);
            return;
        }
        this.relove(route);
    }

    findRoute(path: string){
        return this.routes.find((route)=>{
            route.path == path;
        });
    }

    relove(route:Route){
        if(!this.rootElem) return;

        const view : HTMLElement = document.createElement(route.elem);
        if(route.title){
            document.title = route.title;
        }

        this.rootElem.innerHTML = '';
        this.rootElem.appendChild(view);

    }
}