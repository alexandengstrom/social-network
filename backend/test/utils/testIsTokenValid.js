import { generateToken } from "../../utils/generateToken.js";
import { isTokenValid } from "../../utils/isTokenValid.js";
import assert from "assert";
import jwt from "jsonwebtoken";

describe("isTokenValid", () => {
    it("Should return true if the token is valid", () => {
        const token = generateToken(123);
        assert(isTokenValid(token));
    })

    it("Should return false if the token is not valid", () => {
        assert(!isTokenValid("this is not valid"));
    })
})