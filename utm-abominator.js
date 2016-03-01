/**
 * UTM Abominator - remove all horrible link uselessness from your browser bar.
 */

 if (location.search.length > 0) {
     const BAN = ['utm_source', 'utm_medium', 'utm_campaign'];

     var params = { };
     var key = null, value = null, split = null;
 //  split the query string by the ampersand symbol, excluding the question mark at the beginning
     for (var pair of location.search.substring(1).split(/&/)) {
 //      split each chunk on the equals sign
         split = pair.split(/=/);

         if (split.length > 0) {
 //          the key is before the equals
             key = split[0];
             if (split.length > 1)
 //              the value is everything after the equals
                 value = split.slice(1).join('=');

             params[key] = value;
         }
     };

 //  eliminate all banned keys from the dictionary
     var changed = false;

     Object.keys(params).map(function(k) {
         if (BAN.indexOf(k) != -1) {
             delete params[k];
             changed = true;
         }
     });

 //  conditionally write the changes
     if (changed) {
         var search = Object.keys(params).map(function(k) {
             return [k, params[k]].filter(function(k) { return Boolean(k); }).join('=');
         }).join('&');

         if (search.length > 0)
             search = '?' + search;

         location.replace([location.protocol, '//', location.hostname, location.pathname, search, location.hash].join(''));
     }
 }
