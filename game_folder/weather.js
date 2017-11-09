class Weather {

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

}

export default Weather;
