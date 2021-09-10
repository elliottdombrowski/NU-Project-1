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
  let zipcodeUrl = `https://data.cityofchicago.org/resource/htai-wnw4.json?zipcode=${currentWardNumber}`
  
  $.ajax({
    url: zipcodeUrl,
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "wuWBoPJo0VvB887VUDjq8qYJ8"
    }
}).done(function(data) {
  console.log(data);
  
});
  
  // commented out until ready 
  // sweeperSched(myData, currentWardNumber);
}

$('#schedule-submit-button').click(searchButtonHandler);
function wardLookUp() {
}

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
    
    function zipToWard() {
      // builds list items
      let html = `<tr><td> ${testhere} </tr></td>`
      console.log(html)
      // empty previous search + append the new new
      $('#tablebody').empty();
      $('#tablebody').append(html);
    }


  }

  // navigator.geolocation.getCurrentPosition(position => {
  //   const { latitude, longitude } = position.coords;
    
  //   // Show a map centered at latitude / longitude.
  // });
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



var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(success, error, options);

//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

$.ajax({
  url: "https://data.cityofchicago.org/resource/k9yb-bpqx.json",
  type: "GET",
  data: {
    "$limit" : 5000,
    "$$app_token" : "wuWBoPJo0VvB887VUDjq8qYJ8"
  }
}).done(function(data) {
// alert("Retrieved " + data.length + " records from the dataset!");
console.log(data);
});


// (¬‿¬) - SODA

// var app = {};
// 	app.locateWard = function(resp){
//   $("#addrResult").remove();
//   $("#clnAddr").remove();
//   app.clnAddress = '';
//   try{
//     if(resp.ForwardGeocodeServiceOutput3 && typeof resp.ForwardGeocodeServiceOutput3 != 'undefined'){
//       app.out = resp.ForwardGeocodeServiceOutput3;
//       if(app.out.geoValues && typeof app.out.geoValues != 'undefined' && app.out.geoValues.length){
//         app.ward = parseInt(app.out.geoValues[0].geographyValue);
//         app.clnAddress = app.out.fullAddress;
//         if(app.ward == 0)throw (new Error("NO_WARD"));
//         $.each(app.wardoffice, function(i,v){
//           //remove any data type mismatch
//           if( parseInt(v.attributes["WARD"]) == parseInt(app.ward)){
//             app.highlightWard(v);			
//           }
//         });	
//       }
//       else{throw  (new Error("NO_ADDRESS"))}
//     }
//     catch(err){
// 			var msg;
// 			if(err.message == 'NO_ADDRESS'){
// 				msg = 'Unable to find address: '+app.inFullAddr;
// 			}else if(err.message == 'NO_WARD'){
// 				msg = 'No Ward Associated with address: '+app.clnAddress; 
// 			}
// 			var ld = $(document.createElement('div'));
// 			ld.attr('id','addrResult');
// 			ld.html('<table id="data"><tr><td style="text-align:left; color: red; background:aliceblue; text-decoration:italic;">'+msg+'</td></tr></table>');
// 			$("#addrButton").append(ld);
// 		}

// $.ajax({
//   url: "https://data.cityofchicago.org/resource/htai-wnw4.json?",
//   //  https://data.cityofchicago.org/resource/htai-wnw4.json?address=3001 West Irving Park Road
//   type: "GET",
//   data: {
//     "$limit" : 5000,
//     "$$app_token" : "wuWBoPJo0VvB887VUDjq8qYJ8"
//   }
// }).done(function(data) {
// alert("Retrieved " + data.length + " records from the dataset!");
// console.log(data);
// });

// (¬‿¬) - SODA

