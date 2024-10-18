/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Template = {
    render(props) {
        return `${this.css(props)}
                ${this.html(props)}`;
    },
    html(p) {
        return ``;
    },
    css(p) {
        return ``;
    },
    mapDOM(scope, fn) {
        return fn(scope);
    }
};

function deepCopy(obj) {
    console.log(obj);
    if (typeof obj == 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        const clonedArr = [];
        obj.forEach((value) => {
            clonedArr.push(deepCopy(value));
        });
        return clonedArr;
    }
    let newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            Object.defineProperty(newObj, key, deepCopy(obj[key]));
        }
    }
    return newObj;
}
var Comm = {
    deepCopy
};

function wrapEl(elem, content, cloed = true) {
    let ret = '';
    if (cloed) {
        ret = `<${elem}>${content}</${elem}>`;
    }
    else {
        ret = `<${elem}/>`;
    }
    return ret;
}
function syncAttr(el, fields) {
    for (var field in fields) {
        Object.defineProperty(el, field, {
            value: new Proxy(el, {
                get: function (target, prop) {
                    if (typeof prop == 'string') {
                        return target.getAttribute(prop);
                    }
                },
                set: function (target, prop, newVal) {
                    if (typeof prop == 'string') {
                        target.setAttribute(prop, newVal);
                    }
                    return newVal;
                }
            })
        });
    }
}

function mpaconcat(arr, fn) {
    const cloned = Comm.deepCopy(arr);
    let ret = '';
    cloned.forEach((item, idx) => {
        ret += fn(item, idx);
    });
    return ret;
}

function webComponent(name) {
    return function (target) {
        if (!customElements.get(name)) {
            customElements.define(name, target);
        }
        else {
            console.error(`CustomElement name :${name} has been defined!!!!`);
        }
        return target;
    };
}

let LYTButtonComponent = class LYTButtonComponent extends HTMLElement {
    /**
     *
     */
    constructor() {
        super();
        this.dom = null;
        this.text = '';
        Template.css = function (p) {
            return ``;
        };
        Template.html = function (p) {
            let h = mpaconcat([1, 2, 3], (item, idx) => {
                let cont = `Dix: ${idx * item}`;
                return `${wrapEl('div', cont)}`;
            });
            return h;
        };
    }
    connectedCallback() {
        this.innerHTML = Template.render();
        this.dom = Template.mapDOM(this, (scope) => {
            return scope.querySelector('div');
        });
        this.text = this.getAttribute('text');
        syncAttr(this, ['text']);
        if (this.dom) {
            this.dom.innerHTML = this.text ? this.text : '';
        }
    }
    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name == 'text' && this.dom) {
            this.dom.innerHTML = newVal;
        }
    }
};
LYTButtonComponent = __decorate([
    webComponent('lyt-button'),
    __metadata("design:paramtypes", [])
], LYTButtonComponent);
var LYTButtonComponent$1 = LYTButtonComponent;
// if(! customElements.get('lyt-button')){
//     customElements.define('lyt-button', LYTButtonComponent)
// }

let LYTToggleButton = class LYTToggleButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = '';
    }
    connectedCallback() {
        this.innerHTML = 'lyt666';
    }
};
LYTToggleButton = __decorate([
    webComponent('lyt-toggle'),
    __metadata("design:paramtypes", [])
], LYTToggleButton);

((function (scope) {
    scope.LYTButtonComponent = LYTButtonComponent$1;
    scope.LYTButtonComponent = LYTToggleButton;
    return scope;
})({}));
