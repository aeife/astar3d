if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(e /*, from*/) {
        var length = this.length;
        var from = Number(arguments[1]) || 0;

        if (from < 0) {
            from = Math.ceil(from) + length;
        } else {
            from = Math.floor(from);
        }

        for (; from < length; ++from) {
            if (from in this && this[from] === e) {
                return from;
            }
        }
        return -1;
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);

        if (from < 0) {
             this.length = this.length + from;
        } else {
             this.length = from;
        }

        return this.push.apply(this, rest);
    };
}