/*
 * Project Title: Dangerous Gas Detection
 * Author: Samarth Gupta
 * Started Date: 6/7/18
 * Version: 1.0
 */
/////////////////////////////////////////////////////////////////////////
// Including the libraries
#include <dht11.h>

#define dhtPin A0
#define pirPin 7

dht11 DHT;

void setup() {

  Serial.begin(9600);
  delay(1000);
  pinMode(pirPin,INPUT);

}

void loop() {

    DHT.read(dhtPin);
    boolean pir = digitalRead(pirPin);

    String json = String("{\"pir\":\"") + String(pir) + String("\",\"temp\":\"") + String(DHT.temperature) + String("\",\"humidity\":\"") + String(DHT.humidity) + String("\"}");
    Serial.println(json);
    
    delay(1000);//Wait 10 sec before accessing sensor again.
}
