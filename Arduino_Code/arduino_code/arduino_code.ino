/*
 * Demo for Havells
 * Author: Samarth Gupta
 * Started Date: 21/6/19
 * Version: 1.0
 */
/////////////////////////////////////////////////////////////////////////
// Including the libraries
#include <dht11.h>

// defining the hardware pins
#define dhtPin A0
#define pirPin 7

//creating object for DHT sensor
dht11 DHT;

void setup() {
  //serial communication at 9600 baud rate
  Serial.begin(9600);
  
  //setting pir sensor as INPUT
  pinMode(pirPin,INPUT);

}

void loop() {
    //reading pin values 
    DHT.read(dhtPin);
    boolean pir = digitalRead(pirPin);
    
    //creating JSON string to send to fog device
    String json = String("{\"pir\":\"") + String(pir) + String("\",\"temp\":\"") + String(DHT.temperature) + String("\",\"humidity\":\"") + String(DHT.humidity) + String("\"}");
    //writing data on serial bus
    Serial.println(json);
    
    delay(5000);//Wait 5 sec before accessing sensor again.
}
