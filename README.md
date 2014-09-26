micronDB
========

A Micro Client-side JSON Document Storage Database

Designed to be used with jsonHTML in which you will be able to query over all the documents on the DOM. A new version of jsonHTML will be released that will automatically detect if you have MicronDB included
in your project :D

Queries:
```
micronDB.query({
    where: {
        type: 'button',
    },
});

micronDB.query({
    where: {
        type: 'div',
    },
});

micronDB.query({
    where: {
        text: function(input) {
            return input.indexOf('MicronDB') > -1;
        },
    },
});
```
