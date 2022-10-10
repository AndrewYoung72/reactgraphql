import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./Query";
import RepoInfo from "./RepoInfo";

function App() {
  let [userName, setUserName] = useState("");
  // eslint-disable-next-line no-undef
  let [repoList, setRepoList] = useState();
  let [avatarUrl, setAvatarUrl] = useState()
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("slides");
  let [totalCount, setTotalCount] = useState("slides");

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString))

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setAvatarUrl(viewer.avatarUrl);
        setTotalCount(total);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString]);
 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <h2>Hello {userName}, <img src= {avatarUrl} alt="Boo"></img></h2>
      <p>
        <b> Search for:</b> {queryString} | <b> Items per page:</b> {pageCount} | <b> Total results:</b> {totalCount} |
      </p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
          <RepoInfo key={repo.id} repo={repo}/>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
