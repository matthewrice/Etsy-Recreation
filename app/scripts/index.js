//the following 3 variables allow me to use handlebars, jQuery, and underscore.
//These tools allow me to do some amazing things with my JavaScript.
var handlebars = require('handlebars');
var $ = require('jquery');
var _ = require('underscore');

//In the variable below, I have declared the variable "url" and assigned it an Etsy
//API key that gives me access to Etsy's "superman product-info.
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=superman&includes=Images,Shop";

//JSON stands for JavaScript Object Notation.
//JSON allows asynchronous communication between the browser and a server.
//JSON is used by AJAX.

//JSONP stands for JSON with Padding.
//JSONP is a technique used to overcome cross-domain restrictions.

//Fetch is a "method" that starts the process of fetching a resource.
//Fetch returns a promise (an operation that hasn't completed yet, but is expected in the future)
//The fetch method takes 2 parameters...input & init.
//Input defines the resource you want to fetch.
//Init is an object that contains any customer settings you want to apply to the request.

//In the function below, I am requesting (fetching) information (product info) from Etsy's
//domain server using the JSONP technique.
//I have chosen to pass just the "input" parameter and not the "init" parameter since I
//have an API key (application programming interface) which allows me access to Etsy's
//domain server.

//My function parameter (argument) is "data".
//I have defined the function with a variable (products) and a function.
//data.results is dot notation.  It is a method that gives me access to an object's properties.
//"Results" is an array containing more objects.
fetchJSONP(url, function(data){

  var products = data.results;
  displayProducts(products);
});


//Below, I have made a function declaration with the parameter of "products".
//This function is defined by a "for loop" that 1.) Gets the handlebar template I created
//in my html. 2.) Converts the template to JavaScript. 3.) Fills in the blanks in my
//template. 4.) Updates the D.O.M.
function displayProducts(products){
  //the syntax of the forEach array method is arr.forEach(callback[, thisArg])
  //the callback function takes 3 arguments. 1.) currentValue 2.) index 3.) array.
  //in this scenario, I only need to call the function with the 1st argument (currentValue).
  products.forEach(function(product){

    //this variable goes and gets the template I created from my HTML.
    var source = $("#entry-template").html();

    //this variable converts the template to JavaScript...hence the word compile.
    //the argument passed in the this variable is the above variable (source).
    var template = handlebars.compile(source);

    //I could be wrong, but I think this variable updates the D.O.M.
    var renderTemplate = template(product);

    //I could be wrong, but I think the jQuery method below, fills in the blanks in my template.
    //the argument passed in this variable is the above variable (template).
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
