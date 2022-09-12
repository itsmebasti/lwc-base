import cookie from "./cookie";
import ChangeHandlerProxy from "./changeHandlerProxy";
import { trueTypeOf } from "./trueTypeOf";
import TrackedSet from "./trackedSet";

const COOKIE = cookie('cache');

export function CacheMixin(Base) {
    return class extends Base {
        cached(defaults) {
            const result = {};
            const cmp = this;

            result.reset = (...properties) => {
                properties.forEach((property) => {
                    cmp.cache[property] = defaults[property];
                })
            }

            Object.getOwnPropertyNames(defaults).forEach((property) => {
                Object.defineProperty(result, property, {
                    get() {
                        const defaultValue = defaults[property];
                        const type = trueTypeOf(defaultValue);

                        let result = COOKIE[property] !== undefined ? COOKIE[property] : defaultValue;

                        if (type === 'Set') {
                            result = new TrackedSet([...result], (value) => cmp.cache[property] = value);
                        } else if (['Object', 'Array'].includes(type)) {
                            result = new ChangeHandlerProxy(result, (value) => cmp.cache[property] = value);
                        }

                        return result;
                    },

                    set(value) {
                        COOKIE[property] = value;
                    }
                });
            });

            return Object.preventExtensions(result);
        }
    };
}
