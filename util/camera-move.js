const axios = require('axios');
const Camera = require('../models/camera');

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
        axios(options).then(()=>{
            console.log('reponse zoom: ' + response.body);
        }).catch((error)=>{
            throw new Error(error);
        })
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
        axios(options).then(()=>{
            console.log(response.body);
        }).catch((error)=>{
            throw new Error(error);
        })
    },

    getConfigOfAllCam: function () {
        return new Promise((resolve, reject) => {
            Camera.find({}, (err, cameras) => {
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
        axios(options).then(()=>{
            console.log(response.body.substr(3))
            resolve(response.body.substr(3));
        }).catch((error)=>{
            throw new Error(error);
        })
        
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

        axios(options).then(()=>{
            console.log(response.body.substr(3, 4))
            var values = {
                pan: response.body.substr(3, 4),
                tilt: response.body.substr(7, 4)
            }
            resolve(values);
        }).catch((error)=>{
            throw new Error(error);
        })

        
    });
}