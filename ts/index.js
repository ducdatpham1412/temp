import crypto from "crypto";

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA4Ze/3IfOTsGb9/vBi4QbbjXsf46n7+7ssQRwiGgfHyTMcmSz64dV
aN5A38MpHc+CGKWUCi+XLUlmCiW5XeUXWBbwRBgtsn63WD6mypCljVy8bc71vkWK
YmNUEme6BRb+4yRkU85PO3EOdGIPSRjFXpHNnHvlIr1UDhBAT9uxrC3HbvxCDFwO
Osmvqshdtn70M32GE7WN56AJUhM9XBLK5XmaCyVWTY1JKWikhYJ4HwgDC9y5ddAR
zX7chrR6yThSU+2uLL3wl7OeVWRzqpxFRf0SJuiI6NF4eQW0fvmgrMY7qei4BDDj
G3+KjyRbiNUR87MnKT83XI6QFqS86+yAoQIDAQAB
-----END RSA PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA4Ze/3IfOTsGb9/vBi4QbbjXsf46n7+7ssQRwiGgfHyTMcmSz
64dVaN5A38MpHc+CGKWUCi+XLUlmCiW5XeUXWBbwRBgtsn63WD6mypCljVy8bc71
vkWKYmNUEme6BRb+4yRkU85PO3EOdGIPSRjFXpHNnHvlIr1UDhBAT9uxrC3HbvxC
DFwOOsmvqshdtn70M32GE7WN56AJUhM9XBLK5XmaCyVWTY1JKWikhYJ4HwgDC9y5
ddARzX7chrR6yThSU+2uLL3wl7OeVWRzqpxFRf0SJuiI6NF4eQW0fvmgrMY7qei4
BDDjG3+KjyRbiNUR87MnKT83XI6QFqS86+yAoQIDAQABAoIBAF/MBwdpDCzZfpgB
6qCKSvO0JmfMdngm55AMKJVkUcLx53e0V8ruv1A3ASmEQJOOKNq6hXEF4Ja0koZA
msTKoe0gYIsqEU25DbaFdGKUphivhrzCpAxWj3tUXsEqFw5OQ5LFQ21rMK43RkIZ
2g/aWwXbuIp4+kaUS3tlX0oKKxrH0ZjIA+jMUzp47cdcpauhJBF42mu7uRwCgMRe
9PMwEDOh4oIrjjrC/DA8iNBRp0HnhiKD2kVIoAAoIGYVaCokpNXekHgBGlmTV53N
Ygnc8qdVrQbmJ3tHkzqmwKPiREwkgDKhS+x0hmsslXbHSoyC5eXofKE/cAr86Zsc
76jRBgECgYEA+0lLYrVSAzIl/fnCpqYjIQtYhvOTnGDF5VSVs7DjNZYLYLPL9h21
AwVIihjjl7GdN6A/JHarby5K1NRn9oW0SZ7AGKM4GZ8qEQk3odtcLx9yIN5CPuEy
9IN748vp6jt1kZbkJecIFP4ETeSpfnkPKFAvpt8/ncnNTQjgjHQX15ECgYEA5dMS
Wp0TdltfA6Y4GJq8j6tiGGqkCs6pKNbNnAvflBlN+NbhIGZv6kWHSN6y3DM4Dd8Y
opT2oUDXfGhhP420gI/pEa1+YrFluKGfMp+qYcxRnOO6mK8UxPSCHPzYVbSM4D6I
SognlTb4kpsqlVmuOz4C+MtnvFvd3UwloiEsMBECgYAmal8W+QdPq8P5HsyuM2nd
bGGdR/GCD51RYOv964XgtE6K+xGsT4BTtOQREJsCnsmdLmdYyLeOqLIR9WLrYidc
teNCIPm7mQSSVCloGiPupE0LT08rU7w5ezxeZ9cb0vk3R60bSkWHCApaaiGrTxCN
Ji0SwsBz+9zh8QB7GGhosQKBgBQnTT269oDzhEJ6qgKmVxC2M7T2bQoxky3soD0l
4WZITckbdsRzly7RCAsA1Ghw6WJ2BOAE9hev6vWS5axADesUM5kEQMgAzG3DZoV2
8OcAlsuOQMew2r5mvp4yIfpqCcyET0lR5T61gljA2JweMCQrzPDqTV98ItmMGuS7
yfcxAoGALDg3uj3oW9B1Jw380cTpa97UFAuaTXJTTbpnZhlLRSVpZ8emi6JXo2A/
X2OVfpN+0AiIVW0n6MY2ECrU8PRcnhxMZ3GMkXdYpHj2bQkUPltJEnqrAdt/DDcz
r0QYM/cevbCGsH+BTFQwk6GfGO+3TPdoyxDYFbI9+rZai5/uQho=
-----END RSA PRIVATE KEY-----`;

const data = "Hello world";

const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha1",
    },
    Buffer.from(data)
);

const encryptedString = encryptedData.toString("base64");
console.log(`encrypted string is -${encryptedString}`);

const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha1",
    },
    Buffer.from(encryptedString, "base64")
);

console.log("final: ", decryptedData.toString());
