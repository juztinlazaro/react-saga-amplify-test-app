import { getNoteListRequest } from "./store/App/app.action";
export const mapStateToProps = (state: any) => ({
  app: state.app
});

export const mapDispatchToProps = (dispatch: any) => ({
  getNoteListRequest: () => dispatch(getNoteListRequest())
});
