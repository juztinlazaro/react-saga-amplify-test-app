import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2>App</h2>
    </div>
  );
};

export default withAuthenticator(App);
