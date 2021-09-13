//Declares variables.
apiKey = "kxcdjvcdpzf6bzfix1akdouq";
var queryURL =
  "https://data.cityofchicago.org/resource/wvjp-8m67.json" + apiKey;
var userSearch = "";
// var currentMonthNumber = currentDate.format("M");
var myData = undefined;

//Call data from Local Storage
var searchArray ;
if (JSON.parse(localStorage.getItem("searchHistory"))){
  searchArray = JSON.parse(localStorage.getItem("searchHistory"))
}
else {
  searchArray = []
}
historyRefresh()

var wardBtn = $("#schedule-submit-button");
var addyBtn = $("#address-submit-button");
var img = $("#img-display");
var table = $(".table-section");
var table2 = $(".table-section2");
// var zipcodeBtn =$("#address-submit-button", appendSchedule);

wardBtn.on("click", appendSchedule);
addyBtn.on("click", appendWard);

//For desktop view- when button is clicked, append schedule over placeholder img.
function appendSchedule() {
  img.css("display", "none");
  table.css("display", "block");
}

function appendWard() {
  img.css("display", "none");
  table2.css("display", "block");
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
    if (data.length === 0) {
      let noZipOut =
        "Zip Code " +
        zipCodeTest +
        " does not have a direct ward number," +
        " for more information you can visit ";

      // builds list items
      let noZip = `<tr><td> ${noZipOut} <a href="https://www.chicago.gov/city/en/depts/mayor/iframe/lookup_ward_and_alderman.html" target="_blank"> this link!</a> </tr></td>`;

      // empty previous search + append the new new
      $("#tablebody").empty();
      $("#tablebody").append(noZip);

      // $("#tablebody2").append(getPdfHTML(ward, wardSection));
    }

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
      // let reverseArray = data[i].alderman
      // let namesHere = reverseArray.reverse();
      let sadieTryingOutput =
        "For " +
        data[i].zipcode +
        " the ward number is " +
        data[i].ward +
        " and the alderman is " +
        data[i].alderman;
        console.log(data[i].alderman)

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
  // can change this to ward id
  let currentWardNumber = $("#zipcode").val();
  if (currentWardNumber < 1 || currentWardNumber > 50) {
    let noWard = `<tr><td> Please provide an appropriate Cook County Ward number (1-50). <p>Use the 'Don't know your ward?' option above to help out!</p></tr></td>`;

    $("#tablebody2").empty();
    $("#tablebody2").append(noWard);
    //Local storage.
  } else {
    sweeperSched(currentWardNumber);
    localStorage.setItem("searchHistory", JSON.stringify(currentWardNumber))
    historyRefresh()
  }
});

//this function will provide the appending section for the embeding of the pdf
//added ids and styling to the frame box that has the pdf
function getPdfHTML(ward, wardSection) {
  return `
  <tr><td>Ward section ${wardSection} is being swept today.
  <p> Check out this map to see the sections in your ward: </p>
  <div id= "frame container" class="frame-container"
  style= "padding-bottom:56.25%; position:relative; display:block; width: 100%">
  <iframe id="pdfFrame" class="city-frame" width ="100%" height="100%" src="https://www.chicago.gov/content/dam/city/depts/streets/supp_info/2021-Street-Sweeping/Maps/sweepingWard_${ward}s.pdf" frameborder="0" allowfullscreen="" style="position:absolute; top:0; left: 0"></iframe>
  </div>`;
}
// code to put above to open a link in new tab instead of embed
// <a href="https://www.chicago.gov/content/dam/city/depts/streets/supp_info/2021-Street-Sweeping/Maps/sweepingWard_${ward}s.pdf" target="_blank" >Click Here. </a></tr></td>//

//function that takes in the ward number
function sweeperSched(currentWardNumber) {
  // user input times
  let currentDate = moment();
  let currentMonthNumber = currentDate.format("M");
  let currentDateNumber = currentDate.format("D");
  // let currentDateNumber = "10";

  // let currentWardNumber = $("#zipcode").val();
  // console.log(currentWardNumber);

  let wardUrl = `https://data.cityofchicago.org/resource/wvjp-8m67.json?ward=${currentWardNumber}`;
  // console.log($("#zipcode"));
  // ajax call for street sweeping info
  $.ajax({
    url: wardUrl,
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
            var monthCaps = data[i].month_name.substring(1).toLowerCase();
            let makeWardOutput2 =
              `<p>Ward:
              ${data[i].ward} </p>` +
              `<p>Ward Section:
              ${data[i].section} </p>` +
              `<p>
              ${data[i].month_name.charAt(0).toUpperCase()}${monthCaps}: 
              ${data[i].dates} </p>`;
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

            // saveStorage(wardData);
            break;
          }
        } else {
          let noSweepdOutput =
            "Ward " + data[i].ward + " is not being swept today!";

          // builds list items
          let noSweep = `<tr><td> ${noSweepdOutput} </tr></td>`;

          // empty previous search + append the new new
          $("#tablebody2").empty();
          $("#tablebody2").append(noSweep);

        }
      }
    }
  });
}

//Call data from Local Storage
var searchArray ;
if (JSON.parse(localStorage.getItem("searchHistory"))){
  searchArray = JSON.parse(localStorage.getItem("searchHistory"))
}

else {
  searchArray = []
}

// Draw local storage to HTML
function historyRefresh(){
  $("#history").empty()
  for (var i=0; i<searchArray.length; i++){
    var historyBtn = $("<button>").text(searchArray[i])
    historyBtn.addClass("btn btn-primary")
    historyBtn.on("click", function(){
      sweeperSched($(this).text())
    })
    $("#history").append(historyBtn)
  }
}

// function saveStorage(wardData) {
//   var wardStorage = pullStorage();

//   if (wardStorage.indexOf(wardData) !== -1) {
//     console.log("already checked");
//   } else {
//     wardStorage.push(wardData);
//   }
// }

// function pullStorage() {
//   var wardListStr = localStorage.getItem("wardList");

//   var wardList = [];

//   if (wardListStr !== null) {
//     wardList = JSON.parse(wardListStr);
//   }

//   return wardList;
// }

// getStorage()
console.log(searchArray)