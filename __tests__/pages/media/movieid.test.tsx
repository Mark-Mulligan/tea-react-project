// React
import React from "react";

// Testing Library
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Application
import MoviePage from "../../../src/pages/media/[movieId]";

const exampleMovieDetails = {
  Title: "Batman Begins",
  Year: "2005",
  Rated: "PG-13",
  Released: "15 Jun 2005",
  Runtime: "140 min",
  Genre: "Action, Crime, Drama",
  Director: "Christopher Nolan",
  Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
  Actors: "Christian Bale, Michael Caine, Ken Watanabe",
  Plot: `When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia, where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as "Batman". But it doesn't stay quiet for long.`,
  Language: "English, Mandarin",
  Country: "United States, United Kingdom",
  Awards: "Nominated for 1 Oscar. 14 wins & 79 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "8.2/10" },
    { Source: "Rotten Tomatoes", Value: "84%" },
    { Source: "Metacritic", Value: "70/100" },
  ],
  Metascore: "70",
  imdbRating: "8.2",
  imdbVotes: "1,489,724",
  imdbID: "tt0372784",
  Type: "movie" as "movie" | "series" | "episode",
  DVD: "18 Oct 2005",
  BoxOffice: "$206,863,479",
  Production: "N/A",
  Website: "N/A",
  Response: "True" as "True",
};

const exampleSeriesDetails = {
  Title: "Game of Thrones",
  Year: "2011–2019",
  Rated: "TV-MA",
  Released: "17 Apr 2011",
  Runtime: "57 min",
  Genre: "Action, Adventure, Drama",
  Director: "N/A",
  Writer: "David Benioff, D.B. Weiss",
  Actors: "Emilia Clarke, Peter Dinklage, Kit Harington",
  Plot: "In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.",
  Language: "English",
  Country: "United States, United Kingdom",
  Awards: "Won 59 Primetime Emmys. 389 wins & 634 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "9.2/10",
    },
  ],
  Metascore: "N/A",
  imdbRating: "9.2",
  imdbVotes: "2,140,757",
  imdbID: "tt0944947",
  Type: "series" as "series",
  totalSeasons: "8",
  Response: "True" as "True",
};

const exampleSeriesData = {
  Title: "Game of Thrones",
  Season: "1",
  totalSeasons: "8",
  Episodes: [
    {
      Title: "Winter Is Coming",
      Released: "2011-04-17",
      Episode: "1",
      imdbRating: "8.9",
      imdbID: "tt1480055",
    },
    {
      Title: "The Kingsroad",
      Released: "2011-04-24",
      Episode: "2",
      imdbRating: "8.6",
      imdbID: "tt1668746",
    },
    {
      Title: "Lord Snow",
      Released: "2011-05-01",
      Episode: "3",
      imdbRating: "8.5",
      imdbID: "tt1829962",
    },
    {
      Title: "Cripples, Bastards, and Broken Things",
      Released: "2011-05-08",
      Episode: "4",
      imdbRating: "8.6",
      imdbID: "tt1829963",
    },
    {
      Title: "The Wolf and the Lion",
      Released: "2011-05-15",
      Episode: "5",
      imdbRating: "9.0",
      imdbID: "tt1829964",
    },
    {
      Title: "A Golden Crown",
      Released: "2011-05-22",
      Episode: "6",
      imdbRating: "9.1",
      imdbID: "tt1837862",
    },
    {
      Title: "You Win or You Die",
      Released: "2011-05-29",
      Episode: "7",
      imdbRating: "9.1",
      imdbID: "tt1837863",
    },
    {
      Title: "The Pointy End",
      Released: "2011-06-05",
      Episode: "8",
      imdbRating: "8.9",
      imdbID: "tt1837864",
    },
    {
      Title: "Baelor",
      Released: "2011-06-12",
      Episode: "9",
      imdbRating: "9.6",
      imdbID: "tt1851398",
    },
    {
      Title: "Fire and Blood",
      Released: "2011-06-19",
      Episode: "10",
      imdbRating: "9.4",
      imdbID: "tt1851397",
    },
  ],
  Response: "True" as "True",
};

describe("Movie Id Page Data Tests", () => {
  describe("Movie Tests", () => {
    it("renders the movie title", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const heading = screen.getByText("Batman Begins");
      expect(heading).toBeInTheDocument();
    });
    it("renders the movie rating", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const rating = screen.getByText("PG-13", { exact: false });
      expect(rating).toBeInTheDocument();
    });
    it("renders the movie runtime length", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const runtime = screen.getByText("140 min", { exact: false });
      expect(runtime).toBeInTheDocument();
    });
    it("renders the movie plot", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const plot = screen.getByText(exampleMovieDetails.Plot);
      expect(plot).toBeInTheDocument();
    });
    it("renders the movie director (who is also a writer so appears twice)", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const nolanReferences = screen.getAllByText("Christopher Nolan");
      expect(nolanReferences.length).toBe(2);
    });
    it("renders the movie writer(s)", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const writer1 = screen.getByText("Bob Kane", { exact: false });
      const writer2 = screen.getByText("David S. Goyer", { exact: false });

      expect(writer1).toBeInTheDocument();
      expect(writer2).toBeInTheDocument();
    });
    it("renders the movie actors", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const actor1 = screen.getByText("Christian Bale", { exact: false });
      const actor2 = screen.getByText("Michael Caine", { exact: false });
      const actor3 = screen.getByText("Ken Watanabe", { exact: false });

      expect(actor1).toBeInTheDocument();
      expect(actor2).toBeInTheDocument();
      expect(actor3).toBeInTheDocument();
    });

    it("renders the movie ratings", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const rating1 = screen.getByText(exampleMovieDetails.Ratings[0].Value, { exact: false });
      const rating2 = screen.getByText(exampleMovieDetails.Ratings[1].Value, { exact: false });
      const rating3 = screen.getByText(exampleMovieDetails.Ratings[2].Value, { exact: false });

      expect(rating1).toBeInTheDocument();
      expect(rating2).toBeInTheDocument();
      expect(rating3).toBeInTheDocument();
    });

    it("renders the box office amount", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const boxOffice = screen.getByText(exampleMovieDetails.BoxOffice);
      expect(boxOffice).toBeInTheDocument();
    });

    it("renders the Location of the movie", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const country = screen.getByText(exampleMovieDetails.Country);
      expect(country).toBeInTheDocument();
    });

    it("renders the awards for a movie", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const awards = screen.getByText(exampleMovieDetails.Awards);
      expect(awards).toBeInTheDocument();
    });

    it("renders the release date of the movie", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      // The release date is formatted from the original provided;
      const releaseDate = screen.getByText("June 15, 2005");
      expect(releaseDate).toBeInTheDocument();
    });

    it("renders the type of media", () => {
      render(<MoviePage movieDetails={exampleMovieDetails} seriesData={null} />);
      const mediaType = screen.getByText(exampleMovieDetails.Type);
      expect(mediaType).toBeInTheDocument();
    });
  });

  describe("Series Tests", () => {
    it("renders the series title", () => {
      render(<MoviePage movieDetails={exampleSeriesDetails} seriesData={exampleSeriesData} />);
      const heading = screen.getByText("Game of Thrones");
      expect(heading).toBeInTheDocument();
    });

    it("renders all 8 seasons", () => {
      render(<MoviePage movieDetails={exampleSeriesDetails} seriesData={exampleSeriesData} />);

      for (let i = 0; i < 8; i++) {
        const season = screen.getByText(`Season ${i + 1}`);
        expect(season).toBeInTheDocument();
      }
    });
  });
});
