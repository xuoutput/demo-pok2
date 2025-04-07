import minimost from "minimost";
import Cac from "./cac.js";

function cac(opts) {
  return new Cac(opts);
}

cac.parse = (...args) => minimost(...args);

export default cac;
