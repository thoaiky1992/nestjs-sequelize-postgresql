"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestLogger = void 0;
const common_1 = require("@nestjs/common");
class NestLogger extends common_1.Logger {
    log(message, context) {
        super.log(message, context);
    }
    error(message, context) {
        super.error(message, context);
    }
    warn(message, context) {
        super.warn(message, context);
    }
    debug(message, context) {
        super.debug(message, context);
    }
    verbose(message, context) {
        super.verbose(message, context);
    }
}
exports.NestLogger = NestLogger;
//# sourceMappingURL=logger.js.map