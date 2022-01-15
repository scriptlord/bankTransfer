"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = void 0;
function generateAccountNumber(start) {
    start = parseInt(start);
    while (!(start.length > 10)) {
        start = start + 1;
        return start.toString();
    }
}
exports.generateAccountNumber = generateAccountNumber;
//# sourceMappingURL=AccountGenerator.js.map