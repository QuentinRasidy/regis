let appStatus = false;

module.exports = {
    getStatus: function () {
        return appStatus;
    },

    setStatus: function (bool) {
        appStatus = bool;
    }
}