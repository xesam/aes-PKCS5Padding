# AES PKCS5Padding demo

```javascript

const assert = require("assert");
const PKCS5Padding = require("./aes-PKCS5Padding.js").PKCS5Padding;

let encrypted1 = PKCS5Padding.encrypt(
    "a",
    "37018b97111147b295a0b438c67ff54a",
    "6572434969fe497e9f2f35d131f08765"
);
assert.deepEqual(encrypted1, "0ec60dfdc38f86163bca83347955eaf9");

let encrypted2 = PKCS5Padding.encrypt(
    "abcdefghijklmnopqrst",
    "6162636465666768696a6b6c6d6e6f70",
    "6162636465666768696a6b6c6d6e6f70"
);
assert.deepEqual(
    encrypted2,
    "f5657e278d0afad7c848b965898c31df2fce53fee2f55f77833b14981529bee1"
);

let encrypted3 = PKCS5Padding.encrypt(
    "abcdefghijklmnopqrst",
    [0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6a,0x6b,0x6c,0x6d,0x6e,0x6f,0x70],
    [0x61,0x62,0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6a,0x6b,0x6c,0x6d,0x6e,0x6f,0x70],
);
assert.deepEqual(
    encrypted3,
    "f5657e278d0afad7c848b965898c31df2fce53fee2f55f77833b14981529bee1"
);

let decrypted1 = PKCS5Padding.decrypt(
    "0ec60dfdc38f86163bca83347955eaf9",
    "37018b97111147b295a0b438c67ff54a",
    "6572434969fe497e9f2f35d131f08765"
);
assert.deepEqual(decrypted1, "a");

let decrypted2 = PKCS5Padding.decrypt(
    "f5657e278d0afad7c848b965898c31df2fce53fee2f55f77833b14981529bee1",
    "6162636465666768696a6b6c6d6e6f70",
    "6162636465666768696a6b6c6d6e6f70"
);
assert.deepEqual(decrypted2, "abcdefghijklmnopqrst");


```