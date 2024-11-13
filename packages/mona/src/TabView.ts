import {webComponent, initWebComponent,  getWebCompMeta,
    html, css
} from "@prsna/core";

type TabViewDirection = 'horizontal' | 'vertical';

@webComponent('p-tabview',{
    attrs: ['direction',]
})
export class PrsnaTabViewElement extends HTMLElement{
    direction :TabViewDirection = 'horizontal'; 

    constructor(){
        super();
        initWebComponent(this);
        const meta = getWebCompMeta(this);

        const dirAttr = this.getAttribute('direction') as TabViewDirection;
        if(dirAttr) this.direction = dirAttr;


    }
    
}