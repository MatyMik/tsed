import {PlatformTest} from "@tsed/common/src";
import {PlatformTest} from "@tsed/common";
import {expect} from "chai";
import * as SuperTest from "supertest";
import {Server} from "../../../src/Server";
import {ExpressApplication} from "@tsed/common";

describe("Session", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  after(PlatformTest.reset);
  before(PlatformTest.bootstrap(Server));
  before(() => {
    request = SuperTest.agent(PlatformTest.callback());
  });
  after(PlatformTest.reset);

  describe("Login / Logout", () => {
    it("should create session return hello world and connect a fake user", async () => {
      // WHEN
      const response1 = await request.get("/rest/whoami").expect(200);

      await request.post("/rest/login").send({name: "UserName"}).expect(204);

      const response2 = await request.get("/rest/whoami").expect(200);

      await request.post("/rest/logout").expect(204);

      const response3 = await request.get("/rest/whoami").expect(200);

      // THEN
      expect(response1.text).to.eq("Hello world");
      expect(response2.text).to.eq("Hello user UserName");
      expect(response3.text).to.eq("Hello world");
    });
  });
});
