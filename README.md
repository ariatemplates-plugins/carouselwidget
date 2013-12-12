# Carousel widget plugin for Aria Templates #

This **plugin** is a sample which shows how to write plugins for [Aria Templates](http://ariatemplates.com/ "Aria Templates").
Following this structure is highly recommended in order to ease plugins adoption.

## Documentation ##

Check the sample code for a quick start.

The widget parameters are:
- `width` (number, mandatory) width of the carousel
- `height` (number, mandatory) height of the carousel
- `titleheight` (number) height of the captions on each image
- `images` (array, mandatory) array of images (URL `"http://www.example.com"`) or image definitions (URL + caption `{src : "http://www.example.com", title : "example"}`)
- `loop` (string, bindable) type of loop (see below)
- `index` (number, bindable) index of the image to be displayed first
- `cssClass` (string) CSS class or space-separated list of CSS classes to apply to the carousel container
- `transitionCSS` (string) part of the CSS declaration defining the duration and timing of the transition (e.g. `"1s ease-in-out"`)

The different types of loop are:
- `continuous` (default) seamless loop
- `stop` no animation
- `rewind` scrolls back to first / last image
- `reverse` changes direction when the first / last image is reached

## Disclaimer ##

The widget only works with IE9+ because it's using Array.map() and I'm too lazy to rewrite it.

## Usage ##

To use it, there is a set a scripts that are available after the usual *npm install*:
 - *npm run-script lint* : runs JShint, verifies lowercaseand checks files indentation
 - *npm run-script build* : packages the plugin only with [atpackager](https://github.com/ariatemplates/atpackager "atpackager") and put the results in build/output folder
 - *npm run-script test* : run all unit tests in PhantomJS with [attester](http://attester.ariatemplates.com "attester")
 - *npm run-script start* : starts [attester](http://attester.ariatemplates.com "attester") and waits for real browsers to connect
 - *npm run-script sample* : starts a webserver to run the samples (at <http://localhost:8080/> or <http://localhost:8080/index.html?devMode=true> )

## Structure ##

Here is the description of the different elements of the package:

|               | Description                                         |
| ------------- |-----------------------------------------------------|
|[build]	 	|Scripts and configuration files to package the plugin|
|Gruntfile.js	|One build scripts|
|package.json	|Meta-data
|README.md	 	|Documentation|
|[sample]	 	|Code of the sample|
|server.js 		|Script to launch the sample webserver|
|[src]			|Source code|
|[test]	 		|Test suites and test configuration|
