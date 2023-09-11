"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSanitizedEnv = exports.testOnlySymbol = void 0;
const errors_1 = require("./errors");
const reporter_1 = require("./reporter");
exports.testOnlySymbol = Symbol("envalid - test only");
function validateVar({ spec, name, rawValue, }) {
    if (typeof spec._parse !== "function") {
        throw new errors_1.EnvError(`Invalid spec for "${name}"`);
    }
    const value = spec._parse(rawValue);
    if (spec.choices) {
        if (!Array.isArray(spec.choices)) {
            throw new TypeError(`"choices" must be an array (in spec for "${name}")`);
        }
        else if (!spec.choices.includes(value)) {
            throw new errors_1.EnvError(`Value "${value}" not in choices [${spec.choices}]`);
        }
    }
    if (value == null)
        throw new errors_1.EnvError(`Invalid value for env var "${name}"`);
    return value;
}
function formatSpecDescription(spec) {
    const egText = spec.example ? ` (eg. "${spec.example}")` : "";
    const docsText = spec.docs ? `. See ${spec.docs}` : "";
    return `${spec.desc}${egText}${docsText}`;
}
const readRawEnvValue = (env, k) => {
    return env[k];
};
const isTestOnlySymbol = (value) => value === exports.testOnlySymbol;
function getSanitizedEnv(environment, specs, options = {}) {
    let cleanedEnv = {};
    const errors = {};
    const varKeys = Object.keys(specs);
    const rawNodeEnv = readRawEnvValue(environment, "NODE_ENV");
    for (const k of varKeys) {
        const spec = specs[k];
        const rawValue = readRawEnvValue(environment, k);
        if (rawValue === undefined) {
            const usingDevDefault = rawNodeEnv &&
                rawNodeEnv !== "production" &&
                spec.hasOwnProperty("devDefault");
            if (usingDevDefault) {
                cleanedEnv[k] = spec.devDefault;
                continue;
            }
            if (spec.hasOwnProperty("default")) {
                cleanedEnv[k] = spec.default;
                continue;
            }
        }
        try {
            if (isTestOnlySymbol(rawValue)) {
                throw new errors_1.EnvMissingError(formatSpecDescription(spec));
            }
            if (rawValue === undefined) {
                cleanedEnv[k] = undefined;
                throw new errors_1.EnvMissingError(formatSpecDescription(spec));
            }
            else {
                cleanedEnv[k] = validateVar({ name: k, spec, rawValue });
            }
        }
        catch (err) {
            if ((options === null || options === void 0 ? void 0 : options.reporter) === null)
                throw err;
            if (err instanceof Error)
                errors[k] = err;
        }
    }
    const reporter = (options === null || options === void 0 ? void 0 : options.reporter) || reporter_1.defaultReporter;
    reporter({ errors, env: cleanedEnv });
    return cleanedEnv;
}
exports.getSanitizedEnv = getSanitizedEnv;
