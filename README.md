# REGIS 🎥

REGIS : Showroom Video Manager

## Overview

REGIS is a web application which allows the video management of the Cisco FRANCE Showroom. Indeed, the Showroom has 5 cameras Panasonic 4K 360° configurable and controllable remotely which allows us to visualize the room in its smallest details.

<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-screenshot.png" width="1200">

With this WebApp you can create virtual demo which contains 1 or more scenes. Each scene is a fine tuning of the camera position, Webex video endpoint and
a HDMI matrix. Below is the page called "Demo" where you can see the list of the demo that were created.

<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-demo-list.png" width="1200">

When you select a **demo** you are redirected to an other page where you can load all the scenes related to the selected demo. In order to load a scene from the selected demo, choose a scene and click on the button **Load**. So with REGIS you can in one click switch between scenes in order to deliver a fluid virtual demonstration.
<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-scenes.png" width="1200">

## Equipment used

REGIS controls the following elements: 5 cameras Panasonic connected to a Room Kit Pro and a Kramer matrix (computer/mac) in order to select a specific output (screen) for a given input.

<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-equipement.png" width="1200">

## How to run 🔨

1. Clone this repo:

   ```sh
   git clone https://github.com/SarahCiscoFrance/REGIS.git
   ```

2. Change into the new repo's directory and install the Node.js dependencies:

   ```sh
   npm install
   ```

3. Install mongodb and create 2 collections of objects that you will call **"demos"** and **"saves"**.

4. Set your camera informations in the **product.json** (see example below)

   ```sh
   [{"id":"001","ip":"0.0.0.1","description":"a panasonic camera","name":"Cam n°1"},
    {"id":"002","ip":"0.0.0.2","description":"a panasonic camera","name":"Cam n°2"}]
   ```

5. Set the IP adresse of your Cisco Room device in the file **controllers/camera.js** on line 22:

   ```sh
   var sx80_ip = "YOUR_CISCO_DEVICE_IP_ADDRESS";
   ```

6. You need to implement the function for the kramer matrix management in the file **controllers/camera.js**.

   Create a REST API that configure the HDMI matrix and implement the function **setInOut()**, **setAllInOut()** and **getKrammerConfig()**
   in the file **controllers/camera.js** on line 583.

7. Set the PORT number in the file **app.js** on line 30:

   ```sh
   app.listen(PORT_NUMBER_HERE);
   ```

8. Start the app:

   ```sh
   npm start
   ```
