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

describe("GET /user", () => {
  it("Should return an array of all users", async (done) => {
    const { email, name, id } = firstUser;

    const res = await request(app).get("/user").expect(200);

    expect(res.body).toBeInstanceOf(Array);

    expect(res.body[0]).toStrictEqual({ email, name, role: null, id });

    done();
  });
});

describe("GET /user/:id", () => {
  it("Should return info about the user with the id that was passed", async (done) => {
    const { email, name, id } = firstUser;

    const res = await request(app).get("/user/1").expect(200);

    expect(res.body).toStrictEqual({ email, name, id, role: null });

    done();
  });

  it("Should return 400 if the id is NaN", async (done) => {
    await request(app).get("/user/string").expect(400);

    done();
  });

  it("Should return 404 if the user doesn't exist", async (done) => {
    await request(app).get("/user/35").expect(404);

    done();
  });
});
