/* URL PARSER */
function checkIfUrl(input) {
    var urlPattern = /^((http|https):\/\/)/;
    return urlPattern.test(input);
}
