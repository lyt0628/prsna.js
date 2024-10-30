import { webComponent, html, css, attachShadow} from "../../core/src/index";




@webComponent(
    'lyt-lineh', {
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
        attachShadow(this)
    }

}