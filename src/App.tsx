import React from 'react';
import logo from './logo.svg';
import axios, { CancelTokenSource } from 'axios';
import './App.css';

const App = () => {
  interface IPost {
    id: number;
    userId?: number;
    title: string;
    body: string;
  }

  const defaultPosts: IPost[] = [];
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  // cancel request error
  // const cancelToken = axios.CancelToken; //create cancel token
  // const [cancelTokenSource, setCancelTokenSource]: [CancelTokenSource,(cancelTokenSource: CancelTokenSource) => void] = React.useState(cancelToken.source());
  
  // const handleCancelClick = () => {
  //   if (cancelTokenSource) {
  //     cancelTokenSource.cancel("User cancelled operation");
  //   }
  // };

  React.useEffect(() => {
    // TODO - get posts

    // timeout error request
    //axios
    //   .get<IPost[]>("...", {
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //   timeout : 1
    // }) 

    axios
    .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
      // for cancel request error
      // cancelToken: cancelTokenSource.token,
      headers: {
        "Content-Types": "application/json",
      },
      // for time request error
      // timeout: 1
    }).then(response => {
      setPosts(response.data);
      setLoading(false);
    }).catch((ex) => {

      // original working code
      const error =
        ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);

      // error catch for timeout
      //   const error =
      //   ex.code === "ECONNABORTED"
      //   ? "A timeout has occurred"
      //   : ex.response.status === 404
      //     ? "Resource not found"
      //     : "An unexpected error has occurred";
      //  setError(err);
      //  setLoading(false);

      // error catch for cancel request
      // const error = axios.isCancel(ex)
      // ? 'Request Cancelled'
      // : ex.code === "ECONNABORTED"
      // ? "A timeout has occurred"
      // : ex.response.status === 404
      //   ? "Resource Not Found"
      //   : "An unexpected error has occurred";
      // setError(error);
      // setLoading(false);
    });
  }, []);

  // to initiate error
  // cancelTokenSource.cancel("User cancelled operation");

  return (
    <div className="App">

      {/* {loading && (
        <button onClick={handleCancelClick}>Cancel</button>
      )} */ /*button for error */}
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
