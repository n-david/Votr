$(document).ready(function() {

  $(".choice").on("click", function(event) {
    const choiceTitle = $(this).html();
    const choiceDescription = $(this).data("description");
    const sidebar = $(this).closest(".voter-info").find(".choice-info-block");
    
    sidebar.find("h2").html(choiceTitle);
    sidebar.find("p").html(choiceDescription);
    
  });

  
});