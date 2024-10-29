
import { webComponent, html, css, attachShadow} from "../../core/src/index";



@webComponent(
    'lyt-minibutton', {
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
            color: #ff0000;

        }
        </style>`,
        
    }
)
export class LYTMiniButtonElement extends HTMLElement{
    constructor(){
        super();
        attachShadow(this)
    }

}