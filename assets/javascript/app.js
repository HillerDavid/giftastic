
$(document).ready(function () {
    var topics = ["labrador", "pug", "dalmation"]

    function loadButtons() {

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>").text(topics[i])
            newButton.addClass("gif-button")
            newButton.attr("data-query", (topics[i]))
            $("#gif-button-section").append(newButton)
        }
    }
    loadButtons()

    $("#add-gif-button").click(function () {
        var newButton = $("<button>").text($("user-input").val())
        $("#gif-button-section").append(newButton)
    })

    $(".gif-button").click(function () {
        var searchItem = $(this).attr("data-query")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=Wir4pR8vBsdXyktmyqIESfIqQZ9SB1aq&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var displayDiv = $("<div>").addClass("gif")
                var rating = $("<p>").text(results[i].rating)
                var gifImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still")
                displayDiv.append(rating, gifImage)
                $("#gif-display").prepend(displayDiv)
            }
        })

    })

    $(".gif").click(function () {
        var state = $(this).attr("data-state")

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this.attr("data-state", "still"))
        }
    })
})