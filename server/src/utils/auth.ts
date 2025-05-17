import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "my-secret");

export async function sign({ payload, expirationTime}: { payload: JWTPayload; expirationTime: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(secret);
}

export async function verify(token: string) {
    const { payload } = await jwtVerify(token, secret);
    return payload;
}
