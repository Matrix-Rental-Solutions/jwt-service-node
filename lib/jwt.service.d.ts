import { BaseJwtPayload, JwtOptions, JwtSignOptions, UserJwtPayload } from "./jwt.extras";
export declare class JwtService {
    private readonly EXP_TIME_MS;
    private readonly JWT_ISS;
    private readonly JWT_SECRET;
    private constructor();
    static create(options: JwtOptions): JwtService;
    isUserJwtPayload(payload: BaseJwtPayload): payload is UserJwtPayload;
    generateUserToken(id: number | string, options: JwtSignOptions): string;
    generateCustomToken(subjectId: number | string, type: string, options: JwtSignOptions): string;
    parseToken(token: string, overrodeToken?: string): BaseJwtPayload;
    private _signToken;
}
