/**
 * FUNCTIONS
 */

 /**
 * binds html elements to js file
 */
function BindHtml() {
    divGlobalData = document.querySelector("#divGlobalData");
    divCountriesImages = document.querySelector("#divCountriesImages");
    divCountryData = document.querySelector("#divCountryData");
    divChartsNew = document.querySelector("#divChartsNew");
    divChartsTotal = document.querySelector("#divChartsTotal");
    cnvNewCovidChart = document.querySelector("#cnvNewCovidChart");
    cnvTotalCovidChart = document.querySelector("#cnvTotalCovidChart");
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
    slcCountry.options.add(new Option('Global', slcCountry.length));
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
    CreateChart();
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
        content = `Global: Situation on ${date} <br>`;
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
    let header = "";
    let row = "";
    let select = slcCountry[slcCountry.selectedIndex].text;

    let newTable = document.createElement('table');
    newTable.setAttribute('class', 'infoTable');

    //create row with info from data
    let info;
    if(select == 'Global') {
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

        //create Global row
        let global = data[select];
        row += "<tr>";
        row += `<td>Global</td>`;
        row += `<td>${global.NewConfirmed}</td>`;
        row += `<td>${global.NewDeaths}</td>`;
        row += `<td>${global.TotalConfirmed}</td>`;
        row += `<td>${global.TotalDeaths}</td>`;
        row += `<td>${global.NewRecovered}</td>`;
        row += `<td>${global.TotalRecovered}</td>`;
        row += "</tr>";
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

/**
 * function to delete existing canvas elements and add new
 */
function DeleteCanvasCreateNewCanvas() {
    document.querySelector("#cnvNewCovidChart").remove();
    document.querySelector("#cnvTotalCovidChart").remove();

    let newCanvas = document.createElement('canvas');
    newCanvas.id = "cnvNewCovidChart";
    divChartsNew.append(newCanvas);

    newCanvas = document.createElement('canvas');
    newCanvas.id = "cnvTotalCovidChart";
    divChartsTotal.append(newCanvas);
}

/**
 * function that creates chart instances for new and total
 * @param {*} dataset1 
 * @param {*} dataset2 
 */
function PaintChart(dataset1, dataset2) {
    let canvas = document.querySelector("#cnvNewCovidChart");
    let myChart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ['New confirmed', 'New deaths', 'New recovered'],
        datasets: [{
            label: 'New cases',
            data: dataset1,
            backgroundColor: [
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(75, 255, 75, 0.7)'
            ],
            borderColor: [
                'orange',
                'red',
                'green'
            ],
            borderWidth: 1
        }],
    },
    options: {}
    });

    canvas = document.querySelector("#cnvTotalCovidChart");
    myChart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ['Total confirmed', 'Total deaths', 'Total recovered'],
        datasets: [{
            label: 'Total cases',
            data: dataset2,
            backgroundColor: [
                'rgba(255, 206, 86, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(75, 255, 75, 0.7)'
            ],
            borderColor: [
                'orange',
                'red',
                'green'
            ],
            borderWidth: 1
        }],
    },
    options: {}
    });
}

/**
 * function to create charts of the covid info
 */
function CreateChart() {
    //Here i want to remove the canvas elements already in html so the charts dont get painted on top of each other.
    DeleteCanvasCreateNewCanvas();

    //determine which option was chosen in the select menu
    let index = slcCountry.selectedIndex;
    let dataSetNew = []; 
    let dataSetTotal = [];
    let info;

    if(index == slcCountry.length - 1){
        //'Global' was selected
        info = data.Global;

        dataSetNew = [
            parseInt(info.NewConfirmed), 
            parseInt(info.NewDeaths), 
            parseInt(info.NewRecovered)
        ];

        dataSetTotal = [
            parseInt(info.TotalConfirmed),
            parseInt(info.TotalDeaths),
            parseInt(info.TotalRecovered)
        ];
    }
    else {
        //Other option was selected
        info = data.Countries[index];

        dataSetNew = 
        [
            parseInt(info.NewConfirmed), 
            parseInt(info.NewDeaths), 
            parseInt(info.NewRecovered)
        ];

        dataSetTotal = 
        [
            parseInt(info.TotalConfirmed),
            parseInt(info.TotalDeaths),
            parseInt(info.TotalRecovered)
        ];
    }

    PaintChart(dataSetNew, dataSetTotal);    
}