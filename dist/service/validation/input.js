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

// src/service/validation/input.ts
var input_exports = {};
__export(input_exports, {
  validationLoginInput: () => validationLoginInput,
  validationUserId: () => validationUserId,
  validationUserInput: () => validationUserInput
});
module.exports = __toCommonJS(input_exports);
var import_zod = require("zod");
var userSchema = import_zod.z.object({
  name: import_zod.z.string({ description: "name invalid or null" }),
  email: import_zod.z.string({ description: "email invalid or null" }).email(),
  password: import_zod.z.string(),
  telephone: import_zod.z.object({
    number: import_zod.z.number({ description: "number telephone invalid or null" }).min(9).max(9),
    area_code: import_zod.z.number({ description: "area_code or null" }).min(2).max(2)
  })
});
var loginSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string()
});
var validationUserInput = (user) => {
  try {
    if (user === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
var validationLoginInput = (login) => {
  try {
    if (typeof login !== "object" || login === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
var validationUserId = (id) => {
  try {
    if (id == null) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationLoginInput,
  validationUserId,
  validationUserInput
});
