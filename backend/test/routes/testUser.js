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

const port = 3001;
let server;

let id;
let id1Token;
let id2;
let id2Token;

describe("Test /user route", () => {
  before((done) => {
    server = startServer(port);
    startTestDatabase().then(() => done());
  });

  describe("Test posting a new user", () => {
    it("Should return the user if the user was posted correctly", (done) => {
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
            console.log(err);
            done(err);
          } else {
            id = JSON.parse(res.text)._id;
            id1Token = generateToken(id);
            assert(res.status == 200);
            assert(JSON.parse(res.text).email == "john@doe.com");
            done();
          }
        });
    });

    it("Should return another user if the user was posted correctly", (done) => {
      const body = {
        firstname: "Janet",
        lastname: "Doe",
        email: "janet@doe.com",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/user`)
        .send(body)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done(err);
          } else {
            id2 = JSON.parse(res.text)._id;
            id2Token = generateToken(id2);
            assert(res.status == 200);
            assert(JSON.parse(res.text).email == "janet@doe.com");
            done();
          }
        });
    });

    it("Should be possible to send a friend request", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id2}/add`)
        .set("authorization", "Bearer " + id1Token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should be possible to accept a friend request", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id}/add`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should be possible to get a conversation between two friends", (done) => {
      superagent
        .get(`http://localhost:${port}/user/${id}/conversation/${id2}`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not be possible to sent friend request when already friends", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id}/add`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should be possible to remove a friend", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id}/remove`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should be possible to update biography", (done) => {
      const body = {
        bio: "This is the new bio",
      };

      superagent
        .patch(`http://localhost:${port}/user/biography`)
        .set("authorization", "Bearer " + id1Token)
        .send(body)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not be possible to post invalid image", (done) => {
      const body = {
        image: "This is not a file",
      };

      superagent
        .patch(`http://localhost:${port}/user/image`)
        .set("authorization", "Bearer " + id1Token)
        .send(body)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should be possible to cancel a sent friend request", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id}/add`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 200);
          superagent
            .patch(`http://localhost:${port}/user/${id}/remove`)
            .set("authorization", "Bearer " + id2Token)
            .end((err, res) => {
              assert(res.status == 200);
              done();
            });
        });
    });

    it("Should not be possible to send request to user that doesnt exist", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/1234/add`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should not be possible to remove friendship with user that doesnt exist", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/1234/remove`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should not be possible to remove friend if not friends", (done) => {
      superagent
        .patch(`http://localhost:${port}/user/${id}/remove`)
        .set("authorization", "Bearer " + id2Token)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should return 409 if the email already is registrered", (done) => {
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
          assert(res.status == 409);
          deleteUser(id).then(() => done());
        });
    });

    it("Should return 400 if the arguments are invalid", (done) => {
      const body = {
        firstname: "John",
        lastname: "Doe",
        email: "johndoe.com",
        password: "SuperSecr3t",
      };
      superagent
        .post(`http://localhost:${port}/user`)
        .send(body)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });
  });

  describe("Get a user", () => {
    let id;
    before((done) => {
      const user = {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@doe.com",
        password: "SuperSecr3t",
      };
      createNewUser(user).then((user) => {
        id = user._id;
        done();
      });
    });

    it("Should return the user if it exists", (done) => {
      superagent
        .get(`http://localhost:${port}/user/${id.toString()}`)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not return the users password", (done) => {
      superagent
        .get(`http://localhost:${port}/user/${id.toString()}`)
        .end((err, res) => {
          assert(res.body.password == undefined);
          done();
        });
    });

    it("Should return 404 if the user doesnt exist", (done) => {
      superagent.get(`http://localhost:${port}/user/12345`).end((err, res) => {
        assert(res.status == 404);
        done();
      });
    });

    after((done) => {
      deleteUser(id).then(() => done());
    });
  });

  after((done) => {
    server.close();
    dropDatabase();
    closeDatabase().then(() => done());
  });
});
