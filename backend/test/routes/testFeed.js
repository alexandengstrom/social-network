import {
  closeDatabase,
  dropDatabase,
  startTestDatabase,
} from "../../database/db.js";
import { startServer } from "../../server.js";
import assert from "assert";
import superagent from "superagent";

let user;
let token;
let server;
let port = 3002;

describe("test /post route", () => {
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

  it("Should be able to get the global feed", (done) => {
    superagent
      .get(`http://localhost:${port}/feed/1`)
      .set("authorization", "Bearer " + token)
      .end((err, res) => {
        assert(res.status == 200);
        done();
      });
  });

  it("Should be able to get the profile feed", (done) => {
    superagent
      .get(`http://localhost:${port}/feed/${user}/1`)
      .set("authorization", "Bearer " + token)
      .end((err, res) => {
        console.log(res.status);
        assert(res.status == 200);
        done();
      });
  });

  it("Should not be able to get the profile feed of user that doesnt exist", (done) => {
    superagent
      .get(`http://localhost:${port}/feed/1234/1`)
      .set("authorization", "Bearer " + token)
      .end((err, res) => {
        console.log(res.status);
        assert(res.status == 404);
        done();
      });
  });

  after((done) => {
    server.close();
    dropDatabase().then(() => closeDatabase().then(() => done()));
  });
});
