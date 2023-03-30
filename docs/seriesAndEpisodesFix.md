# Series And Episode Fix Branch

I realized that a user could not search episodes like they could movies, series, or games. After diving in deeper, I realized that episodes were a subset of series and had to be queried differently. This lead to me adding the seasons to the series page, where I then allow users to view all the episodes associated with a series. This required some rework and extra development.

## Updates

- Added a new accordion component to hold the episodes in each season.
- Added additional data fetching logic in the media/[movieid] page to request the season data if the element was of type series
- Created a new api route to handle loading additional seasons after the first season is loaded.
- Added more customTypes to handle the new request logic
- Modified global search to not include episodes
