$(document).ready(function () {
    var questionsArr = [{
        question: "Quote: 'I’m going to hang by the bar. Put out the vibe'",
        possibleAnswers: ["Napoleon Dynamite", "Hitch", "Romy & Michelle's High School Reunion", "Dumb & Dumber"],
        answer: "Lloyd in 'Dumb & Dumber'"
    }, {
        question: "Quote: 'Okay. Say hello to my little friend!'",
        possibleAnswers: ["The Godfather", "American Me", "Scarface", "Pulp Fiction"],
        answer: "Tony Montana in 'Scarface'"
    }, {
        question: "Quote: 'She doesn't even go here!'",
        possibleAnswers: ["Anchorman", "I Love You Man", "Mean Girls", "Bridesmaids"],
        answer: "Damian in 'Mean Girls'"
    }, {
        question: "Quote: 'I swear to God, I was like EMILIO!'",
        possibleAnswers: ["The Mighty Ducks", "A Night at the Roxbury", "Blades of Glory", "Superstar"],
        answer: "Steve Butabi in 'A Night at the Roxbury"
    }, {
        question: "Quote: 'Bye Felicia.'",
        possibleAnswers: ["Friday", "How High", "All About the Benjamins", "The Interview"],
        answer: "Craig in 'Friday"
    }, {
        question: "Quote: 'Your voice is like a combination of Fergie and Jesus'",
        possibleAnswers: ["Forgetting Sarah Marshall", "Your Higness", "Taladega Nights", "Step Brothers"],
        answer: "Dale in 'Step Brothers'"
    }, {
        question: "Quote: 'You’re killing me, Smalls!'",
        possibleAnswers: ["The Sandlot", "Baseketball", "Uncle Buck", "The Little Rascals"],
        answer: "Ham in 'The Sandlot'"
    }, {
        question: "Quote: 'They say don't dip the pen in company ink. I'm totally glad I dipped in your ink, bro.' ",
        possibleAnswers: ["This is the End", "Knocked Up", "Pineapple Express", "Observe and Report"],
        answer: "Saul in 'Pineapple Express'"
    }, {
        question: "Quote: 'Nobody puts Baby in a corner.'",
        possibleAnswers: ["Fight Club", "Big Daddy", "Sixteen Candles", "Dirty Dancing"],
        answer: "Johnny in 'Dirty Dancing'"
    }, {
        question: "Quote: 'I'm king of the world!'",
        possibleAnswers: ["Wolf of Wallstreet", "Scarface", "Titanic", "The Fighter"],
        answer: "Jack in Titanic"
    }];

    var correctAnswers = 0;
    var incorrectAnswers = 0;


    $(".startscreen").show();
    $(".gamescreen").hide();
    $(".resultscreen").hide();

    // Timer clock
    var number = 120;
    var intervalId;

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    function decrement() {
        number--;
        $("#timer").html("<h2>" + "Time Remaining:" + number + "</h2>");
        if (number === 0) {
            stop();
            $(".gamescreen").hide();
            $(".resultscreen").show();
            $("#timeout").html("You ran out of time. Try Again");
        }
    }
    function stop() {
        clearInterval(intervalId);
        number = 0;
    }

    // Start button
    $("#startbutton").on("click", function () {
        $(".startscreen").hide();
        $(".gamescreen").show();
        run();
    })

    // The list of questions and possible answers.

    function renderQandA() {

        var div = $("<div>")
        for (var i = 0; i < questionsArr.length; i++) {
            var h3 = $("<h3>").text(questionsArr[i].question)
            div.append(h3)

            for (var j = 0; j < questionsArr[i].possibleAnswers.length; j++) {
                var input = $("<input>").attr("type", "radio")
                    .attr("value", questionsArr[i].possibleAnswers[j])
                    .attr("name", "q" + (i + 1))
                    .attr("class", "listOfAnswers")
                    .attr("data-index", i)
                var label = $("<label>").text(questionsArr[i].possibleAnswers[j])
                div.append(input, label)
            }
            $("#questionaire").append(div)
        }

    }

    renderQandA();

    endOfGame();


    // Show the results after submit button is clicked on
    function endOfGame() {


        $(document).on("click", '.submitresults', function (event) {
            event.preventDefault();
            stop();
            $(".gamescreen").hide();
            $(".resultscreen").show();
            var selected = $("input:checked");
        
            for (var i = 0; i < selected.length; i++) {

                var questionIndex = selected[i].attributes["data-index"].value;
                
                if (selected[i].value === questionsArr[questionIndex].answer) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }

                $('#answers').html(`${correctAnswers} correct answers out of 10`);
            }

        });

    }
    
    resetGame();

    // Reset game
    function resetGame() {

        $(".reset").on("click", function () {
            location.reload();
        });
    }


});