import { webComponent } from "./util/decorator";


@webComponent('lyt-toggle')
export class LYTToggleButton extends HTMLElement{
    innerHTML: string = '';

    constructor(){
        super()

    }
    connectedCallback(){
        this.innerHTML='lyt666';
    }
}

