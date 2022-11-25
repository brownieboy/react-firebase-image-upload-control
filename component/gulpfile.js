const {src, dest} = require("gulp");

gulp.task("copy-readme-src", function () {
  return src("./README-source.md").pipe(dest("./README.md"));
});
