$("h1").addClass("big-title underline-text");
$("h1").text("BYEEE");

$("a").attr("href", "https://www.amazon.com/ref=nav_logo");

$("button").click(function() {
    $("h1").css("color", "red");
});

$("input").keydown(function(event) {
    console.log(event.key);
});


$("button").on("click", function() {
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});

$("h1").prepend("<button>RMA</button>");
$("h1").append("<button>FCB</button>");