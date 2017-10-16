/**
 * Created by mkahn on 9/25/17.
 */

/**
 * Created by mkahn on 4/22/17.
 */

const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const concatcss = require( 'gulp-concat-css' );
const concat = require( 'gulp-concat' );

const sourcemaps = require( 'gulp-sourcemaps' );
//const watch = require( 'gulp-watch' );


gulp.task( 'sass', function () {
    // reads app/assets/css/appstyle.scss and creates appstyle.css
    return gulp
        .src( './app/**/*.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './app' ) );
} );

gulp.task( 'css', function () {

    //Add all CSS to this concatenator like booty, etc.
    return gulp.src( [
        'app/assets/css/appstyle.css' ] )
        .pipe( sourcemaps.init() )
        .pipe( concatcss( 'style.css' ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './' ) );

} )

gulp.task( 'vendor', function () {
    return gulp.src( [
        //'vendor/babylon/babylon.custom.js',
        'node_modules/lodash/lodash.min.js'
         ] )
        .pipe( concat( 'vendor.js' ) )
        .pipe( gulp.dest( './' ) );
} );


gulp.task( 'appjs', function () {
    return gulp.src( [ 'app/**/*.js' ] )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'app.js' ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( './' ) );
} );


gulp.task( 'default', [ 'appjs', 'vendor', 'sass' ], function () {
    gulp.watch( [ 'app/**/*.js' ], [ 'appjs' ] );
    gulp.watch( [ './**/*.scss' ], [ 'sass' ] );
    gulp.watch( [ 'app/assets/css/appstyle.css' ], [ 'css' ] );
} );