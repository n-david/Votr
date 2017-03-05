$(document).ready(function() {

  //sidebar popup on click
  $(".choice").on("click", function(event) {
    $(this).closest(".voter-info").find(".choice-info-block").show("slide", {direction : "right"}, 300);
    const choiceTitle = $(this).html();
    const choiceDescription = $(this).data("description");
    const sidebar = $(this).closest(".voter-info").find(".choice-info-block");

    sidebar.find("h2").html(choiceTitle);
    sidebar.find("p").html(choiceDescription);

  });

  //sort ol into array on 'vote button' clicked
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

  $(".add-emails").on("click", function(e) {
    $(".email-section").css("display", "block");
  });

  $("#new-poll").on("click", ".add-email-input", function(e) {
    const emailFormGroup = `<label for="v-email form-control-label">Email:</label>
                            <input type="email" name="v_email" class="form-control email-input">
                            <span class="delete-email-input"><i class="fa fa-times" aria-hidden="true"></i></span>`;

    $("<article>", {class : "email-form-group form-inline"}).append(emailFormGroup).appendTo(".email-container");
  });

  //Delete added emails on index.ejs
   $("#new-poll").on("click", ".delete-email-input", function(e) {
     $(this).closest("article").remove();
   });

  //Add email input on modal
  $(".add-email-input").on("click", function(e) {
    const emailFormGroup = `<article class="form-inline email-form-group">
                              <label for="v-email form-control-label">Email:</label>
                              <input type="email" name="email" class="form-control email-input">
                              <span class="delete-email-input"><i class="fa fa-times" aria-hidden="true"></i></span>
                            </article>`;
    $(this).closest(".email-containers").find(".email-form").append(emailFormGroup);
  });
});

