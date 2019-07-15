---
layout: post
title:  "Multiple Angular CLI Test configurations."
description: "How to setup different testing configurations to run a subset of your tests."
date:   2019-07-15 12:00:00 -0600
published: true
---

### Angular Testing

When you generate something (component, service, pipe, etc) with the Angular CLI it also creates an associated spec file for testing that file. By default the main code file is named [name you provided].[type of file].ts and the spec file is named [name your provided].[type of file].spec.ts. So if you follow the Angular naming conventions all your component test files end in ".component.spec.ts" and all your service test files end in ".service.spec.ts". This is good because we can use this pattern to run only a certain set of tests.

If you examine your [angular.json](https://angular.io/guide/workspace-config) file there will be a "test" property somewhere in the structure of your main angular project. There are two properties we are concerned with "main" which by default points to "src/test.ts" and "tsConfig" which points to "src/tsconfig.spec.json". So when we use the command "ng test" it will by default use the settings assigned to "test" in the angular.json file. We would like to override those, but first lets understand what test.ts and tsconfig.spec.json are actually doing.

The test.ts file is the file that Karma uses to setup the test environment for Angular and load all the spec files. The default looks like this:

{% highlight typescript %}
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
{% endhighlight %}


The tsconfig.spec.json file is used to by the typescript compiler to specify which files to load and compile. The default looks like this:

{% highlight json %}
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "baseUrl": "./",
    "module": "commonjs",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "files": [
    "test.ts",
    "polyfills.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
}
{% endhighlight %}

### Creating an alternative test setup for service tests.

If you wanted to run only your service tests I suggest you do the following:
1) Create a new file in the src directory called test-services.ts and paste in:

{% highlight typescript %}
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


// Then we find all the tests.
const context = require.context('./', true, /\.service\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
{% endhighlight %}

2) Create a new file in the src directory called tsconfig.services.spec.json and paste in:

{% highlight json %}
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/spec",
    "baseUrl": "./",
    "module": "commonjs",
    "types": [
      "jasmine",
      "node"
    ]
  },
  "files": [
    "test-services.ts",
    "polyfills.ts"
  ],
  "include": [
    "**/*.service.spec.ts",
    "**/*.d.ts"
  ]
}
{% endhighlight %}

Normally when you run your tests using "ng test" on the command line it will use the default test.ts and tsconfig.spec.ts files. Instead now you will pass two additional flags to the ng test command.

{% highlight bash %}
ng test --main src/test-services.ts --ts-config src/tsconfig.services.spec.json
{% endhighlight %}

### Summary

By creating seperate test-[type].ts and and tsconfig.[type].spec.ts files we can easily run the tests we would like instead of all the tests in the suite. You can also use the "exclude" property if you wanted to run all your service, pipe, etc. tests, but not your component tests.