$(document).ready(function() {

  //sidebar popup on click
  $(".choice").on("click", function(event) {
    $(this).closest(".voter-info").find(".choice-info-block").show("slide", {direction : "right"}, 300);
    // $(this).closest(".voter-info").find(".vote").animate({"left" : "-=50px"}, "slow");
    const choiceTitle = $(this).html();
    const choiceDescription = $(this).data("description");
    const sidebar = $(this).closest(".voter-info").find(".choice-info-block");

    sidebar.find("h2").html(choiceTitle);
    sidebar.find("p").html(choiceDescription);
    // $(".choice-info-block").show("slide", {direction : "left"}, 1000);

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

    // const poll_id = $(".poll-title").data("id");
    const poll_id = $(".poll-id").html();


    $.ajax({
      method: 'POST',
      url: '/poll/v/:vkey',
      data: {voteResult : reverseResult, voterName : voterName, poll_id : poll_id},
      success: function() {
        console.log("Success");
        //TODO: display modal success
        //TODO: disable vote button
      }
    });
  });

  //Modal popup on index.ejs
  // $(".modal-container").on('shown.bs.modal', '#modal-preview', function(event) {
  //   const modal = $(this);
  //   alert("modal open");
  //   console.log("modal open");
  // });
  // $('#modal-preview').on('show.bs.modal', function (event) {
  //   const modal = $(this);
  //   alert("modal open");
  // });

  //Modal close
  // $("#modal-preview").on("hidden.bs.modal", function(event) {
  //   // $(this).find("form").trigger("reset");
  //   alert("modal close");
  // });

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

  // $(".email-list").on("click", ".delete-added-email", function(e) {
  //     $(this).closest("li").remove();
  // });

  // $(".email-form").on("click", ".delete-email-input", function(e) {
  //   $(this).closest("article").remove();
  // });

  //Add email input on modal
  $(".add-email-input").on("click", function(e) {
    const emailFormGroup = `<article class="form-inline email-form-group">
                              <label for="v-email form-control-label">Email:</label>
                              <input type="email" name="email" class="form-control email-input">
                              <span class="delete-email-input"><i class="fa fa-times" aria-hidden="true"></i></span>
                            </article>`;
    $(this).closest(".email-containers").find(".email-form").append(emailFormGroup);
  });

  //Add email inputs to index.ejs
  // $(".add-email-btn").on("click", function(e) {
  //   const emailsAdded = [];
  //   $(".email-form-group").each(function() {
  //     emailsAdded.push($(this).find("input").val());
  //   });

  //   //Ajax submit both emails & poll data
  //   $("#new-poll").submit();
    /*<span class="delete-added-email"><i class="fa fa-trash-o" aria-hidden="true"></i></span></li>*/
    // const emailInput = `<article class="form-inline email-form-group"><input class="send-to" type="email" name="voter_email"><span class="delete-email-input"><i class="fa fa-times" aria-hidden="true"></i></span></article>`;
    // emailsAdded.forEach((email) => {
    //   $(".email-list").append(emailInput);

    //   // emailInput.val(email);
    // });

    //clear extra emailFromGroups & fields
    // $(".email-form article:not(:first)").remove();
    // $(this).closest(".modal-body").find("form").trigger("reset");
  });

