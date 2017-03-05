/* URL PARSER */
function checkIfUrl(input) {
    var urlPattern = /^((http|https):\/\/)/;
    return urlPattern.test(input);
}

function checkIfValidUrl(input, cb) {
  $.ajax({
    method: 'HEAD',
    url: input,
    success: function() {
      cb();
    },
    error: function() {
      cb();
    }
  });
}