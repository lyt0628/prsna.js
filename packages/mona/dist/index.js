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

function defineGet(target, name, getter) {
    Object.defineProperty(target, name, {
        get: getter,
        enumerable: true,
        configurable: true,
    });
}
function hasMethod(obj, name) {
    return name in obj && typeof obj[name] == 'function';
}
function callFuncBefore(cls, name, func) {
    if (hasMethod(cls.prototype, name)) {
        const originalMethod = cls.prototype[name];
        cls.prototype[name] = function (...args) {
            func(this, args);
            originalMethod.apply(this, args);
        };
    }
    else {
        console.error(`Class does have not method ${name}!!!`);
    }
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
// For getting support of es-string-html plugins
function html(template, ...rest) {
    let ret = "";
    template.forEach((str, idx) => {
        ret += `${str}${rest[idx] || ""}`;
    });
    return ret;
}
function css(template, ...rest) {
    let ret = "";
    template.forEach((str, idx) => {
        ret += `${str}${rest[idx] || ""}`;
    });
    return ret;
}

function webComponent(name, meta = {}) {
    meta.name = name;
    return function (target) {
        // Sync Properties
        if (meta.attrs && meta.attrs.length > 0) {
            defineGet(target, 'observedAttributes', () => meta.attrs);
            if (meta.attrs) {
                callFuncBefore(target, 'connectedCallback', (self) => {
                    if (meta.attrs) { // For Ts Compiler Check
                        syncAttr(self, meta.attrs);
                    }
                });
            }
        }
        // Proxy for meta
        if (!meta.style)
            meta.style = '';
        if (!meta.template)
            meta.template = '';
        if (!meta.attrs)
            meta.attrs = [];
        if (!meta.mode)
            meta.mode = 'open';
        if (!meta.host)
            meta.host = null;
        if (!meta.shadowRoot)
            meta.shadowRoot = null;
        if (!meta.extend)
            meta.extend = { extends: lookupExtend(target) };
        let metaProxy = new Proxy(meta, {
            set: (target, key, value) => {
                target[key] = value;
                updateShadow(target);
                return true;
            }
        });
        target.prototype.webCompMeta = metaProxy;
        // Define Component
        if (!customElements.get(name) && !meta.extend) {
            customElements.define(name, target);
        }
        else if (!customElements.get(name) && meta.extend) {
            customElements.define(name, target, meta.extend);
        }
        else {
            console.error(`CustomElement name :${name} has been defined!!!!`);
        }
        return target;
    };
}
function lookupExtend(target) {
    const builtinElMap = new Map();
    builtinElMap.set(HTMLButtonElement, 'button');
    for (const [el, name] of builtinElMap) {
        if (Object.getPrototypeOf(target) === el)
            return name;
    }
}
function attachShadow(context) {
    let meta = context.webCompMeta;
    const shadowRoot = context.attachShadow({
        mode: meta.mode || "open"
    });
    meta.shadowRoot = shadowRoot;
    meta.host = context;
    updateShadow(meta);
}
function updateShadow(meta) {
    if (meta.shadowRoot) {
        meta.shadowRoot.innerHTML = `${meta.style}${meta.template}`;
    }
}
function getWebCompMeta(context) {
    return context.webCompMeta;
}

let LYTButtonComponent = class LYTButtonComponent extends HTMLButtonElement {
    /**
     *
     */
    constructor() {
        super();
        this.dom = null;
        this.text = '';
        attachShadow(this);
    }
};
LYTButtonComponent = __decorate([
    webComponent('lyt-button', {
        template: html `<slot></slot>`,
        style: css `<style>

    </style>`,
    }),
    __metadata("design:paramtypes", [])
], LYTButtonComponent);

let LYTToggleComponent = class LYTToggleComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = '';
        attachShadow(this);
        let meta = getWebCompMeta(this);
        meta.template += "<div>lyt999</div>";
    }
};
LYTToggleComponent = __decorate([
    webComponent('lyt-toggle', {
        template: html `<div>lyt666</div>`,
        style: css `
    <style>
    div {
    background-color: rebeccapurple;
    }
    </style>`,
    }),
    __metadata("design:paramtypes", [])
], LYTToggleComponent);

let LYTMiniButtonElement = class LYTMiniButtonElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
};
LYTMiniButtonElement = __decorate([
    webComponent('lyt-minibutton', {
        template: html `
        <slot></slot>
        `,
        style: css `<style>
        :host {

            cursor: pointer;

            background-color: #00cc66;
            border-radius: 10px;
            padding: 4px 5px;

            font-size: 13px;
            color: #ff0000;

        }
        </style>`,
    }),
    __metadata("design:paramtypes", [])
], LYTMiniButtonElement);

let LYTLineHElement = class LYTLineHElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
};
LYTLineHElement = __decorate([
    webComponent('lyt-lineh', {
        template: html `
        <div></div>
        `,
        style: css `<style>
        div {
            // display: inline-block;
            height: 2px;
            width: 80%;
            margin: 0 auto;

            background-color: red;
        }
        </style>`,
    }),
    __metadata("design:paramtypes", [])
], LYTLineHElement);

let LYTLineVElement = class LYTLineVElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
};
LYTLineVElement = __decorate([
    webComponent('lyt-linev', {
        template: html `
        <div></div>
        `,
        style: css `<style>
        div {

            width: 2px;
            height: 500px;
            background-color: #FF6633;
        }

        </style>`,
    }),
    __metadata("design:paramtypes", [])
], LYTLineVElement);

(function (scope) {
    scope.LYTButtonComponent = LYTButtonComponent;
    scope.LYTToggleComponent = LYTToggleComponent;
    scope.LYTMiniButtonElement = LYTMiniButtonElement;
    scope.LYTLineHElement = LYTLineHElement;
    scope.LYTLineVElement = LYTLineVElement;
    return scope;
}({}));
