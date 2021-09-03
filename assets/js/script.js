//Declares variables.
apiKey= "kxcdjvcdpzf6bzfix1akdouq";
var queryURL = 'https://data.cityofchicago.org/resource/wvjp-8m67.json' + apiKey

//Calls street sweeper schedule data from API.
      $.ajax({
        url: "https://data.cityofchicago.org/resource/wvjp-8m67.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "wuWBoPJo0VvB887VUDjq8qYJ8"
        }
    }).done(function(data) {
      alert("Retrieved " + data.length + " records from the dataset!");
      console.log(data)});
