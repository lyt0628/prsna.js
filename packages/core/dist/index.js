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
function defineGet(target, name, getter) {
    Object.defineProperty(target, name, {
        get: getter,
        enumerable: true,
        configurable: true,
    });
}
function defineSet(target, name, setter) {
    Object.defineProperty(target, name, {
        set: setter,
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
    const cloned = deepCopy(arr);
    let ret = '';
    cloned.forEach((item, idx) => {
        ret += fn(item, idx);
    });
    return ret;
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

export { attachShadow, css, deepCopy, defineGet, defineSet, getWebCompMeta, html, mpaconcat, syncAttr, webComponent, wrapEl };
