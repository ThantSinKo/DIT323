function reverseString(str) {
    // Empty String to store the reversed string
    var newString = "";

    // Loop through the string in reverse order
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
reverseString('hello')

console.log(reverseString('hello')) // olleh