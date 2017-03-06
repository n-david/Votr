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
        query: {maxwidth: 450, maxheight: 450}
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
    $(".email-section").slideToggle(500);
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

  // Create choice form DOM element
  function createChoiceElement() {
    const $choiceForm = $("<article>").addClass("form-group choice-form-group");
    const $choiceNumber = $("<label>").prepend("Choice");
    const $div = $("<div>").addClass("choice-inputs");
    const $choiceTextBox = $("<input type='text' name='choice'>").addClass("form-control");
    const $deleteChoice = $("<span>").addClass("delete-choice").html(`<i class="fa fa-trash-o" aria-hidden="true"></i>`);
    $deleteChoice.on("click", deleteThis2);

    const $describeExpand = $("<small>").addClass("describe-expand").html(`<p>Add Description</p>`);

    $describeExpand.on("click", expand2);
    const $expandedDescription = $(`
      <div class="choice-describe">
      <label for="choice-description">Description</label>
      <textarea type="text" name="choice_description" class="form-control" rows="3"></textarea>
      </div>
    `);
    $div.append($choiceTextBox, $deleteChoice);
    $choiceForm.append($choiceNumber, $div, $describeExpand, $expandedDescription);
    return $choiceForm;
  }

  //Add choice form group
  $('.add-choice').on('click', function() {
    createChoiceElement().appendTo($('.choice-container-created'));
  });

  //Both expand functions expand and collapse on click.
  function expand() {
    $(".describe-expand").on("click", function() {
      $(this).toggleClass('describe-expand');
      if ($(this).hasClass('describe-expand')) {
        $(this).html('<p>Add Description</p>');
      } else {
        $(this).html('<p class="describe-close">Close Description</p>');
      }
      $(this).siblings('.choice-describe').slideToggle('fast');
    })
  }

  function expand2() {
    $(this).toggleClass('describe-expand');
    if ($(this).hasClass('describe-expand')) {
      $(this).html('<p>Add Description</p>');
    } else {
      $(this).html('<p class="describe-close">Close Description</p>');
    }
    $(this).siblings('.choice-describe').slideToggle('fast');
  }
  expand();

  function deleteThis() {
    $(".delete-choice").on("click", function() {
      $(this.closest("article")).remove();
    })
  }
  function deleteThis2() {
    $(this.closest("article")).remove();
  }
  deleteThis();
});
