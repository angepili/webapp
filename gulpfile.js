var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCss        = require('gulp-clean-css'),
    useref          = require('gulp-useref'),
    browserSync     = require('browser-sync');

gulp.task('html',function(){
    gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
});

gulp.task('style',function(){
    gulp.src('./app/assets/sass/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync',function(){
    browserSync.init();
});

gulp.task('watch',['style','html'],function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./app/assets/sass/**/*.scss',['style']);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
});

gulp.task('default',['style','html']);
