import { useEffect, useRef, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import ListProduct from "./ListProduct";
import Nav from "./Nav";
import SingleProduct from "./SingleProduct";
import UserProducts from "./UserProducts";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      setFetching(true);
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("authentication failed");
        })
        .then((data) => {
          setUser(data.user);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
    setFetching(false);
  }, []);

  return isFetching ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} user={user} />
      <Switch>
        <Route
          exact
          path={`/`}
          render={(routeProps) => (
            <Dashboard user={user} {...routeProps} setUser={setUser} />
          )}
        />
        {/* Protected Route */}
        <Route
          exact
          path={`/listProduct`}
          render={(rp) => {
            return isLoggedIn === true ? (
              <ListProduct {...rp} user={user} setUser={setUser} />
            ) : (
              <Redirect to={`/`} exact />
            );
          }}
        />
        {/* Protected Route */}
        <Route
          exact
          path={`/userProducts`}
          render={(rp) =>
            isLoggedIn ? (
              <UserProducts {...rp} user={user} />
            ) : (
              <Redirect to={`/`} exact />
            )
          }
        />
        <Route
          exact
          path={`/product/:id`}
          render={(rp) => (
            <SingleProduct {...rp} user={user} setUser={setUser} />
          )}
        />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </div>
  );
}

export default App;
