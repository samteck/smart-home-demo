######################
#Project Title : FOG computing code for Havells Demo
#Author        : Samarth Gupta
#Date          : 21/6/2019
#Version       : 1.0


import serial     #serial module to read data on serial bus
import requests   #request module to send request on cloud
import json       #to parse and dump json string
import time       #to wait for some time before sending the request
import RPi.GPIO as IO #to communicate via GPIO pins for speaker

# setting mode for GPIO pins and disabling intial GPIO warnings
IO.setwarnings(False)
IO.setmode(IO.BCM)

# setting up a speaker for output on pin number 3 of GPIO
speaker = 3
IO.setup(speaker,IO.OUT)

# opening serial port on ACM0 for reading serial data at 9600 baud rate
ser = serial.Serial('/dev/ttyACM0', 9600)

# url for sending request on server
url = 'https://sam.requestcatcher.com/test'

# code below will read data from serial, extract each sensor value, do local fog computing
# then form a JSON string with room information, and send the request to server
while 1:
    if(ser.in_waiting >0):
        try:
            line = (ser.readline().decode().strip())
            #print ("Arduino input    : " + str(line))
            json_data = json.loads(line)
            pir = json_data["pir"]
            temp = json_data["temp"]
            humidity = json_data["humidity"]

            ##local fog computing code to start buzzer on intruision
            if (pir == str(0)):
                IO.output(speaker,IO.HIGH)
                print("###### ALERT : Intruision Detected #######")
            else:
                IO.output(speaker,IO.LOW)
         
            data = {}
            data["Room"] = "room1"
            data["P"]=str(pir)
            data["T"]=str(temp)
            data["H"]=str(humidity)
            json_final = json.dumps(data)
            print (json_final)   
        except:
            print("fail to read")
        
        try:
            headers = {'Content-type': 'application/json'}
            response = requests.post(url, data=json_final, headers=headers)
            print('Response Code : ' + str(response.status_code))
        except:
            print("Server is busy!!!!!")