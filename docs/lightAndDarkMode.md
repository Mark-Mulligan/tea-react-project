## Light and Dark Mode Branch

The goal of this branch was to allow the user to switch between light and dark modes for the ui display. I also wanted the user to be able to keep their position in the search based on the last item they navigated. For example, if a user searched for batman and clicked an entry that was number 50. I wanted them to go back to entry after view the individual details of that selection.

### Implementation

To accomplish light and dark mode, I first had to create two different themes in MUI. I made some adjustments to the defaults to meet my desires for the UI. I then implemented some global state (using react Context) to keep track of whether the user was using dark mode or light mode. To persit this state on reloads, I save the changes to localStorage.

To keep the users place in a search, I moved the search state into react context as well. This allowed me to persit data when the user navigates away from the search page. I also had to add some state to keep track of the users selected item. When the user returns to the search page after going to the moviePage, the applicaiton automatic srolls to where the user last selected item was. This also had the effect of reducing calls to the api, as the last search data is already available.

### Updates

- Light and Dark Modes
- Saving users place on search (the item that they clicked on)
- Adding global state via React Context API
- Added tests as a part of the build step in deployment
