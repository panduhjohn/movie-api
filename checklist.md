*Create a checklist to show what you will need to use


*** dependencies
mongoose
dotenv


*** routes
/movies/getallmovies
/movies/addmovie
/movies/:title - update a movie
/movies/:title - delete a movie


*** model inputs
title: { type: String, unique: true, default: '' },
rating: { type: String, default: ''},
synopsis: { type: String, default: '', trim: true },
releaseYear: { type: String, default: '' },
genre: { type: String, default: '' },
director: { type: String, default: '' },
boxOffice: {type: String, default: ''}


     <% if(movies) { for(let movie in movies) { %>
           <h2><%= `${movies}` %>:</h2>
           <p> <%= movies[movie].title %> </p>
           <hr/>
        <% }} %>
