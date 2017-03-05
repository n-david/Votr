//rendering choice-info-block

$(document).ready(function() {

  //sidebar popup on click
  $(".choice").on("click", function(event) {
    $(this).closest(".voter-info").find(".choice-info-block").show("slide", {direction : "right"}, 300);
    const choiceTitle = $(this).html();
    const choiceDescription = $(this).data("description");
    const sidebar = $(this).closest(".voter-info").find(".choice-info-block");
    sidebar.find("h2").html(choiceTitle);

    if (checkIfUrl(choiceDescription)) {
      $.ajax({
      method: 'GET',
      url: choiceDescription,
      success: function() {
        const embedJSON = $.getJSON('https://api.embedly.com/1/oembed?' + $.param({
                            url: choiceDescription,
                            key: "d37e5b7ef8754516a19d57a2bb857cf4"
                          }));
        console.log(embedJSON);
      },
      error: function() {
        console.log("not valid url");
        sidebar.find("p").html(choiceDescription);
      }
      });
    }
  });
});