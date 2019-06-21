import serial
import requests
import json
import time


ser = serial.Serial('/dev/ttyACM0', 9600)
url = 'https://webhook.site/0acfa087-ffda-4424-9b9c-994c54ac218d'


while 1:
	if(ser.in_waiting >0):
		line = (ser.readline().decode().strip())
		print ("Arduino input    : " + str(line))
		json_data = json.loads(line)
		print(json_data)



