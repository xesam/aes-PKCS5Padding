const aesjs = require("aes-js");

const BLOCK_SIZE = 16;

function padding(text, blockSize = 16) {
    let len = text.length;
    let remainder = len % blockSize;
    let padding = blockSize - remainder;
    let codes = text.split("").map(ele => ele.charCodeAt(0));
    for (let i = remainder; i < blockSize; i++) {
        codes.push(padding);
    }
    return codes;
}

function PKCS5Padding(text) {
    return padding(text, BLOCK_SIZE);
}

function chunk(text, size) {
    let chunks = [];
    let len = text.length;
    let count = Math.ceil(len / size);
    for (let i = 1; i <= count; i++) {
        chunks.unshift(text.substring(len - size * i, len - size * (i - 1)));
    }
    return chunks;
}

function chunk2(key) {
    if (typeof key === "string") {
        return chunk(key, 2).map(ele => {
            return parseInt(ele, 16);
        });
    } else {
        return key;
    }
}

function encrypt(text, key, iv) {
    key = chunk2(key);
    iv = chunk2(iv);
    text = aesjs.utils.utf8.fromBytes(PKCS5Padding(text));
    let textBytes = aesjs.utils.utf8.toBytes(text);
    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let encryptedBytes = aesCbc.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(encrypted, key, iv, blockSize = BLOCK_SIZE) {
    key = chunk2(key);
    iv = chunk2(iv);
    let encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let decryptedBytes = aesCbc.decrypt(encryptedBytes);
    decryptedBytes = decryptedBytes.filter(ele => ele > blockSize);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

module.exports = {
    PKCS5Padding: {
        chunk,
        padding,
        encrypt,
        decrypt
    }
};
