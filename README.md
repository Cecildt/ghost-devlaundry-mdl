# Development Laundry Material Design Lite Ghost Theme 

The Material Design Lite theme for [Ghost](http://github.com/tryghost/ghost/) used on [Development Laundry](https://devlaundry.com).

## Features

* [Moot comments](https://muut.com/)
* Syntax Highlight with [Prism](http://prismjs.com/)
* Responsive Videos with [Fitvids](http://fitvidsjs.com/)
* [Material Design Lite](http://www.getmdl.io/)
* [Material Design Icons](https://materialdesignicons.com/)
* [ReadingTime](https://github.com/michael-lynch/reading-time)
* Google Universal Analytics snippet.
* OpenGraph and Twitter Cards meta's.
* One-file CSS/JS for performance.
* Article search with Azure Search.

## Installing
Download the latest release and install it as you install all other themes.


## Gulp Tasks

* gulp dev
    * Inject development JS and CSS files in default.hbs file.
* gulp prod
    * Compress and combine JS and CSS files. Injects combined files in  default.hbs file.
* gulp inject-cdn
    * Inject CDN references.

## Production Deployment Steps
1. Run gulp prod
2. Run uncss
3. Update default.hbs with output of uncss.
4. Update assets references: 
    <link rel="stylesheet" href="{{asset "/dist/all.min.css"}}"> 
    <script src="{{asset "/dist/all.min.js"}}"></script>
5. Upload JS and CSS file to CDN.
6. Remove node_modules folder
7. Zip project folder.
8. Upload to your Ghost Blog.

## Docker Notes

Connect to container command line: docker exec -it dev-ghost /bin/bash
    Linux remove files: rm -rf *

Ghost Container Theme Path: /usr/src/ghost/content/themes/devlaundry

Copy files from localhost to container: docker cp . dev-ghost:/usr/src/ghost/content/themes/devlaundry-mdl


## Contributing

See Contributing.md

## License

MIT see LICENCE.md

