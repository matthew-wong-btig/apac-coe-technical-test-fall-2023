"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultReporter = exports.envalidErrorFormatter = void 0;
const errors_1 = require("./errors");
const defaultLogger = console.error.bind(console);
const isNode = !!(typeof process === "object" && ((_a = process === null || process === void 0 ? void 0 : process.versions) === null || _a === void 0 ? void 0 : _a.node));
const colorWith = (colorCode) => (str) => isNode ? `\x1b[${colorCode}m${str}\x1b[0m` : str;
const colors = {
    blue: colorWith("34"),
    white: colorWith("37"),
    yellow: colorWith("33"),
};
const RULE = colors.white("================================");
const envalidErrorFormatter = (errors, logger = defaultLogger) => {
    const missingVarsOutput = [];
    const invalidVarsOutput = [];
    for (const [k, err] of Object.entries(errors)) {
        if (err instanceof errors_1.EnvMissingError) {
            missingVarsOutput.push(`    ${colors.blue(k)}: ${err.message || "(required)"}`);
        }
        else
            invalidVarsOutput.push(`    ${colors.blue(k)}: ${(err === null || err === void 0 ? void 0 : err.message) || "(invalid format)"}`);
    }
    if (invalidVarsOutput.length) {
        invalidVarsOutput.unshift(` ${colors.yellow("Invalid")} environment variables:`);
    }
    if (missingVarsOutput.length) {
        missingVarsOutput.unshift(` ${colors.yellow("Missing")} environment variables:`);
    }
    const output = [
        RULE,
        invalidVarsOutput.sort((a, b) => a.localeCompare(b)).join("\n"),
        missingVarsOutput.sort((a, b) => a.localeCompare(b)).join("\n"),
        RULE,
    ]
        .filter((x) => !!x)
        .join("\n");
    logger(output);
};
exports.envalidErrorFormatter = envalidErrorFormatter;
const defaultReporter = ({ errors = {} }, { onError, logger } = { logger: defaultLogger }) => {
    if (!Object.keys(errors).length)
        return;
    (0, exports.envalidErrorFormatter)(errors, logger);
    if (onError) {
        onError(errors);
    }
    else if (isNode) {
        logger(colors.yellow("\n Exiting with error code 1"));
        process.exit(1);
    }
    else {
        throw new TypeError("Environment validation failed");
    }
};
exports.defaultReporter = defaultReporter;
