---
layout: post
title:  "TypeScript Interfaces"
description: "What are interfaces in TypeScript and why they are usually better than classes."
date:   2019-05-05 12:00:00 -0600
published: true
---
### TypeScript Interfaces
Interfaces in TypeScript are a useful feature that I think are both underutilized and misunderstood. So in this post I will be describing what interfaces are and contrasting that with Interfaces in C# to highlight an important difference.

Looking at the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/interfaces.html), interfaces are described as giving names to the "shape" of values. This is a great description if you are computer scientist or expert in typed languages, but to the new programmer this definition is insufficient.

When the TypeScript Handbook talks about "shape" it means the properties and functions and their inferred types that are part of an object. Take for example an object defined as:
{% highlight typescript %}
const config = {
    log: true,
    user: 'example'
};
{% endhighlight %}

This object has a shape with two properties: a boolean called log and a string called user. In JavaScript we often create object literals and pass them around to functions which examines the object to see if the desired properties exist. 

One method to constrain a function so that it only takes certain types is the use of classes, which will be familiar to anyone from a OO background. You create a class with certain properties and the instantiate that class with the new keyword. There are many benefits to this approach, but not always.

If you like working with object literals in javascript, or you mostly get your data from an external API and you have no need to "new-up" objects then interfaces are a preferred means of adding type safety to your application.

Take this example:

{% highlight typescript %}

interface INamed {
    name: string;
}

function sayHello(INamed object) {
    console.log(`Hello, my name is ${object.name}`);
}

const person = {
    name: 'Taylor',
    profession: 'Software Developer'
}

const country = {
    name: 'England',
    area: 50346
}

sayHello(person);
sayHello(country); 

{% endhighlight %}

In that example an interface was used to constrain the type passed to the sayHello function. Object need only contain a name property of type string to be able to be passed in. 

**Most importantly: We didn't need to declare our person or country object literals as implementing the INamed interface. It worked simply because they had those properties and the typescript compiler was able to figure out they passed the "does it have a name property of type string" test.**

So in conclusion, always use interfaces until you absolutely need classes.
