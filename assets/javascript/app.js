
$(document).ready(function () {
    //Starting Array
    var topics = ["labrador", "pug", "dalmation"]
    
    //
    function loadButtons() {

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>").text(topics[i])
            newButton.addClass("gif-button")
            newButton.attr("data-query", (topics[i]))
            $("#gif-button-section").append(newButton)
        }
    }
    loadButtons()

    $("#add-gif-button").click(function (event) {
        event.preventDefault()
        userInput = $("#user-input").val().trim()
        if ($.inArray(userInput, topics) === -1) {
            topics.push(userInput)
            $("#gif-button-section").empty()
            loadButtons()
        } else {
            alert("Button already exists for " + userInput)
        }
        $("#user-input").val("")
    })

    $("body").on("click", ".gif-button", function () {
        var searchItem = $(this).attr("data-query")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=Wir4pR8vBsdXyktmyqIESfIqQZ9SB1aq&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var displayDiv = $("<div>")
                var rating = $("<p>").text(results[i].rating)
                var gifImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif")
                displayDiv.append(rating, gifImage)
                $("#gif-display").prepend(displayDiv)
            }
        })

    })

    $("body").on("click", ".gif", function () {
        var state = $(this).attr("data-state")

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")
        }
    })
})