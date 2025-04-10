/// <reference path="../declarations.d.ts" />
import minimost from "minimost";
import Cac, { ICacOptions } from "./cac.js";
import { Opts } from "minimist";

function cac(opts: ICacOptions) {
  return new Cac(opts);
}

namespace cac {
  export function parse(args: string[], opts: Opts) {
    return (minimost as any)(args, opts);
  }
}

export default cac;
