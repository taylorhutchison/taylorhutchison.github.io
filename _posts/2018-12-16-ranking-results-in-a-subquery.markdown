---
layout: post
title:  "Ranking results in a subquery"
description: "Using the ROW_NUMBER() window function to add a rank column."
date:   2018-12-16 12:00:00 -0600
published: true
---

I was recently looking at some data that I wanted to rank. The problem was I did not want to see all the data in the table ranked. I just wanted to see a subset of the data, but with each row ranked among the entire dataset. Let me layout an example to illustrate the situation.

Let us imagine a table that contains the average wait time for attractions at Magic Kingdom in Walt Disney World. Our data might look like this:

| Row | Attraction                    | Zone           | WaitTime |
|-----|-------------------------------|----------------|----------|
| 1   | Astro Orbiter                 | Tomorrowland   | 20       |
| 2   | The Barnstormer               | Fantasyland    | 30       |
| 3   | Big Thunder Mountain Railroad | Frontierland   | 40       |
| 4   | Country Bear Jamboree         | Frontierland   | 15       |
| 5   | Dumbo the Flying Elephant     | Fantasyland    | 20       |
| 6   | Enchanted Tales with Belle    | Fantasyland    | 25       |
| 7   | Haunted Mansion               | Liberty Square | 90       |
| 8   | Jungle Cruise                 | Adventureland  | 120      |
| 9   | Pirate of the Caribbean       | Adventureland  | 90       |
| 10  | Seven Dwarfs Mine Train       | Fantasyland    | 110      |
| 11  | Space Mountain                | Tomorrowland   | 55       |
| 12  | Splash Mountain               | Frontierland   | 60       |

Now let us say we want to rank these attractions by WaitTime. We might execute this query:

{% highlight sql %}
SELECT ATTRACTION, ZONE, WAITTIME, ROWNUM FROM ATTRACTIONS ORDER BY WAITTIME DESC;
{% endhighlight %}

We could expect to get these results back:

| Row | Attraction                    | Zone           | WaitTime | Rownum |
|-----|-------------------------------|----------------|----------|--------|
| 1   | Jungle Cruise                 | Adventureland  | 120      | 8      |
| 2   | Seven Dwarfs Mine Train       | Fantasyland    | 110      | 10     |
| 3   | Haunted Mansion               | Liberty Square | 90       | 7      |
| 4   | Pirate of the Caribbean       | Adventureland  | 90       | 9      |
| 5   | Splash Mountain               | Frontierland   | 60       | 12     |
| 6   | Space Mountain                | Tomorrowland   | 55       | 11     |
| 7   | Big Thunder Mountain Railroad | Frontierland   | 40       | 3      |
| 8   | The Barnstormer               | Fantasyland    | 30       | 2      |
| 9   | Enchanted Tales with Belle    | Fantasyland    | 25       | 6      |
| 10  | Astro Orbiter                 | Tomorrowland   | 20       | 1      |
| 11  | Dumbo the Flying Elephant     | Fantasyland    | 20       | 5      |
| 12  | Country Bear Jamboree         | Frontierland   | 15       | 4      |

Rownum represents the order that the row was selected in the query, so lets assume that each row was selected in alphabetical order.

Now instead of ranking all the attractions across the entire park lets rank just the ones in Fantasyland. So now our query is:

{% highlight sql %}
SELECT ATTRACTION, ZONE, WAITTIME, ROWNUM FROM ATTRACTIONS WHERE ZONE = 'Fantasyland' 
ORDER BY WAITTIME DESC;
{% endhighlight %}


We could expect to get these results back:

| Row | Attraction                    | Zone           | WaitTime | Rownum |
|-----|-------------------------------|----------------|----------|--------|
| 1   | Seven Dwarfs Mine Train       | Fantasyland    | 110      | 10     |
| 2   | The Barnstormer               | Fantasyland    | 30       | 2      |
| 3   | Enchanted Tales with Belle    | Fantasyland    | 25       | 6      |
| 4   | Dumbo the Flying Elephant     | Fantasyland    | 20       | 5      |


Great! We have the attractions in Fantasyland ranked, but we have lost the information indicated how they rank against other rides in the other zones.
This is where the window function ROW_NUMBER() comes in. Briefly, window functions are are SQL methods that calculate a single value for each row inside the "window" or a subset of data. 

So if we try this query: 

{% highlight sql %}
SELECT * FROM 
    (SELECT ATTRACTION, ZONE, WAITTIME, ROW_NUMBER() OVER(ORDER BY WAITTIME DESC) AS RANK FROM ATTRACTIONS)
WHERE ZONE = 'Fantasyland';
{% endhighlight %}

We should get:

| Row | Attraction                    | Zone           | WaitTime | RANK   |
|-----|-------------------------------|----------------|----------|--------|
| 1   | Seven Dwarfs Mine Train       | Fantasyland    | 110      | 2      |
| 2   | The Barnstormer               | Fantasyland    | 30       | 8      |
| 3   | Enchanted Tales with Belle    | Fantasyland    | 25       | 9      |
| 4   | Dumbo the Flying Elephant     | Fantasyland    | 20       | 11     |

Now we can see that the Seven Dwarfs Mine Train ride has the second highest wait time in the park. Thanks ROW_NUMBER()!

Window functions are really powerful when you are trying to do data analysis. 

Check out this page [SQL Window Functions Introduction](https://drill.apache.org/docs/sql-window-functions-introduction/) to read more about them!