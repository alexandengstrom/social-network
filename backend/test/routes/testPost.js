import {
  closeDatabase,
  dropDatabase,
  startTestDatabase,
} from "../../database/db.js";
import { deletePost } from "../../database/post.js";
import { deleteUser } from "../../database/user.js";
import { startServer } from "../../server.js";
import superagent from "superagent";
import assert from "assert";

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

  describe("Post a new post", () => {
    let newPost;
    it("Should return 200 OK when the post is valid", (done) => {
      const body = {
        receiver: user,
        content: "This is a test",
      };
      superagent
        .post(`http://localhost:${port}/post`)
        .set("authorization", "Bearer " + token)
        .send(body)
        .end((err, res) => {
          newPost = res.body._id;

          assert(res.status == 200);
          done();
        });
    });

    it("Should be able to get that post", (done) => {
      superagent
        .get(`http://localhost:${port}/post/${newPost}`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          console.log(res.status);
          assert(res.status == 200);
          done();
        });
    });

    it("Should be able to like that post", (done) => {
      superagent
        .post(`http://localhost:${port}/post/${newPost}/like`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should be able to like that post again", (done) => {
      superagent
        .post(`http://localhost:${port}/post/${newPost}/like`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should not be able to like post that doesnt exist", (done) => {
      superagent
        .post(`http://localhost:${port}/post/1234/like`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should be able to unlike that post", (done) => {
      superagent
        .post(`http://localhost:${port}/post/${newPost}/unlike`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not be able to unlike that post again", (done) => {
      superagent
        .post(`http://localhost:${port}/post/${newPost}/unlike`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should not be able to unlike post that doesnt exist", (done) => {
      superagent
        .post(`http://localhost:${port}/post/1234/unlike`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should be able to comment the post", (done) => {
      const body = {
        content: "This is a comment",
      };

      superagent
        .post(`http://localhost:${port}/post/${newPost}`)
        .set("authorization", "Bearer " + token)
        .send(body)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should notbe able to comment post that doesnt exist", (done) => {
      const body = {
        content: "This is a comment",
      };

      superagent
        .post(`http://localhost:${port}/post/1234`)
        .set("authorization", "Bearer " + token)
        .send(body)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should be able to get all comments on that post", (done) => {
      superagent
        .get(`http://localhost:${port}/post/${newPost}/comments`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not be able to get comments of post that doesnt exist", (done) => {
      superagent
        .get(`http://localhost:${port}/post/1234/comments`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    it("Should be able to delete that post", (done) => {
      superagent
        .delete(`http://localhost:${port}/post/${newPost}`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 200);
          done();
        });
    });

    it("Should not be able to delete that post that doesnt exist", (done) => {
      superagent
        .delete(`http://localhost:${port}/post/1234`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });

    after((done) => {
      deletePost(newPost).then(() => done());
    });

    it("Should return 400 if the body is incorrect", (done) => {
      const body = {
        sender: user,
        receiver: user,
        content: "This is a test",
      };
      superagent
        .post(`http://localhost:${port}/post`)
        .set("authorization", "Bearer " + token)
        .send(body)
        .end((err, res) => {
          assert(res.status == 400);
          done();
        });
    });

    it("Should return 401 if the token is invalid", (done) => {
      const body = {
        receiver: user,
        content: "This is a test",
      };
      superagent
        .post(`http://localhost:${port}/post`)
        .set("authorization", "Bearer " + token + "oops")
        .send(body)
        .end((err, res) => {
          assert(res.status == 401);
          done();
        });
    });

    it("Should return 404 when requesting a post that doesnt exist", (done) => {
      superagent
        .get(`http://localhost:${port}/post/1234`)
        .set("authorization", "Bearer " + token)
        .end((err, res) => {
          assert(res.status == 404);
          done();
        });
    });
  });

  after((done) => {
    server.close();
    dropDatabase().then(() => closeDatabase().then(() => done()));
  });
});
