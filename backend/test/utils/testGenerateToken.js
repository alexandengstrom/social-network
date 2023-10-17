import { generateToken } from "../../utils/generateToken.js";
import assert from "assert";
import jwt from "jsonwebtoken";

describe("generateToken", () => {
    it("Should create a token", (done) => {
        const token = generateToken(123);
        const secretKey = process.env.JWT_SECRET;
        try {
            const decrypted = jwt.verify(token, secretKey);
            assert(decrypted._id == 123);
            done();
        } catch (err) {
            done(err);
        }
    })
})