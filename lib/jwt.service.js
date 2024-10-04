"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var jwt = require("jsonwebtoken");
var JwtService = /** @class */ (function () {
    function JwtService(options) {
        this.EXP_TIME_MS = options.expiryTimeMS;
        this.JWT_SECRET = options.jwtSecret;
        this.JWT_ISS = options.jwtIssuer;
    }
    JwtService.create = function (options) {
        console.log("[JwtService] create");
        return new JwtService(options);
    };
    JwtService.prototype.isUserJwtPayload = function (payload) {
        return payload.type === "user";
    };
    JwtService.prototype.generateUserToken = function (id, options) {
        return this._signToken({
            iss: this.JWT_ISS,
            sub: id,
            aud: "*",
            type: "user",
            iat: moment().unix()
        }, options);
    };
    JwtService.prototype.generateCustomToken = function (subjectId, type, options) {
        return this._signToken({
            iss: this.JWT_ISS,
            sub: subjectId,
            aud: "*",
            type: type,
            iat: moment().unix(),
        }, options);
    };
    JwtService.prototype.parseToken = function (token, overrodeToken) {
        var _secret = !!overrodeToken ? overrodeToken : this.JWT_SECRET;
        return jwt.verify(token, _secret);
    };
    JwtService.prototype._signToken = function (payload, options) {
        var newPayload = __assign({}, options.customClaims, payload, { nbf: payload.iat });
        if (options.expires) {
            var _expiryTime = !!options.override_expiry_time_ms ? options.override_expiry_time_ms : this.EXP_TIME_MS;
            newPayload["exp"] = moment(payload.iat * 1000).add(_expiryTime).unix();
        }
        var _secret = !!options.override_jwt_secret ? options.override_jwt_secret : this.JWT_SECRET;
        return jwt.sign(newPayload, _secret);
    };
    return JwtService;
}());
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map