
import { 
    deepCopy, 
    defineGet, defineSet,
    wrapEl, syncAttr,
    mpaconcat,
    html, css
 } from "./index";


(function(scope:any){    
    scope.deepCopy = deepCopy;
    scope.defineGet = defineGet;
    scope.defineSet = defineSet;
    scope.wrapEl = wrapEl;
    scope.syncAttr = syncAttr;
    scope.mpaconcat = mpaconcat;
    scope.html = html;
    scope.css = css;  

    return scope
}({}))