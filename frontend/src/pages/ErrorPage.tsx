import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {errorStatus === 404 ? "Page Not Found" : "Something went wrong"}
        </h1>
        
        <p className="text-slate-600 mb-8">
          {errorMessage}
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Back Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="block w-full text-sm text-slate-500 hover:text-slate-700 focus:outline-none"
          >
            Try reloading the page
          </button>
        </div>

        {import.meta.env.DEV && error instanceof Error && (
          <div className="mt-8 p-4 bg-slate-100 rounded-lg text-left">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Error details:</h3>
            <pre className="text-xs text-slate-600 whitespace-pre-wrap">
              {error.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}