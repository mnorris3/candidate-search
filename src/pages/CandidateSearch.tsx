import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [count, setCount] = useState(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    async function fetchData() {
      const initialCandidates = await searchGithub();
      let candidateInfo = [];
      for (let i = 0; i < initialCandidates.length; i++) {
        try {
          let newCandidate = await searchGithubUser(initialCandidates[i].login);
          if (newCandidate !== null) {
            candidateInfo.push(newCandidate);
            // console.log(newCandidate);
          }
        } catch (error) {
          console.log(error);
          continue;
        }
      }
      return candidateInfo;
    }
    fetchData().then((result: any) => {
      setCandidates(result);
    });
  }, []);

  function formatName(name: string, login: string) {
    if (name) {
      return name + "(" + login + ")";
    }
    return login + "(" + login + ")";
  }

  function handleSave(candidate: any) {
    const candidates = localStorage.getItem("candidates");

    const parsedCandidates: Candidate[] = candidates
      ? JSON.parse(candidates)
      : [];

    parsedCandidates.push(candidate);

    localStorage.setItem("candidates", JSON.stringify(parsedCandidates));
    setCount(count + 1);
  }

  if (candidates.length === 0) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        <h1>Candidate Search</h1>
        <div className="card">
          <img
            className="card-img-top"
            style={{ width: "500px" }}
            src={candidates[count].avatar_url}
            alt="Card image cap"
          ></img>
          <div className="card-body">
            <h3 className="card-title">
              {formatName(candidates[count].name, candidates[count].login)}
            </h3>
            <p className="card-text">Location: {candidates[count].location}</p>
            <p className="card-text">Email: {candidates[count].email}</p>
            <p className="card-text">Company: {candidates[count].company}</p>
            <p className="card-text">Bio: {candidates[count].bio}</p>
            <button
              id="red"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              -
            </button>
            <button id="green" onClick={() => handleSave(candidates[count])}>
              +
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CandidateSearch;
