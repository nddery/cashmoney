# [cashmoney - visualizing the national hockey league](http://cashmoney.nddery.ca)

[cashmoney](http://cashmoney.nddery.ca) is a data visualization of the
National Hockey League players' statistics.

The information is presented as a radial bar graph. Clicking on a player will
allow you to visualize the player against the rest of the league.

## Thanks!

* [d3js](http://d3js.org)
* [AngularJS](http://angularjs.org/)
* [Justin Palmer - d3.tip](https://github.com/caged/d3-tip)
* [Daryl Rowland  - Angucomplete](https://github.com/darylrowland/angucomplete)
* [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/)

## Building
Build process is still incomplete. The only manual step is to copy
`dist/index-good.html` to `dist/index.html` (overwrite the existing one).
Everything else should be concatenated and minified.

```
$ grunt build
```
