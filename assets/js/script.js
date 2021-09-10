//Declares variables.
apiKey = "kxcdjvcdpzf6bzfix1akdouq";
var queryURL =
  "https://data.cityofchicago.org/resource/wvjp-8m67.json" + apiKey;
var userSearch = "";
// var currentMonthNumber = currentDate.format("M");


// .then(function (data) {
//   // alert("Retrieved " + data.length + " records from the dataset!");
//   console.log(data)
// }).then(function (data))
// //   console.log(data)
// function searchButtonHandler(event) {
//   event.preventDefault();
//   let currentWardNumber = $("#zipcode").val();
//   console.log();
//   let zipcodeUrl = `https://data.cityofchicago.org/resource/htai-wnw4.json?zipcode=${currentWardNumber}`;
//   console.log($("#zipcode"));
//   $.ajax({
//     url: zipcodeUrl,
//     type: "GET",
//     data: {
//       $limit: 5000,
//       $$app_token: "wuWBoPJo0VvB887VUDjq8qYJ8",
//     },
//   }).done(function (data) {
//     console.log(data);
//   });

  // commented out until ready
  // sweeperSched(myData, currentWardNumber);
// }

// $("#schedule-submit-button").click(searchButtonHandler());
// var zipCodeTest = $(".zipcode-input").val();
var wardArray = [];
$("#schedule-submit-button").click(function (e) {
  e.preventDefault();
  var zipCodeTest = $("#zipcode").val();
  console.log(zipCodeTest);
  $.ajax({
    url: `https://data.cityofchicago.org/resource/htai-wnw4.json?zipcode=${zipCodeTest}`,

    type: "GET",
    data: {
      $limit: 5000,
      $$app_token: "wuWBoPJo0VvB887VUDjq8qYJ8",
    },
  }).done(function (data) {
    for (let i = 0; i < data.length; i++) {
      wardArray.push(data[i].ward);
      // appending data 
      // create btn ward # = value
    }

    console.log(wardArray);
  });

  //HERE - use wardArray to call sweeperSched
});
console.log(wardArray);


//Calls street sweeper schedule data from API.
// var myData = undefined;
// $.ajax(
//   {
//     url: "https://data.cityofchicago.org/resource/wvjp-8m67.json",
//     type: "GET",
//     data: {
//       $limit: 5000,
//       $$app_token: "wuWBoPJo0VvB887VUDjq8qYJ8",
//     },
//     success: function (data) {
//       sweeperSched(data);
//     },
//   },
//   (success = function (data) {
//     myData = data;
//     console.log(data);
//   })
// );

// 

// function sweeperSched(data, currentWardNumber) {
//   // user input times
//   let currentDate = moment();
//   let currentMonthNumber = currentDate.format("M");
//   let currentDateNumber = currentDate.format("D");

//   console.log(currentWardNumber);

//   for (var i = 0; i < data.length; i++) {
//     // $('#table' + i).text(data[i].dates);
//     if (data[i].month_number === currentMonthNumber) {
//       if (data[i].dates.split(",").includes(currentDateNumber)) {
//         // console.log(data[i])
//         if (data[i].ward === currentWardNumber) {
//           // need to replace 'helloworld' with output
//           let makeUserOutput =
//             "Ward: " +
//             data[i].ward +
//             " | Month: " +
//             data[i].month_name +
//             " | Date(s): " +
//             data[i].dates;
//           // builds list items
//           let html = `<tr><td> ${makeUserOutput} </tr></td>`;
//           console.log(html);
//           // empty previous search + append the new new
//           $("#tablebody").empty();
//           $("#tablebody").append(html);
//         }
//       }
//     }
//   }
// }
