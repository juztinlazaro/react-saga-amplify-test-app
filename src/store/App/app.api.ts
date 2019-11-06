import { API, graphqlOperation } from "aws-amplify";
import { listNotes } from "../../graphql/queries";
import { createNote } from "../../graphql/mutations";

export const getNoteListApi = async () => {
  return await API.graphql(graphqlOperation(listNotes));
};
