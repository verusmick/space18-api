Space apps 2018 - API
==================
Installing Node.js
------------------
We recommend installing the latest version of node.

Checking node is installed and working
--------------------------------------
Once you have node.js installed on your system you should be able to go to your command line and type
+ npm --version

and see something like this
+ $ npm --version

Install node modules
--------------------
Run the following command from the root of your source files to install the node modules listed in packages.json
+ npm install

Execute the app
--------------------------
henLoad http://localhost:3000/ in your browser to access the app.

In Windows
+ set DEBUG=sm-api:* & npm start

In MacOS o Linux
+ DEBUG=sm-api:* npm start