const {src, dest, task} = require("gulp");
const rename = require("gulp-rename");

task("copy-readme-src", function () {
  return src("./README-source.md")
    .pipe(rename("./README.md"))
    .pipe(dest("."));
});

task("copy-docs-src", function () {
  return src("./docs/**/*")
    .pipe(dest(".."));
});