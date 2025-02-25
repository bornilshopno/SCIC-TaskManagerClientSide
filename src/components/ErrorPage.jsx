
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goHome = () => {
      navigate("/");
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-7xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl mt-4 font-semibold">Oops! Page not found</h2>
        <p className="text-gray-600 mt-2 text-center">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-2 bg-primary text-white font-medium rounded-lg shadow hover:bg-secondary transition-all duration-200"
        >
          Go Back Home
        </button>
      </div>
    );
};

export default ErrorPage;