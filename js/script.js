"use strict";

//declare global vars here
var divGlobalData, divCountriesImages, divCountryData, divChartsNew, divChartsTotal;
var cnvNewCovidChart, cnvTotalCovidChart;
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