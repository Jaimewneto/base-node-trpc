import { sign } from "../utils/auth";

const getAdminToken = async () => {
    console.log(await sign({ payload: { userId: "00000000000000000000000000", companyId: "00000000000000000000000000", role: "admin" }, expirationTime: "1h" }));
};

getAdminToken();
