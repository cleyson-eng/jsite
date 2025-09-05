import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from 'node:child_process';
// @deno-types="npm:@types/express"
import express from "npm:express";


function grantFolder(x:string) {
	if (fs.existsSync(x)) return;
	grantFolder(path.resolve(x, '..'));
	fs.mkdirSync(x); 
}

function copy(dst:string, src:string) {
	if (fs.statSync(src).isFile()) {
		grantFolder(path.resolve(dst, '..'));
		switch(path.extname(src)) {
		case '.map':
			return;
		case '.js':
			execSync(`esbuild ${src} --minify --outfile=${dst}`);
			return;
		default:
			fs.copyFileSync(src, dst);
		}
		return;
	}
	fs.readdirSync(src).forEach((x)=>{
		const n = path.basename(x);	
		if (n=='includes') return;
		copy(path.resolve(dst, n), path.resolve(src, n));
	});
}
copy(path.resolve('./docs'), path.resolve('./static'));
copy(path.resolve('./docs'), path.resolve('./tout'));

const app = express();

app.use("/", express.static(path.resolve('./docs')));
app.listen(8080);