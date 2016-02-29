---
layout: post
title:  "Resharper top 5 keyboard shortcuts"
date:   2015-07-12 17:00:00 -0600
updated: 2016-02-29 12:00:00 -0600
categories: visual-studio
---

## It's keyboard shortcuts all the way down

I just attended a presentation about Resharper at [CodeStock in Knoxville, TN][codestock]. The speaker, [Ondrej Balas][ondrej-balas], did a great job of showing off loads of features in Resharper that I did not know existed. In this post I'm going to pick my top 5 Resharper keyboard shortcuts. I'm going to skip the keyboard command Alt+Enter (the quickfix command) that is central to the use of Resharper. I'm using a Windows machine with Resharper Ultimate 2015.1.1, so the commands might be different on other platforms or versions of the product.

## Top 5 Resharper keyboard shortcuts

### 1. Move lines of code around

<span class="callout">Ctrl + Shift + Alt +(ArrowUp or ArrowDown)</span>

All the time I find myself needing to move a line of code up or down inside a method. I'm always cutting the line, repositioning my cursor and pasting in the desired spot. Now I can just Ctrl+Shift+Alt+ArrowUp my line to the desired spot. Easy!

### 2. Paste recent clipboard items

<span class="callout">Shift + Ctrl + V</span>

So useful if you copied something, but on your way to paste it somewhere you got distracted and copied something else. Resharper uses your recent clipboard items to save you from hunting down that line again.

### 3. Go to anything, anywhere

<span class="callout">Ctrl + T</span>

Instead of using the solution explorer window and expanding folders looking for that one file that you can remember the name (or partial name of) just use this command. It pops up a modal window that automatically has the keyboard focus. Type what your are looking for and hit enter. It is that simple.

### 4. Refactor all the tings

<span class="callout">Shift + Ctrl + R</span>

My limited understanding of Resharper is that its "bread and butter" is in its refactoring abilities. Use this command to pull up an extensive list of refactoring options.

### 5. Code Generation

<span class="callout">Alt + Insert</span>

I'm a big fan of code snippets, and chances are there is probably a snippet already written for your use case, but in case you can not remember "tryf" or "ctorp" then call up Resharper with this command. Chances are it knows what you need.

[codestock]: http://codestock.org
[ondrej-balas]: http://ondrejbalas.com/