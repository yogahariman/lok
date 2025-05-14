const xorPassword = ".4x03g138g7aq1.";
const s = "VRYVUUEEWWdKCFgRAhMUdU9aU1wDVBECUgdQQQEfHgFUEl8CR1ZURQ1RXRNdS1gdU0dFCwMURVYMHkRAWhZCAB9FVVZZAxVbQR0MWVsNXlcCVRECVxtDGUEMFARUElITRVJbDBVbQR0MSlEeVV0UVBECVxtDAlRfDA5ITR8cE1BXA1JDSwQeHwRIAgNSHRFUAkEEHRMUHhhaQ1YLVFBMRQ1RXRNPQ1sNXkdFCwMURVMEEFUMFARUEkQIRF1cAlNDSwECDFwIEglXHRFZE0MAEloMFARUElcCV1ZWFFJDSwECDEcdQRFdAU4UHBUCHlVLDA5NAAJXAQAIUhtDHVRYS1haCgNLE0BdC1ICBRMUHhhaUV4IRF1MRQ1QRAEeHgRUElcCUFcaXQdNU0ZBW1ocVVdFCwMURV8RUwseAhYZREcGUlgaXQdNU1VLSFEWQ1ZFCwMURUQEABMUHklUSxEEXlddRQ1UQQAeHgVIBB9FXVZOAltDSwECDEcdXFYERRECVxtDEFxBW1oMEglXHRFcAlYFUwseAhYPX0YJVVZcRQ1RXRNGXhZCAB9FUEdMBlQKUwseAhYcVVUCX0BdRQ1RXRNdS0VaCgMaHUgaBFgFFBMUGwRJAANVAQcURVsEB1RCDA5IHBEUVF9dBENDSwECDFUVX0YJRRECVxtDFVRPShZCAB9FRlxNCVMEFRMUHhhaWENFCwMURVYVBVBNRRZCAB9FVVZeAlkSFBMUHhhaQ1YWEwkIGhsaU1JBSlFaCgZXAAMIVAdVXRNCS0IdXBFdAR8aFFINFFJaDA5IHBEGXFxNCUNDSwECDFAdUVdFCwMURUAOBF9KS1BaCgNLE1tIRQ1RXRNPWkAZU1hFCwMURVMEF1RAXVFaCgNLE0BdFhVbQUwCVRYbX1cCEwkNVwZRQQAeHRhaXFYRVF8aXQdNU0JLQlEbRBFdAR8aBloOBF9aDA5IHBEDVFJcRQ1RXRNZQUEWVFYDEwkISxUJARMUHhhaUUcTUFBTRQ1RXRNKS1IdXkACEwkISxUSFEAMFAQFHEhFUlxcAhVbRAEfHgRKAABLE19dEVINUwseAhYLVV8CUkcaXQdNU1BDQUEWRBFdAR8aA1IAFRMUHhhaR1wSX1ddAxVbQR0MRkRaCgNLE1JME1YCGhMUHhhaVFYBVF1LAhVbQR0MXVEJEglXTG4URUUAHV1XY1sxVBFdEwUAVQNSFwAeTwNKUwpXBVFbXlVVQAJMTRYF";

// Decode base64 to bytes
function base64ToBytes(b64) {
    const binaryStr = atob(b64);
    return Uint8Array.from([...binaryStr].map(c => c.charCodeAt(0)));
}

// Encode bytes to base64
function bytesToBase64(bytes) {
    const binaryStr = String.fromCharCode(...bytes);
    return btoa(binaryStr);
}

// XOR decrypt/encrypt using the same method
function xorBytes(bytes, password) {
    return bytes.map((byte, index) => byte ^ password.charCodeAt(index % password.length));
}

// Convert byte array to string
function bytesToString(bytes) {
    return String.fromCharCode(...bytes);
}

// Convert string to byte array
function stringToBytes(str) {
    return Uint8Array.from([...str].map(c => c.charCodeAt(0)));
}

// 🔓 Decrypt function (like b64xor_dec)
function b64xorDec(s, password) {
    const base64Bytes = base64ToBytes(s);
    const decryptedBytes = xorBytes(base64Bytes, password);
    const decryptedStr = bytesToString(decryptedBytes);
    return JSON.parse(decryptedStr);
}

// 🔒 Encrypt function (like b64xor_enc)
function b64xorEnc(obj, password) {
    const jsonStr = JSON.stringify(obj); // no space formatting like separators=(',', ':')
    const plainBytes = stringToBytes(jsonStr);
    const xoredBytes = xorBytes(plainBytes, password);
    return bytesToBase64(xoredBytes);
}

// ✅ Coba decode string s
try {
    const result = b64xorDec(s, xorPassword);
    console.log("Hasil decrypt:", result);

    // ✅ Coba encode lagi
    const encrypted = b64xorEnc(result, xorPassword);
    console.log("Hasil encrypt ulang:", encrypted);

    // Opsional: cek sama seperti input awal?
    console.log("Apakah hasil encode sama dengan input awal?", encrypted === s);
} catch (e) {
    console.error("Gagal decode atau encode:", e.message);
}
