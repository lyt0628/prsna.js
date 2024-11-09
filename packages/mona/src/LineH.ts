import { webComponent, html, css, initWebComponent} from "../../core/src/index";




@webComponent(
    'p-lineh', {
        template: html`
        <div></div>
        `,
        style: css`<style>
        div {
            // display: inline-block;
            height: 2px;
            width: 80%;
            margin: 0 auto;

            background-color: red;
        }
        </style>`,
    }
)
export class LYTLineHElement extends HTMLElement{
    constructor(){
        super();
        initWebComponent(this)
    }

}