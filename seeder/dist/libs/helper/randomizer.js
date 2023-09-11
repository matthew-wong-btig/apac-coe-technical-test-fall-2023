"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finiteStateRandomizer = void 0;
const finiteStateRandomizer = (stateArr) => {
    return stateArr[Math.floor(Math.random() * stateArr.length)];
};
exports.finiteStateRandomizer = finiteStateRandomizer;
