const genTokens = require("../../src/constants/tokens");
const Auth = require("./Auth");

describe("JWT Auth", () => {
  let tokens;
  let req;
  let res;
  let next = jest.fn();
  beforeAll(async () => {
    tokens = await genTokens();
  });

  beforeEach(() => {
    req = { headers: {} };
    res = {};
    res.sendStatus = jest.fn();
  });
  it("Should call next", async () => {
    req.headers.authorization = `Bearer ${tokens.admin}`;
    await Auth(req, res, next);
    expect(next).toBeCalled();
  });

  it("Should return 401 ", async () => {
    await Auth(req, res, next);
    expect(res.sendStatus).toBeCalledWith(401);
  });

  it("Should return 403", async () => {
    req.headers.authorization = `Bearer ${tokens.normalUser}`;
    await Auth(req, res, next);
    expect(res.sendStatus).toBeCalledWith(403);
  });

  it("Should return 401 if the token is invalid", async () => {
    req.headers.authorization = "Invalid token";
    await Auth(req, res, next);
    expect(res.sendStatus).toBeCalledWith(401);
  });
});
