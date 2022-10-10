const githubQuery = (pageCount, queryString) => {
  return {
    query: `
    {
      viewer {
        name
        avatarUrl
      }
      search(
        query: "user:AndrewYoung72 sort:updated-desc"
        type: REPOSITORY
        first: 20
      ) {
        repositoryCount
        nodes {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
            licenseInfo {
              spdxId
            }
          }
        }
      }
    }
  `,
  };
};

export default githubQuery;
