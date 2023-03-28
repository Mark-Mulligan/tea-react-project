## Improved Search Branch

The goal of this branch was to add more functionality to the search page. I wanted to add the ability to search by title and add the additional features of type or movie to
my search. The other thing I wanted to do was to put the query in the url. That way, when a user navigates to the individual media page or reloads the page, they maintain
the search results that they just did.

### Implementation

I ended up using the next router object to add query params to the url. I also had to track these params and make sure they were synced with the state of the inputs on first load.
This allow me to maintain the search params when the page was reloaded or the user navigated back to the movies search page after doing a search.

I used the javascript URL class to work with and manipulate the url string for all of the search criteria.

### Other changes

I ended up changing the button on the movie cards to a badge (since the cards are technically buttons elements because they are selectable). I put the view details just to make sure
the user could tell the cards are selectable.
