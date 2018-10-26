$(document).ready(function() {
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

    query.get().then(function(results) {
        if(results.empty) {
            console.log("No documents found!");
        } else {
            results.forEach(elem => {
                sum += elem.data().duration;
                var elemWeekday = elem.data().start_time.toDate().getDay();
                if (!weekdayCounts[elemWeekday]) {
                    weekdayCounts[elemWeekday] = 0;
                }
                weekdayCounts[elemWeekday]++;
            });
        }
        var count = results.size > 0 ? results.size : 1;
        var average = Math.round(sum / count / 60);

        console.log(weekdayCounts);
        $('#avg-duration-loader').hide();
        $('#avg-rental-duration').text(average).show();
        var chartData = {
            dataSets: [
                {
                    label: "Scatter Dataset",
                    data: []
                }
            ]
        };

        console.log(chartData);
        for (var day in weekdayCounts) {
            if (weekdayCounts.hasOwnProperty(day)) {
                chartData.dataSets[0].data.push({ x: parseInt(day), y: weekdayCounts[day]});
            }
        }

        //TODO: make this chart a thing
        var ctx = new Chart(document.getElementById("daily-usage").getContext("2d")).Line(chartData);

    }).catch(function(error) {
        console.error("Error getting documents:", error);
    });

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