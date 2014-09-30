micronDB
========

A Micro Client-side JSON Document Storage Database

Designed to be used with jsonHTML in which you will be able to query over all the documents on the DOM. A new version of jsonHTML will be released that will automatically detect if you have MicronDB included
in your project :D

Despite the fact that it was created for jsonHTML, that does not mean micronDB cannot be used stand-alone. Any JSON document can be stored in micronDB and queried. 
The original intention of micronDB was to produce something in which simple queries can be utilized to gain acess and analyze data within your web application. It
was apparent that the web is producing web applications which are far more complex than was even imagined possible 10 years ago, therefore there is a lack of data
manipulation on the client side. Typically in the application develpment world on windows, one could quickly throw some queries around as the database was usually
already on the LAN, but in the case of the Web, it is not always guaranteed that the database you are connecting to will be responsive. micronDB on the other hand
is guaranteed to be responsive, perfect for caching data within the client side memory.

When paired with jsonHTML, this allows the programmer to run queries and discover every element which was created on the webpage making changes in bulk. This allows
the page to be easily manipulated, changing the form and style of the entire page without too much code.

The goal with all my projects is to produce libraries and data structures which allow the programmer to more effectively practice "Rapid Development."

Queries:
```
//will get all the jsonHTML buttons
micronDB.query({
    where: {
        type: 'button',
    },
});

//will get all the jsonHTML div elements
micronDB.query({
    where: {
        type: 'div',
    },
});

//will get all the canvas text elements that contain the string 'MicronDB.'
micronDB.query({
    where: {
        text: function(input) { //The id string, contains the string 'MicronDB.'
            return input.indexOf('MicronDB') > -1;
        },
    },
});

//will get all the objects with 'Text' in its id, and text elements that are set to the color black.
micronDB.query({
    where: {
        $or: {
            id: function(input) { //The id string, contains the string 'Text.'
                return input.indexOf('Text') > -1;
            },
            fill: 'black',
        },
    },
});

//will get all the canvas text objects that are set to the color black.
micronDB.query({
    where: {
        $and: {
            id: function(input) { //The id string, contains the string 'Text.'
                return input.indexOf('Text') > -1;
            },
            fill: 'black',
        },
    },
});
```
