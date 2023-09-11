"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDefaultMiddleware = exports.accessorMiddleware = exports.strictProxyMiddleware = void 0;
const strictProxyMiddleware = (envObj, rawEnv) => {
    const inspectables = [
        "length",
        "inspect",
        "hasOwnProperty",
        "toJSON",
        Symbol.toStringTag,
        Symbol.iterator,
        "asymmetricMatch",
        "nodeType",
        "$$typeof",
        "then",
        "__esModule",
    ];
    const inspectSymbolStrings = [
        "Symbol(util.inspect.custom)",
        "Symbol(nodejs.util.inspect.custom)",
    ];
    return new Proxy(envObj, {
        get(target, name) {
            var _a;
            if (inspectables.includes(name) ||
                inspectSymbolStrings.includes(name.toString())) {
                return target[name];
            }
            const varExists = target.hasOwnProperty(name);
            if (!varExists) {
                if (typeof rawEnv === "object" && ((_a = rawEnv === null || rawEnv === void 0 ? void 0 : rawEnv.hasOwnProperty) === null || _a === void 0 ? void 0 : _a.call(rawEnv, name))) {
                    throw new ReferenceError(`[envalid] Env var ${name} was accessed but not validated. This var is set in the environment; please add an envalid validator for it.`);
                }
                throw new ReferenceError(`[envalid] Env var not found: ${name}`);
            }
            return target[name];
        },
        set(_target, name) {
            throw new TypeError(`[envalid] Attempt to mutate environment value: ${name}`);
        },
    });
};
exports.strictProxyMiddleware = strictProxyMiddleware;
const accessorMiddleware = (envObj, rawEnv) => {
    const computedNodeEnv = envObj.NODE_ENV || rawEnv.NODE_ENV;
    const isProd = !computedNodeEnv || computedNodeEnv === "production";
    Object.defineProperties(envObj, {
        isDevelopment: { value: computedNodeEnv === "development" },
        isDev: { value: computedNodeEnv === "development" },
        isProduction: { value: isProd },
        isProd: { value: isProd },
        isTest: { value: computedNodeEnv === "test" },
    });
    return envObj;
};
exports.accessorMiddleware = accessorMiddleware;
const applyDefaultMiddleware = (cleanedEnv, rawEnv) => {
    return (0, exports.strictProxyMiddleware)((0, exports.accessorMiddleware)(cleanedEnv, rawEnv), rawEnv);
};
exports.applyDefaultMiddleware = applyDefaultMiddleware;
