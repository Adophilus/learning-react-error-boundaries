import { Component, ErrorInfo } from "preact";
import { useState } from "preact/hooks";

class ErrorBoundary extends Component<
  { fallback?: Component },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function Main() {
  const [_, setReRender] = useState(false);
  const onClick = () => {
    setReRender((reRender: boolean) => !reRender);
  };

  const randomChanceOfError = Math.random() > 0.5;

  if (randomChanceOfError) {
    throw new Error("Catch me if you can, hahaha!");
  }

  return (
    <div>
      <p>This component could throw an error!</p>
      <p>
        <button onClick={onClick}>Try it!</button>
      </p>
    </div>
  );
}

function Fallback() {
  return <h3>An error occurred 🙁</h3>;
}

export function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Main />
    </ErrorBoundary>
  );
}
