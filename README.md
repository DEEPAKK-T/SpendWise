# SpendWise Backend Application
This is an Backend Applications which helps us to track daily expenses of endusers

# Setup
Install node.js [Node.js Installation](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)<br />
Create .env file in Project's root directory to store sensitive information such as Secret key, Application Port and so on. Refer .env.example file<br />
set sequelize.sync force to false to avoid DB loss in Production<br />

# `npm start`
Start's the application in development mode

# Deployment on Amazon EC2 Instance

Step 1 : Login as root and install nvm

sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

Step 2 : Activate nvm

. ~/.nvm/nvm.sh

Step 3 : Install latest node using nvm

nvm install node

Step 4 : Verify node and npm installations

node -v
npm -v

Step 5 : Install git and clone repository from GitHub

sudo yum update -y
sudo yum install git -y

Step 6 : Verify git installation

git --version

Step 7 : Clone the repository

git clone https://github.com/DEEPAKK-T/SpendWise.git

Step 8 : Install required dependendices and create .env file(refer setup section)

npm install

# TODO
JWT Refresh token implementation<br />
Enhance router/http layer to express<br />
Create test scripts<br />
