import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "my-secret");

type MyJWTPayload = JWTPayload & { userId: string; companyId: string; role: "user" | "admin" };

export async function sign({ payload, expirationTime}: { payload: MyJWTPayload; expirationTime: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(secret);
}

export async function verify(token: string): Promise<MyJWTPayload> {
    const { payload } = await jwtVerify(token, secret);
    return payload as MyJWTPayload;
}
