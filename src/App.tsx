import { compose, setDisplayName } from "recompose";
import { withProvider } from "./Components/HOC/withProvider";
import Root from "./Components/Pages";

const AppEnhancer = compose(setDisplayName("App"), (Component: any) =>
  withProvider(Component)
);

const enhance = (RootComponent: any) => AppEnhancer(RootComponent);

export default enhance(Root);
