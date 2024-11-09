
import { webComponent, html, css, initWebComponent, getWebCompMeta} from "../../core/src/index";



@webComponent(
    'p-minibutton', {
        template: html`
        <slot></slot>
        `,
        style: css`<style>
        :host {
            cursor: pointer;

            background-color: #00cc66;
            border-radius: 10px;
            padding: 4px 5px;

            font-size: 13px;
            color: var(--mona-color-fore-aux2);

        }
        </style>`,
        attrs: ['background-color', 'color']
    }

)
export class LYTMiniButtonElement extends HTMLButtonElement{
    constructor(){
        super();
        
        initWebComponent(this);
        const meta =  getWebCompMeta(this);
        meta.on('background-color', (oldVal, newVal)=>{
            this.style.backgroundColor = newVal;
        })
        meta.on('color', (oldVal, newVal)=>{
            this.style.color = newVal
        })
    }

}