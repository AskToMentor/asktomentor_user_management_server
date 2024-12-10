const admin = require("firebase-admin");

const firebaseConfig = {
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    client_email: "firebase-adminsdk-gzrd4@loginsetup-afe25.iam.gserviceaccount.com",
    client_id: "117189862306125416326",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gzrd4%40loginsetup-afe25.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXwFYlxZQL+HY+\nZIF/25ULmquXsQiINqLa++AbGicP7XxNAxmQ+wEwHheeHgN7dlCWCX+gHCH4bnry\nPlHCIzanYCSnlVe4ap8kPnTGECIMRhYF4Bxh5ta41es5eO4nLTXCsAkllQJOKcmm\nKob9ADMygiD0I/eCKjSCkmq+uD+Pn04l3Gdh01tqaSCMUj4USBik3RdVxIL9s+Q4\n4ge6Ub2fRQjUcfqibGis7KnKI0C4VkTCdv2JGj2C5IaTiizFTO3sBvN3PqgfYjd2\nCwJre9kDj4m2JsJeg/R1IYvorBylVv4qni88O9+x1C0gwRP4YQbAWNuRpqGKuXt0\nTLrH+LSdAgMBAAECggEAFqCxJ84zkmpg1VJexf4r1hBg5ExbUZZWB9G1e80VRIh8\nt64N5qKq7W4bRvJCQitk/k5Zx7nSLe1pa0w0HD7sdB4/sPZxn1fUtY6TkoIO1aYw\nu/0MNmP5ohOR0N7RoilZYhemMYKr1pRgE2U1fi3EtJQXTlg7nJ7m+A5VmO032xYi\n5fhQNNvbW1rUBOsuGXowZzoAamnWGMK62PiyDBuRcWl8C1v2jTiABEqyLXvqobci\n/QaBJ384hGIxjrX8tMS/mLyMXB2cazctIvX9EDIu4Dw+mJCzxk/e6uMnTTS+KqXG\nwcgP3dLyl8j5Aec62G+cWHeNGnqrBbFFSK/k+mfvSQKBgQDSLKXqFhtki+cWoXwj\nys2EroepJJrEhlkCJpwOrmoHf1XWBiMxVD55BnGIGoYjw1UpibwklIv5W4UXJRkl\ndjDL9sW0bh5nva5k3Ea72W7dGo+g3V4e848jCEeovbcX1OIa3g4TijHItXW/dI74\nW9GeDr3pvEWzJGsIZ4ixjTKRqQKBgQC41qxxEg7kZswxDHKsQ3w+nadxGiLcTuYb\n2Wzu64ycf5ffhjvtVzCRuKEyMsBnSwbqqXKV/yYkDA6qg4xcQF5yRvwLmc+Lmm9v\nBg9u44q+38gl3R42vZ9dfec8dMWAX6ET2l65QhEZfPCwivPaAsfUQU2SMgQSGk1m\n9GXyUBFL1QKBgCrZIWYs5Z7FCvLJL1bYtLeVIWExbkAcp67RkkVH96PZqPU+QRSA\neVARKTo3Nhu6afVS+EF462SF7Qc/7/V8OAyNHddgD+DUgeZcJiuL85cuIBQKrXKf\n8xGQUZOsQdSg+QvDM5l2NhoWLJBAwhkOFxkjJkKtuIQCK7QF749LGwEpAoGAJo6p\nhCC3OI/1Elo9ZY/iUBGFB0Pjd7+BoteVMLW0LEU1giw3PghNGmjAP390wVdWRwc3\n3vBNnYFiYdF1Kx1GVmJWW3knYUDC9A74kzImFDEMSFG65sJhhxgnb2YQePn52PFZ\nhx2wAXgdoUYrHhQsaSuCKfgC/1+7O7nJtmVbZk0CgYAVA4H34acb92bm3k7f1k88\naMWqVdh/63gnSjvV4GYpYnkz1g7tavgNU81+p5lFiZdAHRO0xOp7mRQO38QUpntE\nPeqRS91uq/jPnlFoLgkOKWUzs0da5rurQ7oDJlTBB5JqwHOfhytmjmBFOt5jZSeV\nT50YiJq9lawdfL6M6+OQqw==\n-----END PRIVATE KEY-----\n",
    private_key_id: "9190854dca28436842c1a6b8a69681d77885cf5f",
    project_id: "loginsetup-afe25",
    token_uri: "https://oauth2.googleapis.com/token",
    type: "service_account",
    universe_domain: "googleapis.com"
};

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});

const fire = async (loginId) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(loginId);

        console.log("decodedToken", decodedToken);
    }
    catch (error) {
        console.error("errpr", error);
    }
};

const loginId = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYWRtaW4gc29uaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMM0hJaS1OSEhWVGo1VC0zT3VZQjRXeWg2U0lGR2l1TFllR0lUQjc0NUNoSWxienc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW5zZXR1cC1hZmUyNSIsImF1ZCI6ImxvZ2luc2V0dXAtYWZlMjUiLCJhdXRoX3RpbWUiOjE3MzM4NTIyMzksInVzZXJfaWQiOiJVTGkydU53RzN4VzNSWHJBYm1YcFdmTHhQMmUyIiwic3ViIjoiVUxpMnVOd0czeFczUlhyQWJtWHBXZkx4UDJlMiIsImlhdCI6MTczMzg1MjIzOSwiZXhwIjoxNzMzODU1ODM5LCJlbWFpbCI6InNvbmkuZm9saTEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjk1NTExNTg4OTE5NDU5NTEwOCJdLCJlbWFpbCI6WyJzb25pLmZvbGkxMjNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.d0TaSFxPzJLzLlv81zUGovDnVrpKyoFdAKWm4A2B72os6l3bDIwD4YRHYFzcFoDrPCMqxSBrxiCQeawR4yrBv_nO4dpp_FtFrGhslH9JNE8EEfys1gmrRv_ktwSoea8bY4OBY4c3fpT9AxE7UXjAxOZTYbYFYa-1PZ_YxeiYmVoPeSxsSUpVA6mXjtJAq2BWaD6gdryfevvNeXKVtVPSq6r5snkJ7M1i-ZeyL55fHnfzB6kPJSB88rdzcyDJkwzkqzUp9nE48Tj-t1PXT-Tu2tE87axnOComDfFbHuyMiGVgqrNkLPnvA49P7jM0-cSwW4gRcq8DPmNvt2seXatl6A";
// 

fire(loginId);