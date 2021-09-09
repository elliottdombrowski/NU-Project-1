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
  success: function (data){
    sweeperSched(data);
    // debugger;
  } 

  },
  success: function (data) {
  myData = data  }

})


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
        // console.log(data[i])
        if (data[i].ward === currentWardNumber) {
          // need to replace 'helloworld' with output
          let makeUserOutput = 'Ward: ' + data[i].ward + ' | Month: ' + data[i].month_name + ' | Date(s): ' + data[i].dates ;
          // builds list items
          let html = `<tr><td> ${makeUserOutput} </tr></td>`
          console.log(html)
          // empty previous search + append the new new
          $('#tablebody').empty();
          $('#tablebody').append(html);
        }
      }
    }
  }

}
      $.ajax({
        url: "https://data.cityofchicago.org/resource/wvjp-8m67.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : "wuWBoPJo0VvB887VUDjq8qYJ8"
        }
    }).done(function(data) {
      // alert("Retrieved " + data.length + " records from the dataset!");
      console.log(data)});


  // // fix all caps of month string
  // var monthCaps = data[i].month_name.toLowerCase().split(' ');
  // for (var j = 0; j < monthCaps.length; j++) {
  //     // turns the month string into proper caps
  //     monthCaps[j] = monthCaps[j].month_name.charAt(0).toUpperCase() + monthCaps[j].month_name.substring(1);
  // }


}

// (¬‿¬) - SODA

