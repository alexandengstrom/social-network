import assert from "assert";
import { startTestDatabase, closeDatabase } from "../../database/db.js";
import { createNewUser, deleteUser } from "../../database/user.js";
import mongoose from "mongoose";

describe("database/user", () => {
  before((done) => {
    startTestDatabase().then(() => done());
  });

  it("Should be possible to insert a new user", (done) => {
    const data = {
      firstname: "John",
      lastname: "Doe",
      email: "john@doe.com",
      password: "SuperSecr3t",
    };

    createNewUser(data)
      .then((user) => {
        assert((user.firstname = "john"));
        assert(user.lastname == "doe");
        assert(user.email == "john@doe.com");

        const id = user._id;
        deleteUser(id).then(() => done());
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Should not insert invalid entries", (done) => {
    const data = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe.com",
      password: "SuperSecr3t",
    };

    createNewUser(data)
      .then((result) => {
        assert(!result);
        done();
      })
      .catch((err) => {
        assert(err instanceof mongoose.Error.ValidationError);
        done();
      });
  });

  after((done) => {
    closeDatabase().then(() => done());
  });
});
