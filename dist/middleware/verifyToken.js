"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/middleware/verifyToken.ts
var verifyToken_exports = {};
__export(verifyToken_exports, {
  middleware: () => middleware
});
module.exports = __toCommonJS(verifyToken_exports);
var import_jsonwebtoken = require("jsonwebtoken");

// src/config/config.ts
var auth = {
  secret: "srdtfgykhlk456789bhvjftdc",
  exprires: "60"
};

// src/middleware/verifyToken.ts
var middleware = {
  verifyToken(req, res, next) {
    return __async(this, null, function* () {
      const token = req.headers.authorization;
      if (token === void 0) {
        throw new Error("token not exists or invalid");
      }
      try {
        const decoded = (0, import_jsonwebtoken.verify)(token, auth.secret);
        return next();
      } catch (error) {
        return next(res.status(401).json({
          error: `error: ${error}`
        }));
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  middleware
});
