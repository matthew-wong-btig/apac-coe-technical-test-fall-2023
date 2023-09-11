"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = exports.url = exports.port = exports.host = exports.email = exports.str = exports.num = exports.bool = exports.makeValidator = void 0;
const errors_1 = require("./errors");
const isFQDN = (input) => {
    if (!input.length)
        return false;
    const parts = input.split(".");
    for (let part, i = 0; i < parts.length; i++) {
        part = parts[i];
        if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part))
            return false;
        if (/[\uff01-\uff5e]/.test(part))
            return false;
        if (part[0] === "-" || part[part.length - 1] === "-")
            return false;
    }
    return true;
};
const ipv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const ipv6Regex = /([a-f0-9]+:+)+[a-f0-9]+/;
const isIP = (input) => {
    if (!input.length)
        return false;
    return ipv4Regex.test(input) || ipv6Regex.test(input);
};
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const makeValidator = (parseFn) => {
    return function (spec) {
        return { ...spec, _parse: parseFn };
    };
};
exports.makeValidator = makeValidator;
function bool(spec) {
    return (0, exports.makeValidator)((input) => {
        switch (input) {
            case true:
            case "true":
            case "t":
            case "1":
                return true;
            case false:
            case "false":
            case "f":
            case "0":
                return false;
            default:
                throw new errors_1.EnvError(`Invalid bool input: "${input}"`);
        }
    })(spec);
}
exports.bool = bool;
function num(spec) {
    return (0, exports.makeValidator)((input) => {
        const coerced = parseFloat(input);
        if (Number.isNaN(coerced))
            throw new errors_1.EnvError(`Invalid number input: "${input}"`);
        return coerced;
    })(spec);
}
exports.num = num;
function str(spec) {
    return (0, exports.makeValidator)((input) => {
        if (typeof input === "string")
            return input;
        throw new errors_1.EnvError(`Not a string: "${input}"`);
    })(spec);
}
exports.str = str;
function email(spec) {
    return (0, exports.makeValidator)((x) => {
        if (EMAIL_REGEX.test(x))
            return x;
        throw new errors_1.EnvError(`Invalid email address: "${x}"`);
    })(spec);
}
exports.email = email;
function host(spec) {
    return (0, exports.makeValidator)((input) => {
        if (!isFQDN(input) && !isIP(input)) {
            throw new errors_1.EnvError(`Invalid host (domain or ip): "${input}"`);
        }
        return input;
    })(spec);
}
exports.host = host;
function port(spec) {
    return (0, exports.makeValidator)((input) => {
        const coerced = +input;
        if (Number.isNaN(coerced) ||
            `${coerced}` !== `${input}` ||
            coerced % 1 !== 0 ||
            coerced < 1 ||
            coerced > 65535) {
            throw new errors_1.EnvError(`Invalid port input: "${input}"`);
        }
        return coerced;
    })(spec);
}
exports.port = port;
function url(spec) {
    return (0, exports.makeValidator)((x) => {
        try {
            new URL(x);
            return x;
        }
        catch (e) {
            throw new errors_1.EnvError(`Invalid url: "${x}"`);
        }
    })(spec);
}
exports.url = url;
function json(spec) {
    return (0, exports.makeValidator)((x) => {
        try {
            return JSON.parse(x);
        }
        catch (e) {
            throw new errors_1.EnvError(`Invalid json: "${x}"`);
        }
    })(spec);
}
exports.json = json;
