---
layout: post
title:  "Named parameters in Swift."
date:   2017-07-03 16:00:00 -0600
categories: mobile, swift
---

# Swift and function parameters

Swift (currently version 3) is a nice language that emphasizes readability and clarity over terseness. For example, Swift requires you to have curly braces around if statements, e.g. : 

{% highlight swift %}
if a > b {
    return a
}
{% endhighlight %}

whereas in C# and JavaScript you could write:

{% highlight csharp %}
if(a > b)
    return a;
{% endhighlight %}

I personally always use braces even in languages that allow you to omit them, and I appreciate that Swift enforces this rule at the language level.

Swift feels very familiar to a programmer like me with a C-style language background. However, one area of departure is the use of named function parameters, which by default must be used when invoking the function.

So if a function called "add" is defined like this...

{% highlight swift %}
func add(a: Int, b: Int) -> Int{
    return a + b
}
{% endhighlight %}

then you must invoke it like this...

{% highlight swift %}
add(a: 1, b: 2)
{% endhighlight %}

This is different from a language like C#, where the parameter names are typically omitted from the invocation, e.g.: 

{% highlight csharp %}
int Add(int a, int b){
    return a + b;
}

Add(1,2);
{% endhighlight %}

In C#, the unique signature of a method is made up by its name and the type of its parameters. In Swift the name of the parameters also defines the function signature. That means we can define two nearly identical methods that only differ by their parameter names.

{% highlight swift %}
func add(a: Int, b: Int) -> Int{
    return a + b
}
func add(x: Int, y: Int) -> Int{
    return x + y
}
{% endhighlight %}

If you don't want to use the parameter names in the invocation then you must but an underscore in front of the parameter name in the function definition: 

{% highlight swift %}
func add(_ a: Int, _ b: Int) -> Int{
    return a + b
}
{% endhighlight %}

Now you can call add like this:

{% highlight swift %}
add(1,2)
{% endhighlight %}

Overall, this is the biggest change I've had to get used to coming from different programming languages, and I haven't had enough time with the language to make a value judgement on it yet. 

If you would like to know more about this topic you can read about it on the [official Swift documentation][docs].

[docs]: https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html




