

class BusinessDay {
  constructor(resources){
    this.resources = resources;
    this.price = 0.25;
    this.lemonsPerPitcher = 4;
    this.sugarPerPitcher = 4;
    this.cupsSold = 0;
    this.sales = 0.00;
    this.weatherToday = this.weather();
  }

  start(){
    //render weather
    //allow player to buy resources at store
    //allow player to set recipe
    //player finalizes and presses start
    //lock resource store
    //simulate day
    //render animation
    //end day, print results
  }

  weather(){
    const maxTemp = 100;
    const minTemp = 50;
    let temperature = Math.floor(Math.random() * (maxTemp - minTemp) + minTemp);
    let outlookQuotient = Math.floor(Math.random() * 4);
    let outlook;
    if (outlookQuotient == 0 || outlookQuotient == 1){
      outlook = "Sunny";
    } else if (outlookQuotient == 2){
      outlook = "Overcast";
    } else {
      outlook = "Rainy";
    }

    return {
      temperature: temperature,
      outlook: outlook
    };
  }

  potentialCustomers(){
    const weatherObject = this.weatherToday;

    const outlookQuotients = {
      "Sunny": 150,
      "Overcast": 110,
      "Rainy": 75
    };
    let outlookScore;
    const tempScore = weatherObject.temperature;

    if (weatherObject.outlook == "Sunny"){
      outlookScore = Math.floor(Math.random() * outlookQuotients.Sunny);
    } else if (weatherObject.outlook == "Overcast"){
      outlookScore = Math.floor(Math.random() * outlookQuotients.Overcast);
    } else {
      outlookScore = Math.floor(Math.random() * outlookQuotients.Overcast);
    }

    const potentialVisitors = tempScore + outlookScore;
    return potentialVisitors;
  }

  purchaseOrNot(){
    let likelihood = 100;

    const weatherDecrement = this.weatherPurchaseCalculus();
    likelihood -= weatherDecrement;



    if (likelihood >= 50){
      return true;
    } else {
      return false;
    }
  }

  pricePurchaseCalculus(){
    const price = this.price;

    // const equilibriumPrice =
    // let priceDecrement = price * 10;

  }

  weatherPurchaseCalculus(){
    const weatherObject = this.weatherToday;
    const outlookQuotients = {
      "Sunny": 0,
      "Overcast": 15,
      "Rainy": 30
    };

    let outlookDecrement = outlookQuotients[weatherObject.outlook];
    outlookDecrement *= Math.floor(Math.random() * outlookDecrement);

    const tempConstant = 0.25;
    const maxTemp = 100;
    const actualTemp = weatherObject.temperature;
    const temperatureDecrement = (maxTemp - actualTemp) * (tempConstant);

    return (outlookDecrement + temperatureDecrement);
  }
}
