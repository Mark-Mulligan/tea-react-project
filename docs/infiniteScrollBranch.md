## Infinite Scroll Branch

The goal of this branch was to be able to load more search results as the user scrolls down. This would provided a

### Implementation

To implement this, I created a separate component. I used the browsers IntersectionObserver to detect whether this infinite scroll component was in the users view. If it was, I would load the next page if there was one. To get a reference to the
element I was using as the infinite scroll detector, I used the useRef hook. In order to know if there was another page or not, I modified the api route to detect whether or not there was another page after the current one requested. I then sent this back to the frontend as an additional data point in the response and added a state value to keep track of this.

Logic for the infinite scroll feature can be seen in the Infinite Scroll component as well as updates made to the pages/api/movies/search.ts file.

### Other Updates

- Made app responsive on different screen sizes
- Added some custom colors via MUI themes
- Added additional information to the individual media page
- Added a clear search button to the Media Search page
