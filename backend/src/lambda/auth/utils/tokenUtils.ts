import axios from "axios";
import * as pkg from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

export const getPublicKey = async () => {
  const response = await axios.get(
    `https://cognito-idp.us-east-1.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`
  );
  const keys = response.data.keys;

  if (!keys || keys.length === 0) {
    throw new Error("No keys found in JWKS");
  }
  
  return keys;
};

export const verifyToken = (token: string, keys: any) => {
  const decoded = pkg.decode(token, { complete: true }); // complete: true brings the header and signature as well as the payload
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error("Invalid token structure");
  }

  const key = keys.find((k: any) => k.kid === decoded.header.kid);
  if (!key) {
    throw new Error("Key not found in JWKS");
  }

  const jwk = { kty: key.kty, n: key.n, e: key.e };
  const publicKey = jwkToPem(jwk);
  return pkg.verify(token, publicKey);
};