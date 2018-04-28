// Element polyfill na potrzeby obsługi elementu Function.prototype.bind() w systemie Android 2.3
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (thisValue) {
            if (typeof this !== "function") {
                throw new TypeError(this + " cannot be bound as it is not a function");
            }

            // Element bind() umożliwia również dołączanie argumentów do wywołania
            var preArgs = Array.prototype.slice.call(arguments, 1);

            // Rzeczywista funkcja wiążąca wartość „this” i argumenty z
            var functionToBind = this;
            var noOpFunction = function () { };

            // Argument „this” do użycia
            var thisArg = this instanceof noOpFunction && thisValue ? this : thisValue;

            // Wynikowa funkcja wiązana
            var boundFunction = function () {
                return functionToBind.apply(thisArg, preArgs.concat(Array.prototype.slice.call(arguments)));
            };

            noOpFunction.prototype = this.prototype;
            boundFunction.prototype = new noOpFunction();

            return boundFunction;
        };
    }
}());
