//Declares variables.
apiKey = "kxcdjvcdpzf6bzfix1akdouq";
var queryURL = 'https://data.cityofchicago.org/resource/wvjp-8m67.json' + apiKey
var userSearch = ''

//Calls street sweeper schedule data from API.
$.ajax({
  url: "https://data.cityofchicago.org/resource/wvjp-8m67.json",
  type: "GET",
  data: {
    "$limit": 5000,
    "$$app_token": "wuWBoPJo0VvB887VUDjq8qYJ8"
  }, 
  success: function (data){
    sweeperSched(data);
    debugger;
  } 
})

// .then(function (data) {
//   // alert("Retrieved " + data.length + " records from the dataset!");
//   console.log(data)
// }).then(function (data)) 
//   console.log(data)


//$('schedule-submit-button').click(searchButtonHandler);

// $('schedule-submit-button').on('click', function
// function testBtn() {
//   $('schedule-submit-button').val() = userSearch
// }
// testBtn()




function sweeperSched(data) {
  let currentDate = moment();
  let currentMonthNumber = currentDate.format('M');
  let currentDateNumber = currentDate.format('D');
  let currentWardNumber = ('48');



  for (var i = 0; i < data.length; i++) {
    // $('#table' + i).text(data[i].dates);
    if (data[i].month_number === currentMonthNumber) {
      if (data[i].dates.split(',').includes(currentDateNumber))
        if (data[i].ward === currentWardNumber)
      console.log(data[i]);
      } 
    
  }
}



