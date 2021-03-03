const request = require('request');
const Product = require('../models/product');

module.exports = {
    setZoom: function (ip, value) {
        var options = {
            'method': 'GET',
            'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ' + value + '&res=1',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log('reponse zoom: ' + response.body);
        });
    },
    setPanTiltValue: function (ip, pan, tilt) {
        var options = {
            'method': 'GET',
            'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC' + pan + tilt + '&res=1',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    },

    getConfigOfAllCam: function () {
        return new Promise((resolve, reject) => {
            Product.fetchAll(cameras => {
                var position = [];
                var count = cameras.length;
                let completed = 0;
                for (let i = 0; i < count; i++) {
                    Promise.all([
                        getZoom(cameras[i].ip),
                        getPanTiltValue(cameras[i].ip)
                    ]).then(values => {
                        position.push({
                            ip: cameras[i].ip,
                            zoom: values[0],
                            panTilt: values[1]
                        });
                        completed++;
                        if (completed == count) {
                            resolve(position);
                        }
                    });
                }
            });
        });
    }
};

function getZoom(ip) {
    return new Promise(resolve => {
        var options = {
            'method': 'GET',
            'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23AXZ&res=1',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body.substr(3))
            resolve(response.body.substr(3));
        });
    });
}

function getPanTiltValue(ip) {
    return new Promise(resolve => {
        var options = {
            'method': 'GET',
            'url': 'http://' + ip + '/cgi-bin/aw_ptz?cmd=%23APC&res=1',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body.substr(3, 4))
            var values = {
                pan: response.body.substr(3, 4),
                tilt: response.body.substr(7, 4)
            }
            resolve(values);
        });
    });
}