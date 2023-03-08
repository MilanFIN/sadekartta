import requests
import xml.etree.ElementTree as ET
import time
import sys

"""
this url:
https://www.ilmatieteenlaitos.fi/havaintoasemat
defines stations, which collect weather data. However filtering stations based on "Rain" removes some stations which actually do
collect rain data. Also it leaves some stations which do not.

This script polls the opendata -api for each station's fmisid and checks if they have recently produced valid rain data.




"""
bannedWords = ["sää", "sade", "ilmanlaatu"]
bannedCharacters = ["(", ")", ",", ".", ]


def hasNumbers(string):
    return all(char.isdigit() for char in string)

def hasBannedCharacters(string):
	return any(char in bannedCharacters for char in string)



validWords = []

with open('raw.txt') as f:
	lines = f.readlines()
	for line in lines:
		words = line.split()
		for word in words:
			word = word.lower()
			if (hasNumbers(word)):
				if (len(word) == 6):
					validWords.append(word)
				"""
				if (word not in bannedWords):
					if (not (hasBannedCharacters(word))):
						if (word not in validWords):
							validWords.append(word)
				"""


#sys.exit(0)

iteration = 0
validPositions = []


for word in validWords:


	# The API endpoint
	#url = "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple&place="+word+"&starttime=2023-01-01T00:00:00Z&endtime=2023-02-22T00:00:00Z&"
	url = "https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::daily::simple&fmisid="+word+"&starttime=2023-01-01T00:00:00Z&endtime=2023-02-22T00:00:00Z&"
	# A GET request to the API
	response = requests.get(url)

	responseString = str(response.content)
	#print(responseString)


	position = ""

	for item in responseString.split("</gml:pos>"):
		if "<gml:pos>" in item:
			position = item[item.find("<gml:pos>" ) + len("<gml:pos>"):]
			break


	if (position != ""):
		parameterNames = []
		parameterValues = []
		validValues = []
		for item in responseString.split("</BsWfs:ParameterName>"):
			if "<BsWfs:ParameterName>" in item:
				parameterNames.append(item[item.find("<BsWfs:ParameterName>" ) + len("<BsWfs:ParameterName>"):])
		for item in responseString.split("</BsWfs:ParameterValue>"):
			if "<BsWfs:ParameterValue>" in item:
				parameterValues.append(item[item.find("<BsWfs:ParameterValue>" ) + len("<BsWfs:ParameterValue>"):])
		for i in range(len(parameterNames)):
			if (parameterNames[i] == "rrday"):
				value = parameterValues[i]
				if (value != "NaN"):
					value = float(value)
					if (value >= 0.0):
						validValues.append(value)

		if (len(validValues) != 0):
			validPositions.append(position)
			with open('fmisid.txt', 'a') as the_file:
				the_file.write('"' + word + '",\n')# + ", " + position + "\n")


	print(str(iteration+1) + " / " + str(len(validWords)) + ", valid: " + str(len(validPositions)))

	iteration += 1
	time.sleep(1)



