export default {
    render(props?:any){
        return `${this.css(props)}
                ${this.html(props)}`;
    },
    html(p:any){
        return ``;
    },
    css(p:any){
        return ``;
    },
    mapDOM(scope:HTMLElement, fn:any){
        return fn(scope);
    }

}