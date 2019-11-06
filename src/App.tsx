import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { createNote, deleteNote, updateNote } from "./graphql/mutations";
import { listNotes } from "./graphql/queries";
import { onCreateNote, onDeleteNote, onUpdateNote } from "./graphql/subscriptions";
import { mapStateToProps, mapDispatchToProps } from "./App.connect";

const App: React.FC = (props: any) => {
  useEffect(() => {
    props.getNoteListRequest();
  }, []);

  return (
    <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
      <h1 className="code f2-l">Amplify Notetaker</h1>
    </div>
  );
};

export default withAuthenticator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App),
  true
);
