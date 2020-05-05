### Authenticate Type:
JWT tokens

### DATABASE TABLES
Table 1: User Data
User Id: email
Example:
{
	"email": "sbirudavolu@umass.edu",
	"password": "LeggoBET",
	"firstname": "Sathvik",
	"lastname": "Birudavolu",
	"school": "UMass Amherst"
}'
Table 2: Event Data
Event Id: Sha Hash
Example:
{
    "title": "Let'\''s go hiking",
    "description": "Come to campus center",
    "eventStartTime": 1584000000,
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg",
    "author": "Rahul Alluri",
    "jwt": "<jwt token>"
    "tags":['Hiking','Outing Club',null,null,null]
}'

### DATABASE Functions:
Database.ts: Javascript file used to query database
Functions:
    addUser = Adds user to database
    getUser = Gets user by email
    addEvent = Adds event to database
    getEvent = Gets event by id
    updateEvent = Updates already existing event in database
    getUserEvents = Gets all of the user's events through filtering by author name
    delete = Deletes event by its id

### Database functions application:
Event.ts: Javascript file used to call database functions to manipulate events.

