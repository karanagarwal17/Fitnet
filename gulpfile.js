let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');
let exec = require('child_process').exec;
let gulp = require('gulp');
let notify = require('gulp-notify');
let sass = require('gulp-sass');
let spawn = require('child_process').spawn;

let node;

let serverSources = [
  'config/*',
  'controllers/*',
  'models/*',
  'routes/*',
  'services/*',
  'index.js'
];

let cssSources = [
  'public/dynamic/css/modules/*.css',
  'public/static/css/modules/*.css',
  'public/dynamic/css/bulma.sass'
];

function runCommand(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if(err !== null) {
      console.log('exec error: ' + err);
    }
});
}

gulp.task('unify-css-static', function () {
  return gulp.src('public/css/modules/*')
     .pipe(cleanCSS())
     .pipe(concat('full.css'))
     .pipe(gulp.dest('public/css/'));
});

gulp.task('compile-css',['unify-css-static']);

gulp.task('watch', function(){
  gulp.watch(serverSources,['start']);
  gulp.watch(cssSources,['compile-css']);
});

gulp.task('start', function() {
  if (node) node.kill();
  node = spawn('node', ['index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default',['start', 'compile-css', 'watch']);

process.on('exit', function() {
    if (node) node.kill();
});
