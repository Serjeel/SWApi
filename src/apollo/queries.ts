import { gql } from "@apollo/client";

export const ALL_CHARACTERS = gql`
  query AllCharActers {
    allCharacters: allPeople {
      characters: people {
        name
      }
    }
  }
`;

export const ALL_FILMS = gql`
  query AllFilms {
    allFilms {
      films {
        title
      }
    }
  }
`;

export const ALL_SPECIES = gql`
  query AllSpecies {
    allSpecies {
      species {
        name
      }
    }
  }
`;
