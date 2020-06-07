"use strict";

//declare global vars here
var divGlobalData, divCountriesImages, divCountryData;
var slcCountry;
var tblImages;
//wait for document load
window.addEventListener('load',Initialize);

//misschien in de lijst optie toevoegen 'Alle landen'

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
    let counter = 1;
    for(let index in data.Countries){
        slcCountry.options.add(
            new Option(data.Countries[index].Country, index)
        );
        counter ++;
    }
    slcCountry.options.add(new Option('Alle landen', counter));
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

/**
 * changes selected item when country flag is clicked
 */
function ChangeSelectMenu() {
    slcCountry.selectedIndex = this.id;
    LoadCovidInfo();
}

/**
 * loads covid info from data
 */
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
    let info, content, date;

    if(countryIndex == (slcCountry.length - 1)) {
        info = data.Countries[0];
        date = new Date(info.Date);
        date = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        content = `All countries: Situation on ${date} <br>`;
    }
    else {
        info = data.Countries[countryIndex];
        date = new Date(info.Date);
        date = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`
        content = `${info.Country}: Situation on ${date} <br>`;
    }
    
    paragraph.innerHTML = content;
    divCountryData.append(paragraph);
}

/**
 * creates table with info of clicked country
 */
function FillTableInfo() {
    //get the info
    let header = "";
    let row = "";

    let newTable = document.createElement('table');
    newTable.setAttribute('class', 'infoTable');

    //create row with info from data
    let info;
    if(slcCountry.selectedIndex == (slcCountry.length - 1)) {
        //create header of the table: static
        header += "<tr>";
        header += "<th>Country</th>";
        header += "<th>New Confirmed</th>";
        header += "<th>New deaths</th>";
        header += "<th>Total confirmed</th>";
        header += "<th>Total deaths</th>";
        header += "<th>New recovered</th>";
        header += "<th>Total recovered</th>";
        header += "</tr>";

        for(let i = 0; i < slcCountry.length-1; i++) {
            info = data.Countries[i];
            console.log(data.Countries[i]);

            row += "<tr>";
            row += `<td>${info.Country}</td>`;
            row += `<td>${info.NewConfirmed}</td>`;
            row += `<td>${info.NewDeaths}</td>`;
            row += `<td>${info.TotalConfirmed}</td>`;
            row += `<td>${info.TotalDeaths}</td>`;
            row += `<td>${info.NewRecovered}</td>`;
            row += `<td>${info.TotalRecovered}</td>`;
            row += "</tr>";
        }
    }

    else {
        //create header of the table: static
        header += "<tr>";
        header += "<th>New Confirmed</th>";
        header += "<th>New deaths</th>";
        header += "<th>Total confirmed</th>";
        header += "<th>Total deaths</th>";
        header += "<th>New recovered</th>";
        header += "<th>Total recovered</th>";
        header += "</tr>";

        let index = slcCountry.selectedIndex;
        info = data.Countries[index];

        row += "<tr>";
        row += `<td>${info.NewConfirmed}</td>`;
        row += `<td>${info.NewDeaths}</td>`;
        row += `<td>${info.TotalConfirmed}</td>`;
        row += `<td>${info.TotalDeaths}</td>`;
        row += `<td>${info.NewRecovered}</td>`;
        row += `<td>${info.TotalRecovered}</td>`;
        row += "</tr>";
    }
    

    newTable.innerHTML = header + row;

    divCountryData.append(newTable);
}

