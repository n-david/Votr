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

    const reverseResult = voteResult.reverse();
    const poll_id = $(".poll-id").html();


    $.ajax({
      method: 'POST',
      url: '/poll/v/:vkey',
      data: {voteResult : reverseResult, voterName : voterName, poll_id : poll_id},
      success: function() {
        console.log("Succes");
        //TODO: display modal success
        //TODO: disable vote button
      }
    });
  });

  //Modal popup on index.ejs
  $('#modal-preview').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    // modal.find('.modal-title').text('New message to ' + recipient)
    // modal.find('.modal-body input').val(recipient)
  });


});
