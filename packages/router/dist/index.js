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

class Router {
    constructor(rootId, routes) {
        if (!rootId)
            console.error("[Router] Root Element should not be blank!");
        if (!routes)
            console.error("[Router] routes should not be null or undefined!");
        this.rootElem = document.getElementById(rootId);
        if (!this.rootElem)
            console.error(`[Router] Element for rootId ${rootId} does not exists!`);
        this.routes = routes;
    }
    init() {
        if (!this.rootElem)
            return;
        this.navi(window.location.pathname);
    }
    navi(path) {
        if (!this.rootElem)
            return;
        const route = this.findRoute(path);
        if (!route) {
            console.error(`[Router] Route for ${path} does not exists`);
            return;
        }
        this.relove(route);
    }
    findRoute(path) {
        return this.routes.find((route) => {
            route.path == path;
        });
    }
    relove(route) {
        if (!this.rootElem)
            return;
        const view = document.createElement(route.elem);
        if (route.title) {
            document.title = route.title;
        }
        this.rootElem.innerHTML = '';
        this.rootElem.appendChild(view);
    }
}

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
function updateShadow(meta) {
    if (meta.shadowRoot) {
        meta.shadowRoot.innerHTML = `${meta.style}${meta.template}`;
    }
}

let LYTRouterElement = class LYTRouterElement extends HTMLElement {
    constructor() {
        super();
        if (!this.id)
            this.id = 'lyt-router';
        const routes = this.getAttribute('routes');
        let routeArray = new Array();
        if (routes) {
            routeArray = JSON.parse(routes);
        }
        let rootId = this.getAttribute('rootId');
        if (!rootId)
            rootId = this.id;
        this.router = new Router(rootId, routeArray);
    }
};
LYTRouterElement = __decorate([
    webComponent('lyt-router', {
        attrs: ['routes', 'rootId']
    }),
    __metadata("design:paramtypes", [])
], LYTRouterElement);

// import { LYTLinkElement } from "./LinkComp";
(function (scope) {
    scope.LYTRouterElement = LYTRouterElement;
    // scope.LYTLinkElement = LYTLinkElement;
    return scope;
}({}));
