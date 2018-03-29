var config = {
    apiKey: "AIzaSyC3A82XxjuywuefDslj2_w3mNsyCdLN3EQ",
    authDomain: "trainscheduler-5cea9.firebaseapp.com",
    databaseURL: "https://trainscheduler-5cea9.firebaseio.com",
    projectId: "trainscheduler-5cea9",
    storageBucket: "trainscheduler-5cea9.appspot.com",
    messagingSenderId: "825736979268"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainDest = "";
  var trainTime = "";
  var trainFreq = "";

  $("#addTrain").on("click", function(event) {
      event.preventDefault();

      trainName = $("#addName").val().trim();
      trainDest = $("#addDestination").val().trim();
      trainTime = $("#addFirstTime").val().trim();
      trainFreq = $("#addFrequency").val().trim();

      console.log(trainName);
      console.log(trainDest);
      console.log(trainTime);
      console.log(trainFreq);

      database.ref().push({
          train: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq,
      });
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey)   {

    console.log(childSnapshot.val());

      var newTrain = childSnapshot.val().train;
      var newDest = childSnapshot.val().destination;
      var newTime = childSnapshot.val().time;
      var newFreq = childSnapshot.val().frequency;

        console.log(newTrain);
        console.log(newDest);
        console.log(newTime);
        console.log(newFreq);

    var timeConverted = moment(newTime, "hh:mm").subtract(1, "years");
        console.log(timeConverted);

    var currentTime = moment();
        console.log("Current Time: " + (currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(timeConverted), "minutes");
        console.log("Time difference: " + timeDifference);

    var timeRemain = timeDifference % newFreq;
        console.log(timeRemain);

    var timeTilTrain = newFreq - timeRemain;
        console.log("Time until next train: " + timeTilTrain);

    var nextTrain = moment().add(timeTilTrain, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment(nextTrain).format("hh:mm");

console.log(childSnapshot.val());
console.log("Train: " + childSnapshot.val().train);

$(".trainInfo").append("<tr><td>" + newTrain + "</td><td>" + newDest + "</td><td>" + newFreq + "</td><td>" + nextArrival + "</td><td>" + timeTilTrain + "</td></tr>");
});
