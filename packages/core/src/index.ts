import LYTButtonComponent from "./Button";
import { LYTToggleButton  } from "./Toggle";

let prsna = (function(scope:any){    
    scope.LYTButtonComponent = LYTButtonComponent
    scope.LYTButtonComponent = LYTToggleButton
    return scope
}({}))