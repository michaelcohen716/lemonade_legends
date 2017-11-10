

class BusinessDay {
  constructor(resources){
    this.resources = resources;
    this.price = 0.25;
    this.lemonsPerPitcher = 4;
    this.sugarPerPitcher = 4;
    this.iceCubes = 4;
    this.cupsSold = 0;
    this.sales = 0.00;
    // this.weatherToday = this.weather();
    // this.potentialCustomers = this.potentialCustomers();
    this.start();
    //^ this needs to return an object with the day's info to game class
  }

  start(){
    //allow player to buy resources at store
    //allow player to set recipe
    //player finalizes and presses start
    //lock resource store
    //simulate day
    //render animation
    //end day, print results
  }

  updateInventory(resource, units, price){

  }

  
}

export default BusinessDay;
