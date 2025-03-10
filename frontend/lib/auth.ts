import { getAccessTokenCookie } from "../utils/token/get-token";
import verifyToken from "../utils/token/verify-token";

export default async function isAuthenticated(): Promise<boolean> {
    const access_Tk: string | boolean | undefined = getAccessTokenCookie();
    // Handle boolean or undefined access_Tk properly
    if (access_Tk && typeof access_Tk === 'string') {
        return await verifyToken(access_Tk);
    } else {
        return false;
    }
}