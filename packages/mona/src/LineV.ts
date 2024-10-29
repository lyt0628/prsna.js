import { webComponent, html, css, attachShadow} from "../../core/src/index";



@webComponent(
    'lyt-linev', {
        template: html`
        <div></div>
        `,
        style: css`<style>
        div {

            width: 2px;
            height: 500px;
            background-color: #FF6633;
        }

        </style>`,
        
    }
)
export class LYTLineVElement extends HTMLElement{
    constructor(){
        super();
        attachShadow(this)
    }

}