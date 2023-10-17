import assert from "assert";
import { closeDatabase, startTestDatabase } from "../../database/db.js";
import { createNewPost, deletePost, updatePost } from "../../database/post.js";
import { createNewUser, deleteUser } from "../../database/user.js";
import mongoose from "mongoose";

describe("database/post", () => {
  let user;
  before((done) => {
    startTestDatabase()
      .then(() => {
        const userData = {
          firstname: "John",
          lastname: "Doe",
          email: "john@doe.com",
          password: "SuperSecr3t",
        };
        createNewUser(userData).then((newUser) => {
          user = newUser._id;
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });

  describe("Post a valid post", () => {
    let newPost;
    it("Should return the post if the post is valid", (done) => {
      const post = {
        sender: user,
        receiver: user,
        content: "This is a test message",
      };
      createNewPost(post).then((post) => {
        newPost = post._id;
        assert(post.sender.toString() == user.toString());
        done();
      });
    });

    after((done) => {
      deletePost(newPost).then(() => done());
    });
  });

  describe("Post an invalid post", () => {
    it("Should not insert the post to the database", (done) => {
      const post = {
        sender: user,
        receiver: user,
        content: "",
      };
      createNewPost(post).catch((err) => {
        assert(err instanceof mongoose.Error.ValidationError);
        done();
      });
    });
  });

  let newPost;
  describe("Update a post correctly", () => {
    before((done) => {
      const post = {
        sender: user,
        receiver: user,
        content: "This is a test message",
      };
      createNewPost(post).then((post) => {
        newPost = post._id;
        done();
      });
    });

    it("Should update the post", (done) => {
      const newData = {
        content: "new content",
      };

      updatePost(newPost, newData).then((post) => {
        assert(post.content == "new content");
        done();
      });
    });

    it("Should not update the post if the update is invalid", (done) => {
      const newData = {
        content: "",
      };

      updatePost(newPost, newData).catch((err) => {
        assert(err instanceof mongoose.Error.ValidationError);
        done();
      });
    });

    after((done) => {
      deletePost(newPost).then(() => done());
    });
  });

  after((done) => {
    deleteUser(user).then(() => closeDatabase().then(() => done()));
  });
});
