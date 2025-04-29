import { bf as i, bg as o, bh as c, I as u } from "./client-B3Es0ZnZ.js";
var p = function(n, s) {
  return i(void 0, void 0, void 0, function() {
    var a, r;
    return o(this, function(e) {
      switch (e.label) {
        case 0:
          return a = c(n), s !== u.STANDARD ? [3, 2] : [4, import(
            /* webpackChunkName: "blueprint-icons-16px-paths" */
            "./index-x3KLcHRq.js"
          ).then((t) => t.I)];
        case 1:
          return r = e.sent(), [3, 4];
        case 2:
          return [4, import(
            /* webpackChunkName: "blueprint-icons-20px-paths" */
            "./index-C0ORqRI1.js"
          ).then((t) => t.I)];
        case 3:
          r = e.sent(), e.label = 4;
        case 4:
          return [2, r[a]];
      }
    });
  });
};
export {
  p as splitPathsBySizeLoader
};
