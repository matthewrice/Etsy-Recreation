var handlebars = require('handlebars');
var $ = require('jquery');
var _ = require('underscore');

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=superman&includes=Images,Shop";

fetchJSONP(url, function(data){

  var products = data.results;
  displayProducts(products);
});

function displayProducts(products){
  products.forEach(function(product){
    var source = $("#entry-template").html();
    var template = handlebars.compile(source);
    var renderTemplate = template(product);
    $('.stamp').append(renderTemplate);
  });
}


function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
