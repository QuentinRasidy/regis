# REGIS 🎥

REGIS : Showroom Video Manager

## Overview

REGIS is a web application which allows the video management of the Cisco FRANCE Showroom. Indeed, the Showroom has 5 cameras Panasonic 4K 360° configurable and controllable remotely which allows us to visualize the room in its smallest details.

<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-screenshot.png" width="1200">

With this WebApp you can create virtual demo which contains 1 or more scenes. Each scene is a fine tuning of the camera position, Webex video endpoint and
HDMI matrix. Below is the page called "Demo" where you can see the list of the demo that were created.

<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-demo-list.png" width="1200">

When you select a **demo** you are redirected to an other page where you can load all the scenes related to the selected demo. In order to load a scene from the selected demo, choose a scene and click on the button **Load**. So with REGIS you can in one click switch between scenes in order to deliver a fluid virtual demonstration.
<img src="https://raw.githubusercontent.com/SarahCiscoFrance/REGIS/main/regis-scenes.png" width="1200">

## Equipment used

REGIS controls the following elements: 5 cameras Panasonic connected to a Room Kit Pro and a Kramer matrix (a switch video) in order to select a specific output (screen) for a given input (computer/mac).

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

3. Install mongodb and create 5 collections that you will call **"demos"**, **"saves"**, **"cameras"**, **"codec"** and **"matrix"**.

4. Then you need to add cameras info, Cisco endpoint info and HDMI matrix info. To do this add Documents in mongoDB collections : 
 
**cameras document example :** 
 
   ```sh
   {
    "ip" : "10.0.0.1",
    "description" : "CAMERA DESCRIPTION HERE",
    "name" : "CAMERA NAME HERE"
   }
   ```
   (Add one document per camera)
   
**codec document example :** 
 
   ```sh
   {
       "ip" : "10.0.0.1",
       "name" : "Cisco Webex Endpoint name's",
       "inputLabels" : [ 
           {
               "number" : 1,
               "name" : "NAME FOR INPUT WITH ID NUMBER 1 (The identifier (ID) of the connector)"
           }, 
           {
               "number" : 2,
               "name" : "NAME FOR INPUT WITH ID NUMBER 2 (The identifier (ID) of the connector)"
           }, 
           {
               "number" : 3,
               "name" : "NAME FOR INPUT WITH ID NUMBER 3 (The identifier (ID) of the connector)"
           }, 
           {
               "number" : 4,
               "name" : "NAME FOR INPUT WITH ID NUMBER 4 (The identifier (ID) of the connector)"
           }
       ]
   }
   ```
   
**matrix document example :**

```sh
{
    "name" : "NAME OF HDMI MATRIX HERE",
    "inputs" : [ 
        {
            "number" : "1",
            "label" : "label of input number 1 HERE"
        }, 
        {
            "number" : "2",
            "label" : "label of input number 2 HERE"
        }, 
        {
            "number" : "3",
            "label" : "label of input number 3 HERE"
        }, 
        {
            "number" : "4",
            "label" : "label of input number 4 HERE"
        }, 
        {
            "number" : "5",
            "label" : "label of input number 5 HERE"
        }, 
        {
            "number" : "6",
            "label" : "label of input number 6 HERE"
        }, 
        {
            "number" : "7",
            "label" : "label of input number 7 HERE"
        }, 
        {
            "number" : "8",
            "label" : "label of input number 8 HERE"
        }
    ],
    "outputs" : [ 
        {
            "number" : "1",
            "label" : "label of output number 1 HERE"
        }, 
        {
            "number" : "2",
            "label" : "label of output number 2 HERE"
        }, 
        {
            "number" : "3",
            "label" : "label of output number 3 HERE"
        }, 
        {
            "number" : "4",
            "label" : "label of output number 4 HERE"
        }, 
        {
            "number" : "5",
            "label" : "label of output number 5 HERE"
        }, 
        {
            "number" : "6",
            "label" : "label of output number 6 HERE"
        }, 
        {
            "number" : "7",
            "label" : "label of output number 7 HERE"
        }, 
        {
            "number" : "8",
            "label" : "label of output number 8 HERE"
        }
    ]
}

```


**Warning the codec and matrix collections must contain only 1 document**

5. You need to implement the function for the kramer matrix management in the file **controllers/camera.js**.

   Create a REST API that configure the HDMI matrix and implement the function **setInOut()**, **setAllInOut()** and **getKrammerConfig()**
   in the file **controllers/camera.js** on line 798. Its functions must of course call your REST API.

6. Create a .env file in the project and add the PORT number like this:

   ```sh
   PORT=3000
   ```

7. Start the app:

   ```sh
   npm start
   ```
