import {applyDecorators, StoreSet} from "@tsed/core";
import {AcceptMimesMiddleware} from "../../middlewares/AcceptMimesMiddleware";
import {UseBefore} from "./useBefore";

/**
 * Set a mime list which are acceptable and compare it with request Content-Type.
 *
 * ```typescript
 *  @Controller('/mypath')
 *  export class MyCtrl {
 *
 *    @Get('/')
 *    @AcceptMime('application/json')
 *    public getResource(){}
 *  }
 * ```
 *
 * @param mimes
 * @decorator
 * @operation
 * @response
 */
export function AcceptMime(...mimes: string[]): Function {
  return applyDecorators(StoreSet(AcceptMimesMiddleware, mimes), UseBefore(AcceptMimesMiddleware));
}
