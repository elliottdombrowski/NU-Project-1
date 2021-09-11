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
      console.log(data[i])
      wardArray.push(data[i].ward);
      // create btn ward # = value

      // the user output will read as the following:
          let makeWardOutput = 'Ward: ' + data[i].ward + ' -- Alderman: ' + data[i].alderman + ' -- Zipcode: ' + data[i].zipcode;

          // ******** PSST EDGAR! This is for later if we have time, but let's leave them both displaying for now, I'd like to mess with how to switch the last, first names if there's ever time to do that
          let sadieTryingOutput = 'For ' + data[i].zipcode + ' the ward number is ' + data[i].ward + ' and the alderman is ' + data[i].alderman;

          // builds list items in 'Results'
          let html = `<tr><td> ${makeWardOutput} </tr></td>`;
          let html2 = `<tr><td> ${sadieTryingOutput} </tr></td>`;
          // empty previous results + appends new output from js line #58 (and 59)
          $("#tablebody").empty();
          $("#tablebody").append(html, html2);

    }

    console.log(wardArray);
  });
  //HERE - use wardArray to call sweeperSched

});
console.log(wardArray);

// general btn function
$("#address-submit-button").click(function() {
  alert('btn works!');
});


//  Calls street sweeper schedule data from API.
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
//           let makeWardOutput =
//             "Ward: " +
//             data[i].ward +
//             " | Month: " +
//             data[i].month_name +
//             " | Date(s): " +
//             data[i].dates;
//           // builds list items
//           let html = `<tr><td> ${makeWardOutput} </tr></td>`;
//           console.log(html);
//           // empty previous search + append the new new
//           $("#tablebody").empty();
//           $("#tablebody").append(html);
//         }
//       }
//     }
//   }
// }
