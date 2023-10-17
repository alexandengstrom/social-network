import { isValidId } from "../../utils/isValidId.js";
import assert from "assert";

describe("isValidId", () => {
    it("Should return true if the ID is valid", () => {
        assert(isValidId("6505f16c4c636b248cf2258f"));
    })

    it("Should return false if the ID is not valid", () => {
        assert(!isValidId("123456789"));
    })
})