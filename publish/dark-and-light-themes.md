<div class="postHeading">

# Using dark and light themes for your site
## 2024-07-28

</div>

Many operating systems support themes and most browsers have the ability to query for the current user preferred color scheme using a CSS media query. Here are a couple of ways to achieve this without javascript. Using this technique your site will automatically switch between styles if the user's theme changes while they are browsing.

### A media query for your link stylesheet
Use this approach if you want to load and use entire stylesheets based on the theme preference. Useful if you want to keep your dark and light themes in different files.
<pre><code class="html">&lt;link href="light.css" rel="stylesheet" media="(prefers-color-scheme: light)" /&gt;
&lt;link href="dark.css" rel="stylesheet" media="(prefers-color-scheme: dark)" /&gt;</code></pre>

### A media query inside your stylesheet
Use this approach if you want to target just a few selectors that need updating based on the theme preference.
<pre><code class="css">@media (prefers-color-scheme: dark) {
    body {
        background-color: #000;
        color: #fff;
    }
}
@media (prefers-color-scheme: light) {
    body {
        background-color: #fff;
        color: #000;
    }
}</code></pre>