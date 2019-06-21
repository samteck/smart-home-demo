import serial 
import requests
import json
import time
import RPi.GPIO as IO

IO.setwarnings(False)
IO.setmode(IO.BCM)
speaker = 3
IO.setup(speaker,IO.OUT)


ser = serial.Serial('/dev/ttyACM0', 9600)
url = 'https://sam.requestcatcher.com/test'


while 1:
    if(ser.in_waiting >0):
        try:
            line = (ser.readline().decode().strip())
            #print ("Arduino input    : " + str(line))
            json_data = json.loads(line)
            pir = json_data["pir"]
            temp = json_data["temp"]
            humidity = json_data["humidity"]

            ##add fog computing code
            if (pir == str(0)):
                IO.output(speaker,IO.HIGH)
            else:
                IO.output(speaker,IO.LOW)
         
            data = {}
            data["Room"] = "room1"
            data["P"]=str(pir)
            data["T"]=str(temp)
            data["H"]=str(humidity)
            json_final = json.dumps(data)
            print (json_final)
        
            headers = {'Content-type': 'application/json'}
            response = requests.post(url, data=json_final, headers=headers)
            print('Response Code : ' + str(response.status_code))

        except:
            print("fail to read")


