import {Controller, Get, PlatformTest, Put} from "@tsed/common";
import {expect} from "chai";
import * as Sinon from "sinon";
import * as SuperTest from "supertest";
import {TestServer} from "./helpers/TestServer";

const stub = Sinon.stub();

@Controller("/routing")
export class RoutingController {
  @Get("/1")
  scenario1() {
    stub("scenario1");

    return "test1";
  }

  @Put("") // empty string has an effect on the calls orders
  scenario2() {
    stub("scenario2");

    return "shouldNotRun";
  }

  @Get("/3")
  scenario3() {
    stub("scenario3");

    return "test3";
  }
}

describe("Routing", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  before(PlatformTest.bootstrap(TestServer, {
    mount: {
      "/rest": [
        RoutingController
      ]
    }
  }));
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });
  after(PlatformTest.reset);
  afterEach(() => stub.resetHistory());

  it("should call scenario1 only", async () => {
    const {text} = await request.get("/rest/routing/1").expect(200);
    expect(text).to.equal("test1");
    expect(stub).to.have.been.calledOnceWithExactly("scenario1");
  });

  it("should call scenario2 only", async () => {
    const {text} = await request.put("/rest/routing/").expect(200);
    expect(text).to.equal("shouldNotRun");
    expect(stub).to.have.been.calledOnceWithExactly("scenario2");
  });

  it("should call scenario3 only", async () => {
    const {text} = await request.get("/rest/routing/3").expect(200);
    expect(text).to.equal("test3");
    expect(stub).to.have.been.calledOnceWithExactly("scenario3");
  });
});
