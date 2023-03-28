## MVP Branch

The goal of this branch was to get this project working as soon as possible. The idea was to complete the minimal viable product, so that if given a tight deadline,
I could finish the items necessary to complete the project based on the description.

### Planning

First, I read through the requirements for the project on github ([requirements](https://github.com/callemall/tea-react-challenge)). After reading through the requirements,
I thought over how I should implement this project and what technologies should I use. Here are some of the different items I thought about

#### API Key

Since there was an api key, I did not want to expose this to the client. To accomplish this, I knew would need to have a server for the project.
I could either do a standalone express server or use Next.js. I decided to go with Next.js for the ease of development along with the server side rendering option for SEO purposes.

#### SEO

Since this project is open to the internet, I wanted to provide at least the opportunity to have good SEO on the web page. This eliminated the possibility of using just a standard client side
only react app. I used Next.js to accomplish this.

#### Styling

I used MUI for styling to leverage both the styles and prebuilt functionality of the react library. This would speed up development time as I would not need to spend as much time
developing components or styling the app.

#### Typescript

I tend to always use typescript on all my projects. It is especially useful for this project since it allowed me to document the api calls and know exactly what is being
returned. Since the api calls in this project are large objects, typescript was super import to make sure I was access the right keys on these objects when building out the project.

#### Pages

I knew I would need to have at least two different pages in the app. One for the search functionality, the other for displaying individual media descriptions. Next.js also helped with this
as I was able to leverage it's built in directory routing system.
