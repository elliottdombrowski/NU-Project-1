//Declares variables.
apiKey = "kxcdjvcdpzf6bzfix1akdouq";
var queryURL =
  "https://data.cityofchicago.org/resource/wvjp-8m67.json" + apiKey;
var userSearch = "";
// var currentMonthNumber = currentDate.format("M");
var myData = undefined;

var wardBtn = $("#schedule-submit-button");
var img = $("#img-display");
var table = $(".table-section");
var table2 = $(".table-section2")
// var zipcodeBtn =$("#address-submit-button", appendSchedule);

wardBtn.on("click", appendSchedule);

//For desktop view- when button is clicked, append schedule over placeholder img.
function appendSchedule() {
  img.css("display", "none");
  table.css("display", "block");
  table2.css("display", "block");
  console.log("workin pls");
}

var wardArray = [];
$("#address-submit-button").click(function (e) {
  e.preventDefault();
  var zipCodeTest = $("#address").val();
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
      console.log(data[i]);
      wardArray.push(data[i].ward);
      // create btn ward # = value

      // the user output will read as the following:
      let makeWardOutput =
        "Ward: " +
        data[i].ward +
        " -- Alderman: " +
        data[i].alderman +
        " -- Zipcode: " +
        data[i].zipcode;

      // ******** PSST EDGAR! This is for later if we have time, but let's leave them both displaying for now, I'd like to mess with how to switch the last, first names if there's ever time to do that
      let sadieTryingOutput =
        "For " +
        data[i].zipcode +
        " the ward number is " +
        data[i].ward +
        " and the alderman is " +
        data[i].alderman;

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

// direct ward number btn function
$("#schedule-submit-button").click(function (e) {
  // alert('btn works!');
  e.preventDefault();
  let currentWardNumber = $("#zipcode").val();
  sweeperSched(currentWardNumber);
});

//this function will provide the appending section for the embeding of the pdf
//added ids and styling to the frame box that has the pdf
function getPdfHTML(ward, wardSection) {
  return `
  <tr><td> The ward section today being swept is ${wardSection}",you can take a look at this map to see your section 
  <div id= "frame container"
  style= "padding-bottom:56.25%; position:relative; display:block; width: 100%">
  <iframe id="pdfFrame" width ="100%" height="100%" src="https://www.chicago.gov/content/dam/city/depts/streets/supp_info/2021-Street-Sweeping/Maps/sweepingWard_${ward}s.pdf" frameborder="0" allowfullscreen="" style="position:absolute; top:0; left: 0"></iframe>
  </div>`;
}
// code to put above to open a link in new tab instead of embed
// <a href="https://www.chicago.gov/content/dam/city/depts/streets/supp_info/2021-Street-Sweeping/Maps/sweepingWard_${ward}s.pdf" target="_blank" >Click Here. </a></tr></td>//

//function that takes in the ward number
function sweeperSched(currentWardNumber) {
  // user input times
  let currentDate = moment();
  let currentMonthNumber = currentDate.format("M");
  // let currentDateNumber = currentDate.format("D");
  let currentDateNumber = "10";

  // let currentWardNumber = $("#zipcode").val();
  // console.log(currentWardNumber);

  let zipcodeUrl = `https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=${currentWardNumber}`;
  // console.log($("#zipcode"));
  // ajax call for street sweeping info
  $.ajax({
    url: zipcodeUrl,
    type: "GET",
    data: {
      $limit: 5000,
      $$app_token: "wuWBoPJo0VvB887VUDjq8qYJ8",
    },
  }).done(function (data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      // $('#table' + i).text(data[i].dates);
      if (data[i].month_number === currentMonthNumber) {
        if (data[i].dates.split(",").includes(currentDateNumber)) {
          // console.log(data[i])
          if (data[i].ward === currentWardNumber) {
           // this adds the api values to the text
            let makeWardOutput2 =
              "Ward: " +
              data[i].ward +
              " | Ward Section: " +
              data[i].section +
              " | Month: " +
              data[i].month_name +
              " | Date(s): " +
              data[i].dates;
              //defining more variables to use in appending the html
            let wardSection = data[i].section;
            let ward = data[i].ward;

            // builds list items
            let html3 = `<tr><td> ${makeWardOutput2} </tr></td>`;

            console.log(html3);
            // empty previous search + append the new new
            $("#tablebody2").empty();
            $("#tablebody2").append(html3);
            //function to append the pdf url to embed in html
            $("#tablebody2").append(getPdfHTML(ward, wardSection));
          }
//         else {
// //           <div class="alert alert-dark" role="alert">
// //   A simple dark alert—check it out!
// // </div>
// alert('btn works!');
//         }
       }
      }
    }
  });
}

