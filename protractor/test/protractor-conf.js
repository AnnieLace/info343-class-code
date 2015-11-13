exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'],
    //whatever selector will select the element with ng-app attached
    //(if ng-app is not on body this definitely needs to be included)
    rootElement: 'body'
    //need python -m SimpleHTTPServer running in terminal in another tab
    //as well as webdriver-manager start running in terminal tab
    //in regular terminal tab write protractor test/protractor-conf.js
    //further instructions also in class code protractor read me file
};
