import { closeDatabase, startTestDatabase } from "../../database/db.js";
import { deleteUser } from "../../database/user.js";
import { isTokenValid } from "../../utils/isTokenValid.js";
import { startServer } from "../../server.js";
import assert from "assert";
import superagent from "superagent";

const port = 3001;
let server;

describe("Test /login route", () => {
  before((done) => {
    server = startServer(port);
    startTestDatabase().then(() => done());
  });

  describe("Log in with valid credentials", () => {
    let id;
    before((done) => {
      const body = {
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/user`)
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            id = JSON.parse(res.text)._id;
            done();
          }
        });
    });

    it("Should return a json web token", (done) => {
      const body = {
        email: "john@doe.com",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/login`)
        .send(body)
        .end((err, res) => {
          const body = JSON.parse(res.text);
          assert(body.token != undefined);

          assert(isTokenValid(body.token));
          done();
        });
    });

    after((done) => {
      deleteUser(id).then(() => done());
    });
  });

  describe("Log in with invalid credentials", () => {
    it("Should return 401 when there is no user that matches the email and password", (done) => {
      const body = {
        email: "john@doe.se",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/login`)
        .send(body)
        .end((err, res) => {
          assert(res.status == 401);
          done();
        });
    });

    it("Should return 400 if password is missing", (done) => {
      const body = {
        email: "john@doe.com",
      };
      superagent
        .post(`http://localhost:${port}/login`)
        .send(body)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });
  });

  after((done) => {
    server.close();
    closeDatabase().then(() => done());
  });
});
