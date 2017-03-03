$(document).ready(function() {

  function createChoiceElement() {


    const $choiceForm = $("<article>").addClass("form-group choice-form-group");

    const $choiceNumber = $("<label>").prepend("Choice: ");

    const $div = $("<div>").addClass("choice-inputs");
    const $choiceTextBox = $("<input>").addClass("form-control");
    // const $deleteChoice = $(`
    //   <span class='delete-choice'>
    //     <i class='fa fa-trash-o' aria-hidden='true'></i>
    //   </span>`);
    const $deleteChoice = $("<span>").addClass("delete-choice").html(`<i class="fa fa-trash-o" aria-hidden="true"></i>`);

    $deleteChoice.on("click", deleteThis2);

    const $describeExpand = $("<small>").addClass("describe-expand").html(`<p>Expand description box</p>`);

    $describeExpand.on("click", expand2);


    // const $expandedDescription = $("<div>").addClass("choice-describe");
    const $expandedDescription = $(`
      <div class="choice-describe">
      <label for="choice-description">Description:</label>
      <textarea type="text" name="choice-description" class="form-control" rows="3"></textarea>
      </div>
      `)

    //const $labelDescription = $("<label>").text("Description: ");
    //const $descriptionChoice = $("<textarea>").addClass("form-control");

    $div.append($choiceTextBox, $deleteChoice);
    //$expandedDescription.append($labelDescription, $descriptionChoice);

    $choiceForm.append($choiceNumber, $div, $describeExpand, $expandedDescription);


    return $choiceForm;
  }

  $('.fa-plus').on('click', function() {
    console.log("click");
    createChoiceElement().appendTo($('.choice-container-created'));
    // expand();
  });


  function expand() {
    $(".describe-expand").on("click", function() {
    console.log("click");
    //const $descriptionBox = $();
    $(this).siblings('.choice-describe').slideToggle('fast');
    })
  }

  function expand2(){
      // $(".describe-expand2").on("click", function() {
    console.log("click");
    $(this).siblings('.choice-describe').slideToggle('fast');
    // })
  }

  expand();

  function deleteThis() {
    $(".delete-choice").on("click", function () {
      $(this.closest("article")).remove();
    })
  }

  function deleteThis2() {
      $(this.closest("article")).remove();
  }

  deleteThis();

});
