$(document).ready(function() {

  //sidebar popup on click
  $(".choice").on("click", function(event) {
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

    $.ajax({
      method: 'POST',
      url: '/poll/v/:vkey',
      data: {voteResult : voteResult, voterName : voterName},
      success: function() {
        console.log("Succes");
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
  $("#modal-preview").on("hidden.bs.modal", function(event) {
    // $(this).find("form").trigger("reset");
    alert("modal close");
  });

  //Delete added emails on index.ejs    
  $(".email-list").on("click", ".delete-added-email", function(e) {
      $(this).closest("li").remove();    
  });

  //Add email input on modal 
  $(".add-email").on("click", function(e) {
    const emailFormGroup = `<article class="form-inline email-form-group">
                              <label for="v-email form-control-label">Email:</label>
                              <input type="email" name="email" class="form-control email-input">
                            </article>`;
    $(this).closest(".email-containers").find(".email-form").append(emailFormGroup);
  });

  $(".add-email-btn").on("click", function(e) {
    const emailsAdded = [];
    $(".email-form-group").each(function() {
      emailsAdded.push($(this).find("input").val());
    });
    
    emailsAdded.forEach((email) => {
      let emailItem = `<li class="send-to">${email}<span class="delete-added-email"><i class="fa fa-trash-o" aria-hidden="true"></i></span></li>`;
      $(".email-list").append(emailItem);
    });
    
    //clear extra emailFromGroups & fields
    $(".email-form article:not(:first)").remove();
    $(this).closest(".modal-body").find("form").trigger("reset");
  });
    
 

});