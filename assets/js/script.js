//Declares variables.
apiKey = "kxcdjvcdpzf6bzfix1akdouq";
var queryURL = 'https://data.cityofchicago.org/resource/wvjp-8m67.json' + apiKey
var userSearch = ''


//Calls street sweeper schedule data from API.
var myData = undefined
$.ajax({
  url: "https://data.cityofchicago.org/resource/wvjp-8m67.json",
  type: "GET",
  data: {
    "$limit": 5000,
    "$$app_token": "wuWBoPJo0VvB887VUDjq8qYJ8"
  },
  success: function (data) {
  myData = data  }
}).then(function (response) {


// .then(function (data) {
//   // alert("Retrieved " + data.length + " records from the dataset!");
//   console.log(data)
// }).then(function (data)) 
//   console.log(data)
function searchButtonHandler() {
  let currentWardNumber = $('#zipcode').val();
  sweeperSched(myData, currentWardNumber);
}

$('#schedule-submit-button').click(searchButtonHandler);


// $('#schedule-submit-button').on('click', function
// $('#schedule-submit-button').val() = userSearch

// testBtn()




function sweeperSched(data, currentWardNumber) {
  // user input times
  let currentDate = moment();
  let currentMonthNumber = currentDate.format('M');
  let currentDateNumber = currentDate.format('D');

  console.log(currentWardNumber)


  for (var i = 0; i < data.length; i++) {
    // $('#table' + i).text(data[i].dates);
    if (data[i].month_number === currentMonthNumber) {
      if (data[i].dates.split(',').includes(currentDateNumber)) {
        console.log(data[i])
        if (data[i].ward === currentWardNumber) {
          // need to replace 'helloworld' with output
          let makeUserOutput = 'Month: ' + data[i].month_name + ' | Date(s): ' + data[i].dates ;
          // builds list items
          let html = `<tr><td>${makeUserOutput}</tr></td>`
          console.log(html)
          $('#tablebody').append(html);
        }
      }
    }
  }
}})