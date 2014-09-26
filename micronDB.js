
var micronDB = {
    arrdb: {
        db: [],
        calcIndex: function(data) { //takes a string
            var total = 0;
            for(var i = 0; i < data.length; ++i) {
                total += data.charCodeAt(i);
            }
            return total % 50; //max hash table size.
        },
        exists: function(data) { //takes a string object.
            var indx = this.calcIndex(data);
            if(this.db[indx]) {
                for(var i = 0; i < this.db[indx].length; ++i) {
                    if(this.db[indx][i].id == data) {
                        return true; //success
                    }
                }
                return false; //none matched
            } else {
                return false; //contains nothing.
            }
        },
        hash: function(data) {
            if(!(this.exists(data))) {
                var indx = this.calcIndex(data.id);
                if(this.db[indx]) {
                    this.db[indx][this.db[indx].length] = data;
                    return true; //success
                } else {
                    this.db[indx] = [];
                    this.db[indx][this.db[indx].length] = data;
                    return true; //success
                }
            } else {
                return false; //already exists
            }
        },
        get: function(key) { //key is the id of the object.
            var indx = this.calcIndex(key);
            if(this.db[indx]) {
                for(var i = 0; i < this.db[indx].length; ++i) {
                    if(this.db[indx][i].id == key) {
                        return this.db[indx][i]; //found the object.
                    }
                }
                return undefined; //object does not exist in this hash array.
            } else {
                return undefined; //object does not even exist.
            }
        },
    },
    match: {
        where: function(key, obj) { //where the key and object have matching values.
            for(var prop in obj) {
                if(typeof key[prop] != 'undefined') { //make sure that it is something first.
                    if(typeof key[prop] == 'function') { //if my key value is a function, execute it.
                        if(key[prop](obj[prop]) === true) { //makes sure that it is a real function.
                            return obj;
                        }
                    } else if(obj[prop] == key[prop]) { //if not, just see if the keys match.
                        return obj;
                    }
                }
            }
            return false;
        },
    },
    traverse: function(key, matchFunc, db) {
        var find = function(searchKey, source) {
            var found = [];
            for(var i = 0; i < source.length; ++i) {
                if(Array.isArray(source[i])) { //if it's an array, traverse that array too.
                    var tmp = find(searchKey, source[i]);
                    if(tmp.length > 0) { 
                        if(Array.isArray(tmp) && tmp.length < 2) { //if the array only has a single item.
                            found[found.length] = tmp[0];
                        } else {
                            found[found.length] = tmp;
                        }
                    }
                } else if(matchFunc(searchKey, source[i])) {
                    found[found.length] = matchFunc(searchKey, source[i]);
                }
            }
            return found;
        };
        var result = [];
        for(var property in key) {
            var tmp = {};
            tmp[property] = key[property];
            if(typeof key[property] != 'undefined' && typeof property != 'number') {
                if(result.length === 0) {
                    result = find(tmp, db);
                    console.log('result', result);
                } else {
                    result = find(tmp, result);
                    console.log('result', result);
                }
            }
        }
        return result;
    },
    insert: function(obj) {
        micronDB.arrdb.hash(obj);
    },
    query: function(query) {
        var current;
        for(var queryType in query) {
            if(typeof micronDB.match[queryType] != 'undefined') { //if the query command exists.
                if(undefined === current) {
                    current = micronDB.traverse(query[queryType], micronDB.match[queryType], micronDB.arrdb.db); //first time statement filter.
                } else {
                    current = micronDB.traverse(query[queryType], micronDB.match[queryType], current); //filter again with the next statement.
                }
            }
        }
        return current;
    },
};
