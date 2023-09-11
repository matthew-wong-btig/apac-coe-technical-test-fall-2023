"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitNumber = exports.defaultSplitNumberOptions = void 0;
exports.defaultSplitNumberOptions = {
    numSegment: 3,
};
function splitNumber(num, options = exports.defaultSplitNumberOptions) {
    const numArr = [];
    let currNum = num;
    for (let i = 0; i < options.numSegment - 1; i++) {
        const portion = Math.floor(currNum * Math.random());
        numArr.push(portion);
        currNum = currNum - portion;
    }
    numArr.push(currNum);
    return numArr;
}
exports.splitNumber = splitNumber;
