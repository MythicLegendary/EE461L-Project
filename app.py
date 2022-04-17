'''
    File: App.py
    Purpose: Flask Application Connecting React Frontend to Database Resources
    Authors: David, William
'''

from numpy import MAY_SHARE_BOUNDS
import Database
from flask import Flask, jsonify, redirect, url_for, request, render_template
import os
import json
import Datasets

# Change static_folder when not testing
app = Flask(__name__, static_folder='./build/', static_url_path='/')
# Global Database Object
db = Database.DatabaseImpl()
# Global Dataset access
Data = Datasets.Dataset() 
#verifies that the username and password are valid, retrieved from the request form. If successful returns 0.
@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
        return app.send_static_file('index.html')

# this function returns meta data corresponding to the number given
@app.route("/metadataRequest", methods = ["POST"])
def getMetadata():
    myrequest = request.get_json(force = True)
    datasetNum = -1
    try:
        datasetNum = int(myrequest['datasetNum'])
    except ValueError:
        return {'errorcode' : -1}
    # get the metadata dictionary from the dataset backend
    metadata = {}
    if datasetNum == 1:
        metadata = Data.getFirst()
        metadata['errorcode'] = 0
    elif datasetNum == 2:
        metadata = Data.getSecond()
        metadata['errorcode'] = 0
    elif datasetNum == 3:
        metadata = Data.getThird()
        metadata['errorcode'] = 0
    elif datasetNum == 4:
        metadata = Data.getFourth()
        metadata['errorcode'] = 0
    elif datasetNum == 5:
        metadata = Data.getFifth()
        metadata['errorcode'] = 0
    else:
        metadata['errorcode'] = -1
    print(metadata)
    return metadata
    

@app.route("/verifyuser", methods = ["POST"])
def verifyuser():
        myrequest = request.get_json(force=True)
        username = myrequest['userid']
        password = myrequest['password']
        if(db.validateUser(username, password) == 0):
            return {'valid' : True}
        else:
            return {'valid' : False}

# removes a user associated with the userid
@app.route("/removeuser", methods = ["POST"])
def removeuser():
    myrequest = request.get_json(force=True)
    username = myrequest['userid']
    if db.removeUser(username) == 0:
        return {'errorcode' : 0}
    else:
        return {'errorcode' : 0}

#creates a user with the userid and password given in the request form. If successful returns 0.
@app.route("/createuser", methods = ["POST"])
def createuser():
    myrequest = request.get_json(force=True)
    username = myrequest['userid']
    password = myrequest['password']
    
    verify = db.createUser(username, password)
        
    return {'errorcode': verify}
#creates a hardware set with the name and capacity given in the request form. If successful returns 0. 
@app.route("/createHWSet", methods = ["POST"])
def createhwset():
    myrequest = request.get_json(force=True)
    name = myrequest['name']
    try:
        capacity = int(myrequest['capacity'])
    except ValueError:
        return {'errorcode' : -1}
    verify = db.createHardwareSet(name, capacity)
        
    return {'errorcode': verify}
#requests resources from the hardware sets, taking a certain number from the hardware set named in the request form. If successful returns 0.
@app.route("/requestResources", methods = ["POST"])
def requestresource():
    myrequest = request.get_json(force=True)
    name = myrequest['name']
    try:
        resourcesToTake = int(myrequest['request'])
    except ValueError:
        return {'errorcode' : -1}
    verify = db.requestHardware(name, resourcesToTake)
    return {'errorcode': verify}
        
#return resources to hardware sets in the same way.    
@app.route("/returnResources", methods = ["POST"])
def returnresource():
    myrequest = request.get_json(force=True)
    name = myrequest['name']
    try:
        resourcesToReturn = int(myrequest['return'])
    except ValueError:
        return {'errorcode' : -1}
    verify = db.returnHardware(name, resourcesToReturn)
    return {'errorcode': verify}

# Remove a hardware set
@app.route("/removeHWSet", methods = ["POST"])
def removehwset():
    myrequest = request.get_json(force=True)
    name = myrequest['name']
    verify = db.removeHardware(name)
    return {'errorcode' : verify}

# At this URL, flask will pass a list containing dictionaries with all current hardware sets names, availability, and capacity. This url can therefore be used to have a 
# dynamically updating page with the hardware on it. This list is jsonified when returned.
@app.route("/hardwarelist", methods = ["GET"])
def hardware():
    return json.dumps(db.hardwareSetList())

    
# Returns a specific hardware set as jsonified, with an input being its name.    
@app.route("/getHardwareSet", methods = ["POST"])
def gethardwareset():
    myrequest = request.get_json(force=True)
    name = myrequest['name']
    hardwareSet = db.getHardwareSet(name)
    if hardwareSet == None:
        return {'errorcode' : -1}
    
    return { 'errorcode' : 0, 'name' : hardwareSet['name'], 
    'capacity' : hardwareSet['capacity'], 'availability' : hardwareSet['availability']}

    
# This method allows the client to create a project. It takes a name, description, and projectid from the form, and creates the project in the database. If successful returns 0.
@app.route("/createProject", methods = ["POST"])
def createproject():
        myrequest = request.get_json(force=True)
        name = myrequest['name']
        description = myrequest['description']
        projectid = myrequest['projectid']
        
        verify = db.createProject(name, description, projectid)
        return {'errorcode' : verify}
    
# Returns a specific project as jsonified, with an input being its name.
@app.route('/getProject', methods = ["POST"])
def getproject():
    myrequest = request.get_json(force=True)
    name = myrequest['id']
    project = db.getProject(name)
    if project == None:
        return {'errorcode' : -1}
    return {'errorcode' : 0, 'projectid' : project['projectid'], 
    'description' : project['description'], 'name' : project['name'], 'hardware' : project['hardware']}
    
    

# At this URL, flask will pass a list containing dictionaries with all current projects,
# names, availability, and capacity. This url can therefore be used to have a dynamically updating page with the hardware on it. This list is jsonified when returned.
@app.route("/projectlist", methods = ["GET"])
def getprojectlist():
        return json.dumps(db.projectList())

# Removes a project from the database
@app.route("/removeProject", methods = ["POST"])
def removeProject():
    myrequest = request.get_json(force=True)
    name = myrequest["id"]
    verify = db.removeProject(name)
    return {'errorcode' : verify}

# This method is used for hardware changes associated with a project. 
# The inputs are the hardware set's name, the project's id, the quantity 
# to add or remove, and the string "checkout" or "checkin" to specify 
# whether to check in or out the amount specified.
@app.route('/hardwareToProject', methods = ["POST"])
def hardwareToProject():
    myrequest = request.get_json(force=True)
    hardwareName = myrequest['hardwareName']
    projectid = myrequest['projectid']
    try:
        qty = int(myrequest['qty'])
    except ValueError:
        return {'errorcode' : -1}
    inout = myrequest['inout']
    verify = db.hardwareToProject(hardwareName, projectid, qty, inout)
    return {'errorcode' : verify}


# This method closes the database. It could be ideally implemented with a button that closes the user session gracefully.
@app.route("/close")
def closeclient():
    db.closeClient()
    return 

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug = False, port=os.environ.get('PORT', 80))
