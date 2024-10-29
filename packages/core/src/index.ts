

// let prsna = (function(scope:any){    
//     scope.LYTButtonComponent = LYTButtonComponent
//     scope.LYTButtonComponent = LYTToggleButton
//     return scope
// }({}))

export { 
    deepCopy, 
    defineGet, defineSet,
    wrapEl, syncAttr,
    mpaconcat,
    html, css
 } from "./util";


export { webComponent, attachShadow, getWebCompMeta
 } from "./webcomp";
import Template from "./template";


