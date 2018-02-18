# @tsed/multipartfiles

A package of Ts.ED framework. See website: https://romakita.github.io/ts-express-decorators/

## Installation

Before using the `@MultipartFile()` you must install [multer](https://github.com/expressjs/multer) module on your project:

```bash
npm install --save multer @types/multer @tsed/multipartfiles
```

Then import `@tsed/multipartfiles` in your [ServerLoader](api/common/server/serverloader.md):

```typescript
import {ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/ajv"; // import ajv ts.ed module
import Path = require("path");
const rootDir = Path.resolve(__dirname);

@ServerSettings({
   rootDir: __dirname,
   uploadDir: `${rootDir}/custom-dir`,                                    
   multer: {
      // see multer options
   }
})
export class Server extends ServerLoader {

}
```

> By default the directory used is `${projetRoot}/uploads`. You can configure another directory on your `ServerLoader` settings.


## Options

- `dest` (`string`): The destination directory for the uploaded files.
- `storage` (`StoreEngine): The storage engine to use for uploaded files.
- `limits` (`Object`): An object specifying the size limits of the following optional properties. This object is passed to busboy directly, and the details of properties can be found on [https://github.com/mscdex/busboy#busboy-methods]([https://github.com/mscdex/busboy#busboy-methods).
  - `fieldNameSize` (`number`): Max field name size (Default: 100 bytes).
  - `fieldSize` (`number`): Max field value size (Default: 1MB).
  - `fields` (`number`): Max number of non- file fields (Default: Infinity).
  - `fileSize` (`number`): For multipart forms, the max file size (in bytes)(Default: Infinity).
  - `files` (`number`): For multipart forms, the max number of file fields (Default: Infinity).
  - `parts` (`number`): For multipart forms, the max number of parts (fields + files)(Default: Infinity).
  - `headerPairs` (`number`): For multipart forms, the max number of header `key => value` pairs to parse Default: 2000(same as node's http).
  - `preservePath` (`boolean`): Keep the full path of files instead of just the base name (Default: false).


## Example 

Ts.ED use multer to handler file uploads. Single file can be injected like this:

```typescript
import {Controller, Post} from "@tsed/common";
import {Multer} from "@types/multer";

type MulterFile = Express.Multer.File;

@Controller('/')
class MyCtrl {
    
  @Post('/file')
  private uploadFile(@MultipartFile() file: MulterFile) {

  }
     
  @Post('/file')
  private uploadFile(@MultipartFile({dest: "/other-dir"}) file: MulterFile) {
         
  }
}
```

For multiple files, just add Array type annotation like this:
```typescript
import {Controller, Post} from "@tsed/common";
import {Multer} from "multer";
import {MultipartFile} from "@tsed/multipartfile";

type MulterFile = Express.Multer.File;

@Controller('/')
class MyCtrl {
  @Post('/files')
  private uploadFile(@MultipartFile() files: MulterFile[]) {

  }
}
```