TO use this application in your local host follow these steps:-

Install NodeJs in Your system ' https://nodejs.org/en/download ' 1.a Check if node has installed in your system or not by writing the comand in your terminal ' node -v '

Then install any one of the dependecie like ' npm install ' or ' yarn install ' to start the development server
2.a Check if the dependecie has installed in your system or not by writing the comand in your terminal ' npm -v ' or 'yarn -v ' 2.b This will add the package.json file in your system

Go to the root folder of the project and open the cmd in that folder so that there is no problem occur during the path configuration. And type the command in the cmd ' npm start ' if you have install npm dependencie or type ' yarn start ' if you have install yarn dependencie.
3. Go to the firebase website ' https://console.firebase.google.com/ ' 
click on add project->projectname->continue(2X)->Configure Google Analytics->select account->create project
->continue->go to settings->projectsetting->at the bottom click on ' </> '  icon->Register app->app name->click on Register app
->copy the the code given in  initialize Firebase and begin using the SDKs for the products you'd like to use. [Please note copy only firebaseConfig object and paste it into another fle and export it into file of firebase present in firebase folder] ->  click on build -> authentication->getStart->Additional providers->google->enable it-> fill Project support email->save. 
Your App is ready 
The project will run in your localhost:3000 port no.