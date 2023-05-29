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

// src/service/userServices.ts
var userServices_exports = {};
__export(userServices_exports, {
  service: () => service
});
module.exports = __toCommonJS(userServices_exports);

// src/libs/prisma.ts
var import_client = require("@prisma/client");
var globalForPrisma = global;
var _a;
var prisma = (_a = globalForPrisma.prisma) != null ? _a : new import_client.PrismaClient({
  log: ["query"]
});

// src/service/validation/input.ts
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

// src/config/config.ts
var auth = {
  secret: "srdtfgykhlk456789bhvjftdc",
  exprires: "60"
};

// src/service/authetication/authServices.ts
var import_jsonwebtoken = require("jsonwebtoken");
var authUser = (data) => __async(void 0, null, function* () {
  if (!validationLoginInput(data)) {
    throw new Error("data invalid");
  }
  const user = yield prisma.users.findUnique({
    where: {
      email: data.email
    }
  });
  if (!user || !user.password) {
    throw new Error("user not found");
  }
  const token = (0, import_jsonwebtoken.sign)(
    {
      id: user.id,
      login: user.name,
      email: user.email
    },
    auth.secret,
    {
      expiresIn: "1h"
    }
  );
  return { token };
});

// src/service/userServices.ts
var import_crypto = require("crypto");
var service = {
  getUser(id) {
    return __async(this, null, function* () {
      const user = yield prisma.users.findFirst({
        where: {
          id: {
            equals: id
          }
        }
      });
      if (!user) {
        throw new Error("user not exists ");
      }
      const userOutput = {
        id: user.id,
        email: user.email,
        telephone: user.telephone,
        created_at: user.created_at,
        modified_at: user.modified_at
      };
      return userOutput;
    });
  },
  singIn(login) {
    return __async(this, null, function* () {
      const { token } = yield authUser(login);
      if (!token) {
        throw new Error("not found");
      }
      return token;
    });
  },
  signUp(user) {
    return __async(this, null, function* () {
      if (!validationUserInput(user)) {
        throw new Error("input invalid");
      }
      const telephone = [{
        number: user.telephone.number,
        area_code: user.telephone.area_code
      }];
      const passwordEncode = (0, import_crypto.createCipheriv)("aes-256-cbc", (0, import_crypto.randomBytes)(16), user.password.trim());
      prisma.$connect();
      const userCreated = yield prisma.users.create({
        data: {
          name: user.name,
          email: user.email,
          password: String(passwordEncode),
          telephone,
          created_at: /* @__PURE__ */ new Date(),
          modified_at: /* @__PURE__ */ new Date()
        }
      });
      if (!userCreated) {
        throw new Error("Not was possible create user");
      }
      const output = {
        id: userCreated.id,
        created_at: /* @__PURE__ */ new Date(),
        modified_at: /* @__PURE__ */ new Date()
      };
      return output;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  service
});
