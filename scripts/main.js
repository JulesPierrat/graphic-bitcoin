function getBitcoinData(){
    // Get promise
    var promises = [];
    var bitcoinValue = fetch("https://api.coindesk.com/v1/bpi/historical/close.json").then(a => a.json());
    var tautChange = fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json').then(a => a.json());
    promises = [bitcoinValue, tautChange];

    // When the request are done
    Promise.all(promises).then(r => {
        CreateGraphic(r[0].bpi, r[1].usd.eur);
    })

}

function CreateGraphic(json, change) {
    // Json to array
    var keys = Object.keys(json);
    var values = [];
    keys.forEach(k => {
        values.push(json[k]/change);
    });
    
    //Canvas
    var canvas = document.getElementById("myChart");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // graph

    const data = {
        labels: keys,
        datasets: [{
            label: 'Bitcoin values (EUR)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart (canvas, config);

}

getBitcoinData();