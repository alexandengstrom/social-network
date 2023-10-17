import {
  closeDatabase,
  dropDatabase,
  startTestDatabase,
} from "../../database/db.js";
import { createNewUser, deleteUser } from "../../database/user.js";
import { startServer } from "../../server.js";
import assert from "assert";
import superagent from "superagent";
import { generateToken } from "../../utils/generateToken.js";

let user;
let token;
let server;
let port = 3002;

describe("test explore route", () => {
  before((done) => {
    server = startServer(port);
    startTestDatabase().then(() => {
      const body = {
        firstname: "John",
        lastname: "Doe",
        email: "john2@doe.com",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/user`)
        .send(body)
        .end((err, res) => {
          const b = JSON.parse(res.text);
          user = b._id;
          const body = {
            email: "john2@doe.com",
            password: "SuperSecr3t",
          };
          superagent
            .post(`http://localhost:${port}/login`)
            .send(body)
            .end((err, res) => {
              const b = JSON.parse(res.text);
              token = b.token;
              done();
            });
        });
    });
  });

  it("Should be possible to search for users", (done) => {
    const body = {
      query: "john",
    };

    superagent
      .post(`http://localhost:${port}/explore`)
      .set("authorization", "Bearer " + token)
      .send(body)
      .end((err, res) => {
        console.log(res.status);
        assert(res.status == 200);
        done();
      });
  });

  after((done) => {
    server.close();
    dropDatabase().then(() => closeDatabase().then(() => done()));
  });
});
