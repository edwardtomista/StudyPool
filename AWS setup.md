# How to Run on AWS

### 1 RDS (MySQL)

#### 1-1
First create an AWS account.
Click the flow link and create an account. If you have the account, log in. After that, go to the Console.
[Link](https://aws.amazon.com/pm/ec2/?trk=36c6da98-7b20-48fa-8225-4784bced9843&sc_channel=ps&s_kwcid=AL!4422!3!467723097970!e!!g!!aws%20ec2&ef_id=Cj0KCQiA4aacBhCUARIsAI55maHOrqfW6BBu_QZzs6-emws7N15PfnxhrZgQDgbYoSY44dAgPl7siNUaArqWEALw_wcB:G:s&s_kwcid=AL!4422!3!467723097970!e!!g!!aws%20ec2)

#### 1-2
Search "RDS" on the search bar and click the RDS.
![F7BBB334-2750-467C-941C-E4E47D24FA35](https://user-images.githubusercontent.com/75586376/205373482-1f9c7d81-3a9e-4222-b6ad-cc21a8e52b4c.png)

#### 1-3
Click "create database".
![F8C6D5B1-F985-4ED6-8680-5DFDA96EFA28](https://user-images.githubusercontent.com/75586376/205373742-65c61afe-cb0a-4ac7-a61e-886de5bc9e05.png)

Create the database with MySQL engine. Click the MySQL on the engine section. After that, fill the information on "Settings". Below figure shows the information of DB of this project. The password is "password".
![5D7C548A-795B-4FC1-831B-8C78E881631D](https://user-images.githubusercontent.com/75586376/205374327-36752b20-0ad0-45ad-ad0a-0a9c610c2f08.png)

When you finish the setup, click "create database".

#### 1-4
If you create the database successfully, you can see the endpoint and port number. The endpoint and port number are used to communicate with the Backend of the project. So, please switch the host on the server.js where is on the Backend folder of the project to the new endpoint.
![75FBB699-0C85-49A4-A011-98E24241656A](https://user-images.githubusercontent.com/75586376/205376385-0ca1aeb0-adef-4b46-a18a-4403e76fcaa5.png)

### 2 AWS EC2

#### 2-1
Go to the Console.

#### 2-2
Search "EC2" on the search bar and click the EC2.
![78588D33-CCC0-4083-B8A6-DC4C5247252C](https://user-images.githubusercontent.com/75586376/205371423-dc1282b6-a16e-4445-9a9c-58b50b30409a.png)

#### 2-3
Click "Launch instance" button.
![19827706-F973-4E4B-95EC-C53D93791C18](https://user-images.githubusercontent.com/75586376/205371652-20fcb610-eb15-49e7-8bea-c7e5d2ef2d3f.png)

#### 2-4
Choose one of the AMI (Amazon machine image) which include the software configuration to run the OS.
In this project, we chose Linux.
![812CCDC7-C7B9-47D9-9500-01EC241FCE06](https://user-images.githubusercontent.com/75586376/205372911-b045d6e0-ac4a-4e77-bc0c-70664b1378a4.png)

#### 2-5
To connect securely to the instance, you make a key pair. The key pair type is RSA and format is .pem.
![381505C8-2AB7-46A3-A9CA-2882E3947DA9](https://user-images.githubusercontent.com/75586376/205376968-17371818-9799-4c1d-bb6d-8d188cc63bd8.png)

Change permission on the private key (.pem) using commend: $ chod 400 private key

### 2-6
When you create the instance, the instance gives the public DNS. 

Enter the terminal. Then, connect the instance using SSH. 
  ssh -i "path of the private key" ec2-user@"instance public DNS"

### 2-7
Install node, git, yarn in the instance.
  $ sudo su
  $ curl -o- -L https://yarnpkg.com/install.sh | bash
  $ source ~/.bashrc
  $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  $ . ~/.nvm/nvm.sh
  $ nvm install node
  $ node -e "console.log('Running Node.js ' + process.version)"
    if node is not working, using "$ nvm install 16" instead "$ nvm install node"

### 2-8
Clone the git.
  $ git clone https://github.com/edwardtomista/StudyPool.git


### 3 Nginx + React

#### 3-1
Install Nginx.
  $ sudo yum install nginx // Amazon Linux 1 
  $ sudo amazon-linux-extras install nginx1.12 // Amazon Linux 2 

### 3-2
Change the back_end url on the links.js where is on Frontend folder of the project into the public DNS.

Go to the Frontend folder then build the react.
  $ npm install
  $ npm run build

### 3-3
Open the file "nginx.conf".
  $ sudo vi /etc/nginx/nginx.conf
  
Modify the file. 
'''
  ...
  
  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*.conf; # add the code.

  # server {
  #    listen       80 default_server;
  #    listen       [::]:80 default_server;
  #    server_name  _;
  #    root         /usr/share/nginx/html;
    # Load configuration files for the default server block.
  #    include /etc/nginx/default.d/*.conf;
  #    location / {
  #    }
  #    error_page 404 /404.html;
  #        location = /40x.html {
  #    }
  #    error_page 500 502 503 504 /50x.html;
  #        location = /50x.html {
  #    }
  # }

  ...
'''

Set "sites-available" and "sites-enabled".
  $ sudo mkdir /etc/nginx/sites-available
  $ sudo mkdir /etc/nginx/sites-enabled
  $ sudo vi /etc/nginx/sites-available/myapp.conf

In the myapp.conf, add the code.
'''
  server {
    listen 80;
    location / {
      root /home/ec2-user/StudyPool/Frontend/build;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
    location /api/ {
      proxy_pass http://35.89.201.78/api/;
    }
  }
'''

Copy the myapp.conf and paste it into sites-enabled.
  $ sudo ln -s /etc/nginx/sites-available/#######.conf /etc/nginx/sites-enabled/#######.conf
  $ sudo nginx -t
If the successful test message is out, the Nginx is working.

Run the Nginx.
  $ sudo systemctl start nginx
If it is not working, use the command:
  $ chmod 711 /home/ec2-user


### 4 Run server using pm2

#### 4-1
Go to the Backend folder then install node and pm2.
  $ npm install
  $ npm install -g pm2

#### 4-2
Run the pm2 the backend server.
  $ pm2 start node server.js

