const request = require("supertest");
const app = require("../../src/app");

const firstUser = require("../../src/constants/user");

describe("POST /user", () => {
  it("Should return 400 if neither email, nor password nor name were sent ", async (done) => {
    const data = {
      email: "test@testing.com",
    };

    await request(app).post("/user").send(data).expect(400);

    done();
  });

  it("Should return 422 if email is already registered", async (done) => {
    const { email, password, name } = firstUser;

    await request(app)
      .post("/user")
      .send({ email, password, name })
      .expect(422);

    done();
  });

  it("Should return 201 if the data was sent correctly", async (done) => {
    const data = {
      name: "thiago",
      email: "thiago@email.com",
      password: "strongpassword123",
    };

    await request(app).post("/user").send(data).expect(201);

    done();
  });
});
