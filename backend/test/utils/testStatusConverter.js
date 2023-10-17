import { statusConverter } from "../../utils/statusConverter.js";
import assert from "assert";

describe("statusConverter", () => {
  it("Should return correct messages", () => {
    assert(statusConverter(400).error == "Bad Request");
    assert(statusConverter(401).error === "Unauthorized");
    assert(statusConverter(404).error === "Not Found");
    assert(statusConverter(405).error === "Method Not Allowed");
    assert(statusConverter(409).error === "Conflict");
    assert(statusConverter(500).error === "Internal Server Error");
  });
});
