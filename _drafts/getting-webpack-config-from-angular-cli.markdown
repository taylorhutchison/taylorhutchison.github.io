---
layout: post
title:  "How to eject webpack config from an Angular CLI project"
date:   2017-04-22 17:00:00 -0600
categories: angular, webpack
---

# How to eject webpack config from an Angular CLI project

<iframe width="560" height="315" src="https://www.youtube.com/embed/-v0vD_IB6iE" frameborder="0" allowfullscreen></iframe>

If you need to get the webpack configuration (webpack.config.js) from a project that was created using the Angular-CLI then you can use the "ng eject" command. This will generate the webpack.config.js file in the project root.

Once you do this you will not be able to use "ng build" again until you go into your .angular-cli.json file and remove the ejected property from the project.

Watch my screencast to see me demonstrate this.

