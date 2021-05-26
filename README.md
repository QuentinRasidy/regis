# REGIS

REGIS : Showroom Video Manager

## Overview

REGIS is a web application which allows the video management of the Cisco FRANCE Showroom. Indeed, the Showroom has 5 cameras Panasonic 4K 360° configurable and controllable remotely which allows us to visualize the room in its smallest details.

## Equipment used

REGIS controls the following elements: 5 cameras Panasonic connected to a Room Kit Pro and a Kramer matrix in order to select a specific output for a given input (a video switch).

## How to run 🔨

1. Clone this repo:

   ```sh
   git clone https://github.com/SarahCiscoFrance/Ghost-Meeting.git
   ```

2. Change into the new repo's directory and install the Node.js dependencies:

   ```sh
   npm install
   ```

3. Install mongodb and create 2 collections of objects that you will call "demos" and "saves".

4. Set your camera informations in the **product.json** (see example below)

   ```sh
   [{"id":"001","ip":"0.0.0.1","description":"a panasonic camera","name":"Cam n°1"},
    {"id":"002","ip":"0.0.0.2","description":"a panasonic camera","name":"Cam n°2"}]
   ```

5. Set the IP adresse of your Cisco Room device in the file **controllers/camera.js** on line 22

```sh
var sx80_ip = "YOUR_CISCO_DEVICE_IP_ADDRESS";
```

6. You need to implement the function for the kramer matrix management in the file **controllers/camera.js**

Create a REST API that configure the HDMI matrix and implement the function **setInOut()**, **setAllInOut()** and **getKrammerConfig()**
in the file **controllers/camera.js** on line 583.
