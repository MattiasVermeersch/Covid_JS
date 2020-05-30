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
    BindHtml();
    FillSelectMenu();
    FillImages();
    AddEvents();
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
    let flagImages = document.querySelectorAll("img");
    flagImages.forEach(flag => {
        flag.addEventListener('click', ChangeSelectMenu);
    });
    slcCountry.addEventListener('change', LoadCovidInfo);
}

function ResetUI() {
    divCountryData.innerHTML = "";
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
/**
 * fills html with country flags
 */
function FillImages() {
    tblImages = document.createElement("table");
    tblImages.setAttribute('class', 'flagTable');
    let tableRow = "<tr>";
    for(let index in data.Countries){
        let path = `img/countries/${data.Countries[index].CountryCode}.png`;
        tableRow += `<td><img id='${index}' src=${path} height='150' width='250'></td>`;
    }
    tableRow += "</tr>";
    tblImages.innerHTML = tableRow;
    divCountriesImages.append(tblImages);
}


function ChangeSelectMenu() {
    slcCountry.selectedIndex = this.id;
    LoadCovidInfo();
}


function LoadCovidInfo() {
    ResetUI();
    FillParagraphInfo();
    FillTableInfo();
}

/**
 * create a paragraph with date info
 */
function FillParagraphInfo() {
    let paragraph = document.createElement('h1');
    let countryIndex = slcCountry.selectedIndex;
    let info = data.Countries[countryIndex];
    let date = new Date(info.Date);
    date = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
    let content = `${info.Country}: Situation on ${date} <br>`;
    paragraph.innerHTML = content;
    divCountryData.append(paragraph);
}


function FillTableInfo() {
    //get the info
    let index = slcCountry.selectedIndex;
    let info = data.Countries[index];

    let newTable = document.createElement('table');
    newTable.setAttribute('class', 'infoTable');

    //create header of the table: static
    let header = "<tr>";
    header += "<th>New Confirmed</th>";
    header += "<th>New deaths</th>";
    header += "<th>Total confirmed</th>";
    header += "<th>Total deaths</th>";
    header += "<th>New recovered</th>";
    header += "<th>Total recovered</th>";
    header += "</tr>";

    //create row with info from data
    let row = "<tr>";
    row += `<td>${info.NewConfirmed}</td>`;
    row += `<td>${info.NewDeaths}</td>`;
    row += `<td>${info.TotalConfirmed}</td>`;
    row += `<td>${info.TotalDeaths}</td>`;
    row += `<td>${info.NewRecovered}</td>`;
    row += `<td>${info.TotalRecovered}</td>`;
    row += "</tr>";

    newTable.innerHTML = header + row;

    divCountryData.append(newTable);
}

