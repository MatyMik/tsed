import {ServerLoader, ServerSettings} from "@tsed/common";
import * as Path from "path";
import {MyController} from "./controllers/manual/MyController";

const rootDir = Path.resolve(__dirname);

@ServerSettings({
  rootDir, // optional. By default it's equal to process.cwd()
  mount: {
    "/rest": [
      "${rootDir}/controllers/current/**/*.ts",
      MyController // support manual import
    ],
    "/rest/v0": [ // versioning
      "${rootDir}/controllers/v0/users/*.js",
      "!${rootDir}/controllers/v0/groups/old/*.ts" // Exclusion
    ]
  }
})
export class Server extends ServerLoader {
}
