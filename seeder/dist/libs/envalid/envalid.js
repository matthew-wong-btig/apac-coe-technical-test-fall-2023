"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOnly = exports.customCleanEnv = exports.cleanEnv = void 0;
const core_1 = require("./core");
const middleware_1 = require("./middleware");
function cleanEnv(environment, specs, options = {}) {
    const cleaned = (0, core_1.getSanitizedEnv)(environment, specs, options);
    return Object.freeze((0, middleware_1.applyDefaultMiddleware)(cleaned, environment));
}
exports.cleanEnv = cleanEnv;
function customCleanEnv(environment, specs, applyMiddleware, options = {}) {
    const cleaned = (0, core_1.getSanitizedEnv)(environment, specs, options);
    return Object.freeze(applyMiddleware(cleaned, environment));
}
exports.customCleanEnv = customCleanEnv;
const testOnly = (defaultValueForTests) => {
    return process.env.NODE_ENV === "test"
        ? defaultValueForTests
        : core_1.testOnlySymbol;
};
exports.testOnly = testOnly;
