var urljoin = require('url-join');
var CommandFactory = require('hystrixjs').commandFactory;
var request = require('request-promise-native').defaults({json: true});
var projectsServer = (process.env.PROJECTS_URL || 'fis2018-02.herokuapp.com');
var projectsKey = (process.env.PROJECTS_APIKEY || '11165da8-c45d-4cb3-95c4-6fa13939f7a5');

function projectsResource(url) {
    return urljoin(projectsServer, url, '?apikey='+projectsKey);
}


function getAllProjectsBase() {
    var url = projectsResource("/proyect");
    console.log(url);
    return request.get(url);
}

var getAllProjectsCommand = CommandFactory.getOrCreate("Get Projects")
    .run(getAllProjectsBase)
    .timeout(100)
    .build()

function getAllProjects() {
    return getAllProjectsCommand.execute();
}

module.exports = {
    getAllProjects
}