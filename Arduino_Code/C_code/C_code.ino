
int pir = 7;

void setup() {
  // put your setup code here, to run once:
  pinMode(pir,OUTPUT);
  Serial.begin(9600);
  

}

void loop() {
  // put your main code here, to run repeatedly:
  boolean a = digitalRead(pir);
  Serial.println(a);
  delay(1000);
  
  
}
