import { useRouteError, isRouteErrorResponse } from "react-router";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  let errorMessage = "Unknown error";

  if (isRouteErrorResponse(error)) {
    // Handle HTTP errors
    errorMessage = `HTTP Error: ${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    // Handle JavaScript errors
    errorMessage = error.message;
  } else {
    // Handle any other kind of error
    console.error(error);
    errorMessage = "An unknown error occurred.";
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
