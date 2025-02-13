import { useState, useEffect } from "react";

const SavedCandidates = () => {
  // function getLocalStorage() {
  //   const candidates = localStorage.getItem("candidates");
  //   return candidates;
  // }

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidateInfo = localStorage.getItem("candidates");
    if (candidateInfo) {
      setCandidates(JSON.parse(candidateInfo));
    }
  }, []);

  const removeRow = (login: string) => {
    const updatedCandidates = candidates.filter((item) => item.login !== login);
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates)); // Update localStorage
  };

  function formatName(name: string, login: string) {
    if (name) {
      return name + "(" + login + ")";
    }
    return login + "(" + login + ")";
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((item) => (
              <tr key={item.login}>
                <td>
                  <img style={{ width: "100px" }} src={item.avatar_url}></img>
                </td>
                <td>{formatName(item.name, item.login)}</td>
                <td>{item.location}</td>
                <td>{item.email}</td>
                <td>{item.company}</td>
                <td>{item.bio}</td>
                <td>
                  <button onClick={() => removeRow(item.login)}> - </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
