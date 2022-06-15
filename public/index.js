async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let {GME, MSFT, DIS, BNTX} = mockData
    let stocks = [GME, MSFT, DIS, BNTX]
    
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    function getHigh(stock){
        let high = 0
        for (let i = 0; i < stock.length; i ++){
            if (stock[i] > high){
                high = stock[i]
            }
        }
        console.log(stock)
        console.log(high)
        return high
    }
    
    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(data => data.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => getHigh(stock.values.map(value => parseInt(value.high)))),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol))
            }]
        }
    })
}

main()