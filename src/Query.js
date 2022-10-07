const githubQuery = {
  query: `
  {
    viewer {
      name
      repositories(first: 20) {
        nodes {
          id
          name
          description
          url
        }
      }
    }
  }
  `,
};

export  default githubQuery;