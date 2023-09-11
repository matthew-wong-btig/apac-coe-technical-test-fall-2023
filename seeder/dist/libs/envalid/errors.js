"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvMissingError = exports.EnvError = void 0;
class EnvError extends TypeError {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, EnvError);
        this.name = this.constructor.name;
    }
}
exports.EnvError = EnvError;
class EnvMissingError extends ReferenceError {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, EnvMissingError);
        this.name = this.constructor.name;
    }
}
exports.EnvMissingError = EnvMissingError;
