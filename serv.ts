/*import { Application, Router } from "https://deno.land/x/oak@v17.0.0/mod.ts";
import * as path from "https://deno.land/std@0.123.0/path/mod.ts";
import {existsSync} from "https://deno.land/std/fs/mod.ts";

const app = new Application();

const static_root = Deno.cwd()
const roots = [
  static_root+'/tout',
  static_root+'/static'
]

// First we try to serve static files from the site/ folder. If that fails, we
// fall through to the router below.
app.use(async (ctx, next) => {
  try {
    for (let i = 0; i < roots.length; i++) {
      const p1 = roots[i]+ctx.request.url.pathname;
      let p2 = roots[i]+ctx.request.url.pathname;
      if (!p2.endsWith('/'))p2+='/';
      p2+='index.html';

      if (existsSync(path.resolve(p1)) || existsSync(p2)) {
        await ctx.send({
          root: roots[i],
          index: "index.html",
        });
        return
      }
    }
    next();
  } catch (e) {
    next();
  }
});

const router = new Router();

// The /api/time endpoint returns the current time in ISO format.
router.get("/api/time", (ctx) => {
  ctx.response.body = { time: new Date().toISOString() };
});

// After creating the router, we can add it to the app.
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 80 });
console.log("localhost(:80)")*/

import * as fs from "node:fs";
import * as path from "node:path";
import * as pro from "node:path";
import { execSync } from 'node:child_process';
// @deno-types="npm:@types/express"
import express from "npm:express";
import https from 'node:https';


const app = express();


app.use("/", express.static(path.resolve('./tout')));
app.use("/", express.static(path.resolve('./static')));

var privateKey = fs.readFileSync( 'cert.key');
var certificate = fs.readFileSync( 'cert.crt' );
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(443);
app.listen(80);