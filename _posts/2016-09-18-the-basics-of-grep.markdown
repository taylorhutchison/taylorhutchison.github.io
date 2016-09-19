---
layout: post
title:  "Command Line Basics: grep"
description: "How to use grep for simple searching of directories and files."
date:   2016-09-18 19:00:00 -0600
published: true
---
### The Command Line
When I was first learning programming I intentionally stayed away from the command line. I could go to the command prompt when necessary, but quickly escaped back to the comfort of the GUI tools. It took me a long time to see the value of the command line, and now the CLI is an essential part of my workflow.

The hardest part of becoming comfortable with the CLI was remembering all the commands. I am a spatial thinker. It is easy for me to remember the location of buttons and menus to click. Remembering the names and options of commands took training and practice. 

The first Unix tool I remember using (beyond simple directory exploration) that was my real "ah-ha" moment was grep. I want to show a couple of examples about how it can be useful for every searching situations.

### Finding matching files
The ls command lists all files and directories in your current directory or a provided directory. The output of the ls command can be piped (with the | symbol) to the grep command to perform some searching of the results. 

So lets imagine a scenario where you have a directory full of log files. These log files are generated when an application that is running on your machine encounters errors. When the log files are generated they have a filename covention of ERROR-YYYY-MM-DD-SEQUENCE.log. Let us further imagine this application has been running for years and there are thousands of files.

If you wanted to find all the log files in a directory that match a certain signature, say for instance all the files from September of 2016 you could do this:
{% highlight bash %}
ls | grep "2016-09" 
{% endhighlight %}