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

const loginId = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjYzNmY2I2NDAzMjc2MGVlYjljMjZmNzdkNDA3YTY5NGM1MmIwZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU29teWEgU2Fob28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnRFNTBsMHNyVmxRbXNCLWNRT0twcHhCR0dCVlpEa1VNV2hSQnZjTFJxOUVIeUVtUHU9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW5zZXR1cC1hZmUyNSIsImF1ZCI6ImxvZ2luc2V0dXAtYWZlMjUiLCJhdXRoX3RpbWUiOjE3Mjc2MDY2NDksInVzZXJfaWQiOiJsdnhyU2ZPc3YyZFZKUktNNWNNNXFyaFBSNmcyIiwic3ViIjoibHZ4clNmT3N2MmRWSlJLTTVjTTVxcmhQUjZnMiIsImlhdCI6MTcyNzYwNjY0OSwiZXhwIjoxNzI3NjEwMjQ5LCJlbWFpbCI6InNvbXlhc2Fob282OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjUyNzEzODM5ODgxNDc4NTU2OCJdLCJlbWFpbCI6WyJzb215YXNhaG9vNjhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.IVXWEvY-9AI2ic7Jn_TEJs5lhVGeH0V236UKTYcgnZuqvA09skRIqhJWVvEM_E8QyvUePLpMJdsFNW1HeDhEB6PKv6m43LoXIqaHSdrNKuWOnXS0XBzm_nGH_2uY0nJo14Tq12Zb2OFc-iJ4BmWcoOWOEFPAJ0YvSKopDg1Pyep-wOd8NubzuDnpOkwie8yPv1H1Z1AaMUy4SA6p3itvU3pkNuYel_sbF2iaGLnxJSqVP25c777rFrwV66S67fQu1pj2w8pttNeqigvPiNY3mhWWyBglxDACrgRYw3rblkacVfJMC8HuYAYd6fXG81r5wCLL-aVa-E81fKnSLYmPmg";

fire(loginId);