---
layout: post
title:  "Creating complex objects with Dapper"
description: "How to build nested objects from complex queries with joins using Dapper ORM."
date:   2016-03-23 17:00:00 -0600
published: true
---
### Intro

Dapper for .NET is a great tool if you want something between pure ADO.NET and a large ORM like Entity Framework or NHibernate. If you still need the control that hand-writing your SQL queries provides, but want a cleaner way of populating your objects with the records then I suggest you check out a micro-ORM like Dapper.

Dapper is very straight-forward when you want to fill up an object or list of objects where the class is composed of simple types (int, string, etc.), but becomes a bit more complex when classes are composed of object hierarchies (i.e. a Person class has an Address class property). So in this post I'm going to discus the basics of how you could approach this problem.

### Setup

Lets say your data looked like this:

#### People Table

| Id | FirstName | LastName | AddressId |
|----|-----------|----------|-----------|
| 1  | Amber     | Johnson  | 77        |
| 2  | Bill      | Smith    | 56        |
| 3  | Chris     | Davidson | 34        |


#### Addresses Table

| Id | StreetNumber | StreetName | City      | State |
|----|--------------|------------|-----------|-------|
| 34 | 1234         | College St | Lansing   | MI    |
| 56 | 5555         | Nice Ave   | Nashville | TN    |
| 77 | 9876         | Winding Way| Boulder   | CO    |


And our class definitions look like this:

#### Person Class

{% highlight csharp %}
public class Person {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Address Address{ get; set; }
}
{% endhighlight %}

#### Address Class

{% highlight csharp %}
public class Address {
    public int Id { get; set; }
    public string StreetNumber { get; set; }
    public string StreetName { get; set; }
    public string City { get; set; }
    public string State { get; set; }
}
{% endhighlight %}

### Basic Queries

We could create a List of type Person using the Dapper Query extension method. That would look like this: 

{% highlight csharp %}
    db.Query<Person>("SELECT * FROM People").ToList();
{% endhighlight %}

That code assumes you have an object called db that is an instance of something implementing IDbConnection (e.g. SqlConnection in the System.Data.SqlClient namespace.) Similarily if we wanted to create a List of type Address we could write this:

{% highlight csharp %}
    db.Query<Address>("SELECT * FROM ADDRESSES").ToList();
{% endhighlight %}

### Complex Queries

The queries above show just how simple it can be to use Dapper on flat objects. However, what if you wanted to have the Address property on a Person instance be populated with data as a result of a JOIN. It's possible to fill up a List of Persons and a List of Addresses and then find matches using LINQ, but why not let do it all in a single query and let Dapper handle the details.

So lets say our query was this:
{% highlight sql %}
   SELECT 
    P.Id, P.FirstName, P.LastName, 
    A.Id AS AddressId, A.StreetNumber, A.StreetName, A.City, A.State 
    FROM People P INNER JOIN Addresses A ON A.AddressId = P.AddressId;
{% endhighlight %}

We would expect our results table to look like this:

| Id | FirstName | LastName | StreetNumber | AddressId | StreetName  | City      | State |
|----|-----------|----------|--------------|-----------|-------------|-----------|-------|
| 1  | Amber     | Johnson  | 1234         | 77        | Winding Way | Boulder   | CO    |
| 2  | Bill      | Smith    | 5555         | 56        | Nice Ave    | Nashville | TN    |
| 3  | Chris     | Davidson | 9876         | 34        | College St  | Lansing   | MI    |

We could create a List of type Person with the Address property filled with the results like this: 

{% highlight csharp linenos%}
var sql = "SELECT P.Id, P.FirstName, P.LastName, " +
    "A.Id AS AddressId, A.StreetNumber, A.StreetName, A.City, A.State " +
    "FROM People P INNER JOIN Addresses A ON A.AddressId = P.AddressId; ";

db.Query<Person, Address, Person>(
sql, 
(person, address) => {
    person.Address = address;
    return person;
},
splitOn: "AddressId"
).ToList();
   
{% endhighlight %}

Three important things to point out in the code above: 

1) The Query generic parameter is not taking a single type but rather a Func<>. So a Func<Person, Address, Person> will take a Person and an Address object as parameters and return a object of type Person.

2) The magic is happening down in the lambda where we just have to tell the new address object (created by Dapper) where to go. In this case its a property on the newly instantiated person object (also created by Dapper).

3) In order to make this happen we have to use the "splitOn" parameter in the Query function. splitOn tells Dapper which column in the records represents the start of the second object. Since AddressId is the first column that is part of the Address object and not the Person object, thats where we want to "split on". 

### Conclusion 
Dapper makes it incredibly easy to go from the relational world to the object-oriented world while still maintaining the power and flexibility that hand-rolling your queries affords. 

Creating object hierarchies from simple queries is only a little more difficult than creating a single object. You only need to provide Dapper some clues about where things go and let it handle the rest.