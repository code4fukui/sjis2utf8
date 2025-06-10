import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { SJIS } from "https://js.sabae.cc/SJIS.js";

const exts = [
  ".txt", ".md",
  ".c", ".h",
  ".cpp", ".hpp",
  ".py", ".js",
];

const fns = await dir2array("./");
for (const fn of fns) {
  const ext = fn.substring(fn.lastIndexOf(".")).toLowerCase();
  if (exts.indexOf(ext) == -1) continue;
  console.log(fn);
  const bin = await Deno.readFile(fn);
  if (SJIS.isSJIS(bin)) {
    const txt = SJIS.decode(bin);
    await Deno.writeTextFile(fn, txt);
  }
}
