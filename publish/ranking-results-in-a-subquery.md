# Ranking results in a subquery using ROW_NUMBER()
#### December 16th, 2018

I was recently looking at some data that I wanted to rank. The problem was I did not want to see all the
data in the table ranked. I just wanted to see a subset of the data, but with each row ranked among the entire dataset. Let me layout an example to illustrate the situation.

Let us imagine a table that contains the average wait time for attractions at Magic Kingdom in Walt Disney
World. Our data might look like this:

<table>
    <thead>
        <tr>
            <th>Row</th>
            <th>Attraction</th>
            <th>Zone</th>
            <th>WaitTime</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Astro Orbiter</td>
            <td>Tomorrowland</td>
            <td>20</td>
        </tr>
        <tr>
            <td>2</td>
            <td>The Barnstormer</td>
            <td>Fantasyland</td>
            <td>30</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Big Thunder Mountain Railroad</td>
            <td>Frontierland</td>
            <td>40</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Country Bear Jamboree</td>
            <td>Frontierland</td>
            <td>15</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Dumbo the Flying Elephant</td>
            <td>Fantasyland</td>
            <td>20</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Enchanted Tales with Belle</td>
            <td>Fantasyland</td>
            <td>25</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Haunted Mansion</td>
            <td>Liberty Square</td>
            <td>90</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Jungle Cruise</td>
            <td>Adventureland</td>
            <td>120</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Pirate of the Caribbean</td>
            <td>Adventureland</td>
            <td>90</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Seven Dwarfs Mine Train</td>
            <td>Fantasyland</td>
            <td>110</td>
        </tr>
        <tr>
            <td>11</td>
            <td>Space Mountain</td>
            <td>Tomorrowland</td>
            <td>55</td>
        </tr>
        <tr>
            <td>12</td>
            <td>Splash Mountain</td>
            <td>Frontierland</td>
            <td>60</td>
        </tr>
    </tbody>
</table>

Now let us say we want to rank these attractions by WaitTime. We might execute this query:

<pre><code class="sql">SELECT ATTRACTION, ZONE, WAITTIME, ROWNUM
 FROM ATTRACTIONS ORDER BY WAITTIME DESC;</code></pre>

We could expect to get these results back:

<table>
    <thead>
        <tr>
            <th>Row</th>
            <th>Attraction</th>
            <th>Zone</th>
            <th>WaitTime</th>
            <th>Rownum</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Jungle Cruise</td>
            <td>Adventureland</td>
            <td>120</td>
            <td>8</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Seven Dwarfs Mine Train</td>
            <td>Fantasyland</td>
            <td>110</td>
            <td>10</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Haunted Mansion</td>
            <td>Liberty Square</td>
            <td>90</td>
            <td>7</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Pirate of the Caribbean</td>
            <td>Adventureland</td>
            <td>90</td>
            <td>9</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Splash Mountain</td>
            <td>Frontierland</td>
            <td>60</td>
            <td>12</td>
        </tr>
        <tr>
            <td>6</td>
            <td>Space Mountain</td>
            <td>Tomorrowland</td>
            <td>55</td>
            <td>11</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Big Thunder Mountain Railroad</td>
            <td>Frontierland</td>
            <td>40</td>
            <td>3</td>
        </tr>
        <tr>
            <td>8</td>
            <td>The Barnstormer</td>
            <td>Fantasyland</td>
            <td>30</td>
            <td>2</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Enchanted Tales with Belle</td>
            <td>Fantasyland</td>
            <td>25</td>
            <td>6</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Astro Orbiter</td>
            <td>Tomorrowland</td>
            <td>20</td>
            <td>1</td>
        </tr>
        <tr>
            <td>11</td>
            <td>Dumbo the Flying Elephant</td>
            <td>Fantasyland</td>
            <td>20</td>
            <td>5</td>
        </tr>
        <tr>
            <td>12</td>
            <td>Country Bear Jamboree</td>
            <td>Frontierland</td>
            <td>15</td>
            <td>4</td>
        </tr>
    </tbody>
</table>
        

Rownum represents the order that the row was selected in the query, so lets assume that each row was selected in alphabetical order.

Now instead of ranking all the attractions across the entire park lets rank just the ones in Fantasyland. So now our query is:

<pre><code class="sql">SELECT ATTRACTION, ZONE, WAITTIME, ROWNUM 
FROM ATTRACTIONS WHERE ZONE = 'Fantasyland' 
ORDER BY WAITTIME DESC;</code></pre>

We could expect to get these results back:

<table>
    <thead>
        <tr>
            <th>Row</th>
            <th>Attraction</th>
            <th>Zone</th>
            <th>WaitTime</th>
            <th>Rownum</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Seven Dwarfs Mine Train</td>
            <td>Fantasyland</td>
            <td>110</td>
            <td>10</td>
        </tr>
        <tr>
            <td>2</td>
            <td>The Barnstormer</td>
            <td>Fantasyland</td>
            <td>30</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Enchanted Tales with Belle</td>
            <td>Fantasyland</td>
            <td>25</td>
            <td>6</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Dumbo the Flying Elephant</td>
            <td>Fantasyland</td>
            <td>20</td>
            <td>5</td>
        </tr>
    </tbody>
</table>       

Great! We have the attractions in Fantasyland ranked, but we have lost the information indicated how they
rank against other rides in the other zones. This is where the window function ROW_NUMBER() comes in.
Briefly, window functions are are SQL methods that calculate a single value for each row inside the “window”
or a subset of data.

So if we try this query:

<pre><code class="sql">SELECT * FROM 
    SELECT ATTRACTION, ZONE, WAITTIME, ROW_NUMBER() 
        OVER(ORDER BY WAITTIME DESC)
        AS RANK FROM ATTRACTIONS)
WHERE ZONE = 'Fantasyland';</code></pre>

We should get:

<table>
    <thead>
        <tr>
            <th>Row</th>
            <th>Attraction</th>
            <th>Zone</th>
            <th>WaitTime</th>
            <th>RANK</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Seven Dwarfs Mine Train</td>
            <td>Fantasyland</td>
            <td>110</td>
            <td>2</td>
        </tr>
        <tr>
            <td>2</td>
            <td>The Barnstormer</td>
            <td>Fantasyland</td>
            <td>30</td>
            <td>8</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Enchanted Tales with Belle</td>
            <td>Fantasyland</td>
            <td>25</td>
            <td>9</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Dumbo the Flying Elephant</td>
            <td>Fantasyland</td>
            <td>20</td>
            <td>11</td>
        </tr>
    </tbody>
</table>        


Now we can see that the Seven Dwarfs Mine Train ride has the second highest wait time in the park. Thanks ROW_NUMBER()!

Window functions are really powerful when you are trying to do data analysis.

Check out this page <a href="https://drill.apache.org/docs/sql-window-functions-introduction/">SQL Window Functions Introduction</a> to read more about them!
