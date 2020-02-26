Create a Movie Api of your own. Please make repo on github, push frequently and Submit github repo link when finished.

*Create a checklist to show what you will need to use
dependencies
routes
model inputs
This should be turned in as well

*Each piece of code should be commented with what the code will do
*Use express-generator this time
*Get it all working using robo 3t and postman first
*If time then you can add ejs


*The database should hold all strings:
the title of the movie
rating (PG, R, PG-13)
synopsis
release year
genre (if there are many genre options only choose one)
director
box office
At least one of the values in the db must be unique

User should be able to see all movies in the database
User should be able to add a movie
User should be able to search for a movie and see the information (on the same page)
User should be able to update information about the move, but NOT the unique values or the id (only in postman not using an ejs page)
User should be able to delete a word from the database (this should work only in postman not on a page)


Create ejs pages and forms to render data and take in input


*Stretch Goals
Genre in model can hold more than one genre
You can update the genre and add another one to the group
A page that when you choose a genre, all the movies from that genre are listed
Move your routes to controllers
See if you can manually put a poster into your assets and add it to your database to render as an image on your ejs pages
Add CSS
create validation middleware of your own for inputs