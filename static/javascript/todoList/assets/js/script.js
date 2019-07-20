//helper functions=======================================================

//click on on list to mark it as finished
$("ul").on("click", "li", function() {
  //under the ul element, add listeners for all the potential li elements
  $(this).toggleClass("done");
  console.log("clicked");
});

$(".fa-plus-circle").on("click", function() {
  $("input").fadeToggle();
});

//click on the "delete" button to delete the current list
$("ul").on("click", "li span", function(event) {
  $(this)
    .parent()
    .slideUp(500, function() {
      $(this).remove();
    });
  // event.stopPorpagation();
});

// if previous box is grey, the current box is white
//if the previous box is white, then current box is gray
let pregray = true;
//type an new list into the text box and hit enter to create the new list
$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    // console.log("you hited an enter");
    let tdlist = $(this).val();
    // let listcode = $("ul").html();
    // console.log(listcode);
    // $("ul").html(listcode + "<li><span>X</span> " + tdlist + "</li>");
    if (pregray) {
      $("ul").append(
        "<li class='todo whitebox' style='display: none'><span><i class='fas fa-minus-circle'></i></span> " +
          tdlist +
          "</li>"
      );
    } else {
      $("ul").append(
        "<li class='todo' style='display: none'><span><i class='fas fa-minus-circle'></i></span> " +
          tdlist +
          "</li>"
      );
    }

    $("li[style='display: none']").slideToggle(500);
    // console.log($("ul").html());
    $(this).val("");
  }
});
