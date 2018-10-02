---
layout: post
title:  "Using NPM as a task runnner"
date:   2015-06-21 17:00:00 -0600
updated: 2016-02-29 12:00:00 -0600
categories: npm
---

## Can plain NPM replace Grunt or Gulp?

A co-worker and I were discussing build systems this past week. Both of us preferred Gulp over Grunt, and neither of us had experimented with WebPack (it is on the todo list). The co-worker mentioned he had recently read about using plain NPM to do build tasks. I had never heard of that before so I did a bit of googling and apparently I've been overlooking the power <span class="callout">npm run &lt;task&gt;</span>. So I made myself a quick project try out NPM as a build system. I'll show you how I did it and share my thoughts on using NPM over Grunt/Gulp.

### But first, what good is a build system anyway?

Build systems are a collection of tasks that take your raw code and perform analysis or transformations that make the code ready for production. A build system for javascript code might include a linter, a minifier, and a test runner. The need for a build system is not immediately obvious, especially to newer programmers. In the context of front-end development, a build system might seem like overkill for small projects. But as your project grows in size and you increase the speed at which you iterate, having a solid build system will save you quite a bit of time and frustration.

## The power of npm run

I don't know too much about NPM. I have not done much NodeJS development, so NPM has just been a tool to fetch other tools for all my front-end projects. I've really been able to get away with these three commands:

- <span class="callout">npm init</span>
- <span class="callout">npm install</span>
- <span class="callout">npm update</span>

It turns out that when you <span class="callout">npm init</span> a project, part of the generated package.json file contains a scripts object. When you use the <span class="callout">npm run &lt;task&gt;</span> command the corresponding task in the scripts section is given directly to the shell environment (likely bash or powershell). Examine my example package.json file below.

{% highlight js linenos%}
{
  "name": "npmbuild",
  "version": "0.0.1",
  "description": "This is a test of NPM as a build tool.",
  "main": "index.js",
  "scripts": {
    "typescript": "tsc --out app.js --target ES5 point.ts main.ts",
    "uglify": "uglifyjs --compress --mangle --output app-min.js app.js", 
    "build" : "npm run typescript && npm run uglify"
  },
  "author": "Taylor Hutchison",
  "license": "ISC"
}
{% endhighlight %}

On line 7 I have created a typescript task. If I execute <span class="callout">npm run typescript</span> at the root of my project (where package.json lives) then <span class="callout">tsc --out app.js --target ES5 point.ts main.ts </span> will be fed to the shell as if we had typed that instead.
We can chain tasks together by using && for success-dependent chains (proceed only if previous task did not cause an error) or || for success-independent chains. On line 9 I have defined a build task, so when I execute <span class="callout">npm run build</span> the typescript task is run and if it succeeds then the minification task is executed. That's essentially the basics of using npm as a simple build system. However, there are some caveats that I'll address in the conclusion.

## Conclusion

NPM surprised me with its ability to perform the basic actions of a build system. However, I think I'll be sticking with Gulp for the near future. NPM might be good for small projects with only one or two build steps, but for projects that have many I think its better to go with a tool designed for the job.

There is also the issue that not all commands are recognized by all shell environments. I'm talking about the differences between Bash and the Command Prompt. Grunt/Gulp abstract away those differences so the build system you write using those systems will work in any environment that can run NodeJS.

Give me a shout on twitter @taylorhutchison if you have an opinion on this issue or build systems in general.