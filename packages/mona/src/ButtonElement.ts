
import {webComponent, attachShadow, html, css} from '../../core/src/index';



export class LYTButtonElement extends HTMLButtonElement {
    dom : any | null = null
    text : string | null  = ''


    constructor() {
        super();
        attachShadow(this);
     
    }
   
}
