'use strict';




function getRepositories(username) {
    $('.js-results').empty();
    console.log("In the Create URL function");
    const url = "https://api.github.com/search/repositories";
    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json"
        })
    };
    const params = {
        q: `user:${username}`
    };
    const queryString = formatQueryParameters(params);

    const getURL = url + '?' + queryString;
    //console.log(getURL);

    fetch(getURL, options)
    .then(response => {
        if(response.ok)
        {response.json()}
        else {
            throw new Error(response.statusText);
        }})
    .then(responseJson => displayResults(responseJson))
    .catch(err => console.log(err));

}

function displayResults(responseJson){
    console.log("in the displayResults function");
    console.log(responseJson.items);
    for (let i=0; i<responseJson.items.length; i++){
        //console.log(responseJson.items[i].url);
        let result = `<p>Repository Name: ${responseJson.items[i].name}<p>
        <a href="${responseJson.items[i].url}" alt="Repository URL">${responseJson.items[i].url}</a>`;
        console.log(result);
        $('.js-results').append(result);
    }
}



function formatQueryParameters(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}



function watchForm(){
    console.log("In the watchForm App");
    $('form').submit(function(){
        let username = $('input').val();
        console.log(username);
        getRepositories(username);
        event.preventDefault();
    });
}




$(function(){
console.log("App has loaded");
watchForm();
});
//search for users
//https://api.github.com/search/users?Accept=application/vnd.github.v3+json&q=dawn


//https://api.github.com/search/repositories?q=user:dmac1108