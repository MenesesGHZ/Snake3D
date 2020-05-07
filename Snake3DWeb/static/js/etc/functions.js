/*Function Recovered from: https://coderwall.com/p/flonoa/simple-string-format-in-javascript*/
String.prototype.format = function () {
        var a = this;
        for (var k in arguments) {
            a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
        }
        return a
    }
