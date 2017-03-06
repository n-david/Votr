$(document).ready(function() {

  // Creates a choice in the form.
  function createChoiceElement() {
    const $choiceForm = $("<article>").addClass("form-group choice-form-group");
    const $choiceNumber = $("<label>").prepend("Choice: ");
    const $div = $("<div>").addClass("choice-inputs");
    const $choiceTextBox = $("<input type='text' name='choice'>").addClass("form-control");


    const $deleteChoice = $("<span>").addClass("delete-choice").html(`<i class="fa fa-trash-o" aria-hidden="true"></i>`);
    $deleteChoice.on("click", deleteThis2);

    const $describeExpand = $("<small>").addClass("describe-expand").html(`<p>Expand Description</p>`);
    $describeExpand.on("click", expand2);

    const $expandedDescription = $(`
      <div class="choice-describe">
      <label for="choice-description">Description:</label>
      <textarea type="text" name="choice_description" class="form-control" rows="3"></textarea>
      </div>
    `)

    $div.append($choiceTextBox, $deleteChoice);

    $choiceForm.append($choiceNumber, $div, $describeExpand, $expandedDescription);
    return $choiceForm;
  }

  $('.add-choice').on('click', function() {
    createChoiceElement().appendTo($('.choice-container-created'));
  });


  // both expand functions expand and collapse on click.
  function expand() {
    $(".describe-expand").on("click", function() {
      $(this).toggleClass('describe-expand');
      if ($(this).hasClass('describe-expand')) {
        $(this).html('<p>Expand Description</p>');
      } else {
        $(this).html('<p class="describe-close">Close Description</p>');
      }
      $(this).siblings('.choice-describe').slideToggle('fast');
    })
  }

  function expand2() {
    $(this).toggleClass('describe-expand');
    if ($(this).hasClass('describe-expand')) {
      $(this).html('<p>Expand Description</p>');
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
