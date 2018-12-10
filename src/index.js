import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const FakeContext = React.createContext(null);

const FakeProvider = ({ myFakeProp, children }) => (
  <FakeContext.Provider value="fake">
    <div>
      First
      {` ${myFakeProp}`}
      {children}
    </div>
  </FakeContext.Provider>
);
const SecondFakeProvider = ({ myFakeProp, children }) => (
  <FakeContext.Provider value="fake">
    <div>
      Second
      {` ${myFakeProp}`}
      {children}
    </div>
  </FakeContext.Provider>
);
const ThirdFakeProvider = ({ myFakeProp, children }) => (
  <FakeContext.Provider value="fake">
    <div>
      Third
      {` ${myFakeProp}`}
      {children}
    </div>
  </FakeContext.Provider>
);

const providers = {
  provider: FakeProvider,
  props: { myFakeProp: "myFakeProp" },
  children: {
    provider: SecondFakeProvider,
    props: { myFakeProp: "myFakeProp" },
    children: {
      provider: ThirdFakeProvider,
      props: { myFakeProp: "myFakeProp" }
    }
  }
};

function hasChildren(providers) {
  return providers.hasOwnProperty("children");
}

function makeProviders(providers) {
  return React.createElement(
    providers.provider,
    providers.props,
    hasChildren(providers) ? makeProviders(providers.children) : null
  );
}

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
    {makeProviders(providers)}
  </div>
);

render(<App />, document.getElementById("root"));
