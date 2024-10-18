export function addStaticMethod(name, func) {
    return function (target) {
        target[name] = func;
    };
}
export function addSuperClass(superClass) {
    return function (targetClass) {
        return class extends superClass {
            constructor(...args) {
                super(...args); // Call parent ctor
                return new targetClass(...args); // and capp subclass ctor
            }
        };
    };
}
export function webComponent(name) {
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
export default {
    addStaticMethod, addSuperClass
};
