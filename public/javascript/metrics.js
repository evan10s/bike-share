$(document).ready(function() {
    var weekdayStats = [

        {
            day: "Sunday",
            count: 17303
        },
        {
            day: "Monday",
            count: 17251
        },
        {
            day: "Tuesday",
            count: 19136
        },
        {
            day: "Wednesday",
            count: 19819
        },
        {
            day: "Thursday",
            count: 20345
        },
        {
            day: "Friday",
            count: 20043
        },
        {
            day: "Saturday",
            count: 18530
        }
    ];

    var weekdayStatsTable = $('#weekday-stats');
    for (var i = 0; i < weekdayStats.length; i++) {
        var prevIndex = i - 1 < 0 ? weekdayStats.length - 1 : i - 1;
        var percentChange = (weekdayStats[i].count - weekdayStats[prevIndex].count)
                                        / weekdayStats[i].count * 100;
        percentChange = percentChange.toFixed(2); // show two decimal places - https://stackoverflow.com/a/12830454
        var significance = "";
        if (percentChange > 0) {
            significance = "positive";
        } else if (percentChange < 0) {
            significance = "negative";
        }

        if (percentChange > 0) { // show +7% instead of 7% for positive change
            percentChange = `+${percentChange}`;
        }
        console.log(percentChange, significance);
        weekdayStatsTable.append(`<tr>
                                    <td>${weekdayStats[i].day}</td>
                                    <td>${weekdayStats[i].count}</td>
                                    <td class="${significance}">${percentChange}%</td>
                                  </tr>
                                `)
    }


    firebaseInit();

    var db = firebase.firestore();
    // Disable deprecated features
    db.settings({
        timestampsInSnapshots: true
    });

    var dataRef = db.collection("data");


    var query = dataRef.where("duration",">=",0);

    var sum = 0;

    var weekdayCounts = {};
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // query.get().then(function(results) {
    //     if(results.empty) {
    //         console.log("No documents found!");
    //     } else {
    //         results.forEach(elem => {
    //             sum += elem.data().duration;
    //             var elemWeekday = elem.data().start_time.toDate().getDay();
    //             if (!weekdayCounts[elemWeekday]) {
    //                 weekdayCounts[elemWeekday] = 0;
    //             }
    //             weekdayCounts[elemWeekday]++;
    //         });
    //     }
    //     var count = results.size > 0 ? results.size : 1;
    //     var average = Math.round(sum / count / 60);
    //
    //     console.log(weekdayCounts);
    //     $('#avg-duration-loader').hide();
    //     $('#avg-rental-duration').text(average).show();
    //     var chartData = {
    //         dataSets: [
    //             {
    //                 label: "Scatter Dataset",
    //                 data: []
    //             }
    //         ]
    //     };
    //
    //     console.log(chartData);
    //     for (var day in weekdayCounts) {
    //         if (weekdayCounts.hasOwnProperty(day)) {
    //             chartData.dataSets[0].data.push({ x: parseInt(day), y: weekdayCounts[day]});
    //         }
    //     }
    //
    //     //TODO: make this chart a thing
    //     var ctx = new Chart(document.getElementById("daily-usage").getContext("2d")).Line(chartData);
    //
    // }).catch(function(error) {
    //     console.error("Error getting documents:", error);
    // });

    // Some magic of my own + StackOverflow to convert the data types
    // query.get().then(function(results) {
    //     if(results.empty) {
    //         console.log("No documents found!");
    //     } else {
    //         // go through all results
    //         results.forEach(function (doc) {
    //             console.log("Document data:", doc.data());
    //             dataRef.doc(doc.id).update({
    //                 "duration": parseInt(doc.data.duration),
    //                 "plan_duration": parseInt(doc.data().plan_duration),
    //                 "end_time": new Date(doc.data().end_time),
    //                 "start_time": new Date(doc.data().start_time)
    //
    //
    //             })
    //                 .then(x => console.log("updated value successfully for " + doc.id))
    //                 .catch(e=>console.error(e))
    //         });
    //
    //         // or if you only want the first result you can also do something like this:
    //         console.log("Document data:", results.docs[0].data());
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting documents:", error);
    // });
});