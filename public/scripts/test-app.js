$(document).ready(function() {

  //Each choice on click: show sidebar with embed content or plain text 
  $(".choice").on("click", function(event) {
    const sidebar = $(this).closest(".voter-info").find(".choice-info-block");
    sidebar.show("slide", {direction : "right"}, 300);
    const choiceTitle = $(this).html();
    const choiceDescription = $(this).data("description");
    sidebar.empty();
    sidebar.append("<h2></h2><p></p>");
    sidebar.find("h2").html(choiceTitle);

    if (checkIfUrl(choiceDescription)) {
      sidebar.append("<a href=''></a>")
      sidebar.find("a").attr("href", choiceDescription);
      sidebar.find("a").html(choiceDescription);
      $('a').embedly({
        key: 'd37e5b7ef8754516a19d57a2bb857cf4',
        query: {maxwidth:500, maxheight: 500}
      });
    } else {
      sidebar.find("p").html(choiceDescription);
    }
  });

  //Vote button on click : sort ol into array and ajax post to database
  $(".vote-btn").on("click", function(event) {
    const voterName = $(".name-input").val();
    if (!voterName) {
      $('.name-input').effect('bounce');
      $('.status-area').html("Oops you need a name input!").addClass('error').slideDown('slow');
      return;
    }
    const voteResult = [];
    $('.choice').each(function(){
      voteResult.push($(this).data("id"));
    });
    const reverseResult = voteResult.reverse();
    const poll_id = $(".poll-title").data("id");

    $.ajax({
      method: 'POST',
      url: '/poll/v/:vkey',
      data: {voteResult : reverseResult, voterName : voterName, poll_id : poll_id},
      success: function() {
         jQuery.noConflict();
        $("#modal-success").modal('show');
        $(".poll-submit").empty().append("<p>Thank you for voting!</p>");
      }
    });
  });

  //Show email input container
  $(".add-emails").on("click", function(e) {
    $(".email-section").css("display", "block");
  });

  //Appened new email input to email container
  $("#new-poll").on("click", ".add-email-input", function(e) {
    const emailFormGroup = `<label for="v-email form-control-label">Email:</label>
                            <input type="email" name="v_email" class="form-control email-input">
                            <span class="delete-email-input"><i class="fa fa-times" aria-hidden="true"></i></span>`;
    $("<article>", {class : "email-form-group form-inline"}).append(emailFormGroup).appendTo(".email-container");
  });

  //Delete email input 
   $("#new-poll").on("click", ".delete-email-input", function(e) {
     $(this).closest("article").remove();
   });
});

