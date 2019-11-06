import { API, graphqlOperation } from "aws-amplify";
import { listNotes } from "../../graphql/queries";
import { createNote } from "../../graphql/mutations";

export const graphlAPI = async (endpoint: string, input?: any) => {
  return await API.graphql(graphqlOperation(endpoint, input || {}));
};
