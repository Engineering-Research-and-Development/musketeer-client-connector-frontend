# NgxMusketeerClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Starting the application

Once downloaded, run `npm i` to download all the project's dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<!-- 
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
-->

## Docker prerequisites and installation

In order to run the application through a Docker container, a Docker installation is required in the host.
The Docker Daemon must be running to perform the following commands.

To enable the direct download of the Docker images created for the Muskeeter's end users,
you should log in to our registry using the following commands:

* `docker login gitlab.alidalab.it:5000/musketeer/ngx-musketeer-client`
user and password: contact musketeer-team@eng.it

As a first step to create the Docker image build the project to create the 'dist' directory. Then, from the project root, run the following command through the terminal:  

    docker build -f Dockerfile -t MYBUILDIMAGE 
    
Refer to the project on 'https://github.com/Engineering-Research-and-Development/musketeer-client-connector-backend' to run this frontend component that is coupled to the related backend component.
Once it is done, the local server will be running at '127.0.0.1:5000', whilst you can use the User Interface by opening a browser and writing the following URL: '127.0.0.1:4500' (or 'localhost:4500'). 
