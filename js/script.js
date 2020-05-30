"use strict";

//declare global vars here
var divGlobalData, divCountriesImages, divCountryData;
var slcCountry;
var tblImages;
//wait for document load
window.addEventListener('load',Initialize);

function Initialize()
{
    data = JSON.parse(data);
    console.log(data.Countries);
    //covid file: variable = data
    //two layers => Global (), Countries (Array)

    BindHtml();
    FillSelectMenu();
    FillImages();
}

/**
 * binds html elements to js file
 */
function BindHtml() {
    divGlobalData = document.querySelector("#divGlobalData");
    divCountriesImages = document.querySelector("#divCountriesImages");
    divCountryData = document.querySelector("#divCountryData");
    slcCountry = document.querySelector("#slcCountry");
}

/**
 * add events to images and select menu
 */
function AddEvents() {
    images = document.querySelectorAll("img");
}

/**
 * fill slc menu 
 */
function FillSelectMenu() {
    for(let index in data.Countries){
        slcCountry.options.add(
            new Option(data.Countries[index].Country, index)
        );
    }
}

function FillImages() {
    tblImages = document.createElement("table");
    tblImages.setAttribute('class', '');
    let tableRow = "<tr>";
    for(let index in data.Countries){
        let path = `img/countries/${data.Countries[index].CountryCode}.png`;
        tableRow += `<td><img id='${index}' src=${path} height='150' width='250'></td>`;
    }
    tableRow += "</tr>";
    tblImages.innerHTML = tableRow;
    divCountriesImages.append(tblImages);
}





