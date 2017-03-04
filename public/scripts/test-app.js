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
  $('#modal-preview').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
  });

  //Delete added emails
  $("email-recipients").on("click", "delete-added-email", function() {
    $(this).parent().remove();
  });


  
});