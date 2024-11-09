import {webComponent, initWebComponent,  getWebCompMeta,
    html, css
} from '../../core/src/index';


@webComponent('p-toggle',{
    template: html`
    <p-hbox>
        <p-boxitem>
            <slot name='handler' id='handler'>
                <span id='default-handler'>
                <span id='default-handler-indicator'> 
            </span>
        </slot>
        </p-boxitem>
        <p-boxitem>
             <slot name='content' id='default-content'></slot>    
        </p-boxitem>
    </p-hbox>
    `,
    style: css`
    <style>
    :host{
        display: inline-block;
        
        width: 20px;
        height: 20px;
    }
    #default-handler {
        display: inline-block;

        width: 20px;
        height: 20px;

        border-radius: 90px;
        border: 1px solid;

        background-color: var(--mona-color-gray-lighter);
    }
    #default-handler-indicator{
        display: inline-block;

        width: 15px;
        height: 15px;

        margin: 2px;
        border-radius: 90px;


        background-color: white;
    }
    </style>`,
    attrs: ['content-selector', 'group']
})
export class LYTToggleComponent extends HTMLElement{
    defaultIndicator: HTMLElement | null = null;
    defaultHandler: HTMLElement | null = null;
    defaultContent: HTMLElement | null = null;

    handler: HTMLElement | null = null;
    content: HTMLElement | null = null;

    contentSelector : string | null = null;

    toggled: boolean = false;

    constructor(){
        super();
        initWebComponent(this);
        const meta = getWebCompMeta(this);
        meta.on('content-selector', ()=>{
            this.updateDOM();
            this.updateContent();
        })

        this.updateDOM();
        if (this.handler) {
            this.handler.addEventListener('click', (e) => {
                this.toggled = !this.toggled;
                this.updateContent();
            });
        };

        this.updateContent();
    }


    private updateDOM() {
        const meta = getWebCompMeta(this);
        if (meta.shadowRoot) {
            this.defaultIndicator = meta.shadowRoot.querySelector('#default-handler-indicator');
            this.defaultHandler = meta.shadowRoot.querySelector('#default-handler');
            this.handler = meta.shadowRoot.querySelector('#handler');

            this.contentSelector = this.getAttribute('content-selector');
            this.defaultContent = meta.shadowRoot.querySelector('#default-content');

            if (this.contentSelector) {
                this.content = document.querySelector(this.contentSelector);
                if(this.defaultContent){
                    this.defaultContent.style.display = 'none';
                }
            } else {
                this.content = this.defaultContent;
                if(this.defaultContent){
                    this.defaultContent.style.display = 'inline-block';
                }
            }

        };


    }

    private updateContent(){
        if(this.defaultIndicator){
            this.defaultIndicator.style.backgroundColor = this.toggled? 'var(--mona-color-fore-aux1)': 'white';
        }
        
        if(this.content){
            this.content.style.visibility = this.toggled? 'visible' : 'hidden';
        }
    }
    
}