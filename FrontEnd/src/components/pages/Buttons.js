import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router} from "react-router-dom";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";


const Header = props => {
  const { location } = props;
  return (
    <Navbar bg="light" variant="light">
      <Nav activeKey={location.pathname}>
        <Nav.Link href="/iot">IoT</Nav.Link> 
        <Nav.Link href="/meter">Meter</Nav.Link>
      </Nav>
    </Navbar>
  );
};

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;

}


const HeaderWithRouter = withRouter(Header);

export const Buttons=() => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <HeaderWithRouter />
        </Fragment>
      </Router>
    </div>
  );
}


