import Template from './template.js'


import { mpaconcat, wrapEl, syncAttr, webComponent } from './util/index';


@webComponent('lyt-button')
export default class LYTButtonComponent extends HTMLElement{
    dom : HTMLElement | null = null
    text : string | null  = ''
    /**
     *
     */
    constructor() {
        super();
        Template.css = function(p){
            return ``;
        }   

        Template.html = function(p){
            let h = mpaconcat([1, 2 ,3], (item:any, idx:any)=>{
                let cont = `Dix: ${idx * item}`;

                return `${wrapEl('div', cont)}` ;
            })
            return h;
        }

    
     
    }

    connectedCallback(){
        this.innerHTML = Template.render()

        this.dom = Template.mapDOM(this, (scope:HTMLElement)=>{
            return scope.querySelector('div');
        })


        this.text = this.getAttribute('text');

        syncAttr(this, ['text'])

        if(this.dom){
            this.dom.innerHTML = this.text ? this.text : '';
        }
    }
    
    static get observedAttributes(){
        return ['text'];
    }

    
    attributeChangedCallback(name:string, oldVal:any, newVal:any){
       if(name == 'text' && this.dom){
            this.dom.innerHTML = newVal
       }
    }

   
}

// if(! customElements.get('lyt-button')){
//     customElements.define('lyt-button', LYTButtonComponent)
// }

