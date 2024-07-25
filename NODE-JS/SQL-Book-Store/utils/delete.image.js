const fs = require('fs');

module.exports = function (path) {
    if (path) {
        fs.unlink('public/images/books/' + path, (error) => {
            if (error) {
                return { error: true, message: error.message }
            };
        });
    };
}