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

The ls command lists all files and directories in your current directory or a provided directory. The output of the ls command can be piped (with the &#124; symbol) to the grep command to perform some searching of the results. 

So lets imagine a scenario where you have a directory full of log files. These log files are generated when an application that is running on your machine encounters errors. When the log files are generated they have a filename covention of ERROR-YYYY-MM-DD-SEQUENCE.log. Let us further imagine this application has been running for years and there are thousands of files.

If you wanted to find all the log files in a directory that match a certain signature, say for instance all the files from September of 2016 you could do this:
{% highlight bash %}
ls | grep "2016-09" 
{% endhighlight %}

This is incredibly useful for searching directories with lots of files, but the real power of grep can be seen when we use it search the contents of files.

### Grep options

Like most other Unix commands, grep can take options. There are several options but three that I always use: --recursive (search all the files in all the directories below where I say to start), --ignore-case (searching for "Unix" will match both "unix" and "UNIX"), and --line-number (display the line number of the files where matches are found). Thats a lot of characters to type so I use the short form of each: -r, -i, -n and further combine them as -rin. So every time I use grep for searching through the contents of files I instincively type "grep -rin".

Now that the options are out of the way the next parameter is the text to search for. The search pattern can use Unix regular-expressions, but lets call that an advanced feature and demonstrate something simple. If I wanted to search all the files and files in subfolders (remember the --recursive or -r option) for the string "security" then I could do this:

{% highlight bash %}
grep -rin security .
{% endhighlight %}

The final period character at the end of the command tells grep to start searching in the current working directory. I could have just as easily told it to search elsewhere using something like this:

{% highlight bash %}
grep -rin security ~/Documents
{% endhighlight %}

If the pattern you are searching for contains spaces or other special characters you can surround your search string in double quotes like this:

{% highlight bash %}
grep -rin "network security" ~/Documents
{% endhighlight %}

#### Excluding directories from grep

Finally I want to show you how to exclude directories from the recursive searching. This can be very useful if there is a lot of nested directories (for instance NodeJS developers and the node_modules folder.)

The --exclude-dir= option (there is no short-form) takes a [glob pattern][glob]
and leaves the matching directories out of the search. Therefore: 

{% highlight bash %}
grep -rin --exclude-dir=node_modules index. 
{% endhighlight %}

This would search the current directory recursively for the pattern "index", but exclude the node_modules folder. If you have multiple directories you would like to exclude you can wrap the pattern in curly braces and comma-seperate the glob patterns, making sure to not leave spaces between the patterns, for instance:

{% highlight bash %}
grep -rin --exclude-dir={node_modules,dist} index . 
{% endhighlight %}

### Conclusion

I hope you were able to learn something new by reading this. It took me a long time to feel comfortable at the command line, and feel confident that I was not going to destroy my system by issuing the wrong command. My advice is to practice these commands and other simple commands (which I will cover in another post) and grow incrementally. 

Cheers
Taylor Hutchison

[glob]: http://man7.org/linux/man-pages/man7/glob.7.html


