

class BusinessDay {
  constructor(resources){
    this.resources = resources;
    this.price = 0.25;
    this.lemonsPerPitcher = 4;
    this.sugarPerPitcher = 4;
    this.iceCubes = 4;
    this.cupsSold = 0;
    this.sales = 0.00;
    this.weatherToday = this.weather();
    this.potentialCustomers = this.potentialCustomers();
    this.start();
    //^ this needs to return an object with the day's info to game class
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

  simulateDay(){
    for (var i = 0; i < this.potentialCustomers; i++) {
      if(this.purchaseOrNot()){
        this.cupsSold ++;
        this.sales += this.price;
        this.updateInventory();
        //^need to write this
      }
    }
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
    //either a neutral or a decrement

    const ingredientsFactor = this.ingredientsPurchaseCalculus();
    likelihood += ingredientsFactor;
    //could be positive or negative

    const priceFactor = this.pricePurchaseCalculus();
    likelihood += priceFactor;
    //could be positive or negative

    if (likelihood >= 50){
      return true;
    } else {
      return false;
    }
  }

  ingredientsPurchaseCalculus(){
    const weatherObject = this.weatherToday;

    const iceCubes = this.iceCubes;
    const iceCubeEquilibrium = weatherObject.temperature / 20;
    const iceQuotient = (iceCubes - iceCubeEquilibrium) * 10;

    const lemons = this.lemonsPerPitcher;
    const lemonEquilibrium = 4;
    const lemonQuotient = (lemons - lemonEquilibrium) * 5;

    const sugar = this.sugarPerPitcher;
    const sugarEquilibrium = 4;
    const sugarQuotient = (sugar - sugarEquilibrium) * 5;

    return (iceQuotient + lemonQuotient + sugarQuotient);
  }


  pricePurchaseCalculus(){
    const price = this.price;

    const equilibriumPrice = 0.25;
    const priceQuotient = (equilibriumPrice - price) * 10;
    return priceQuotient;
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

export default BusinessDay;
