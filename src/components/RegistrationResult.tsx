// components/ResultPage.tsx
interface Props {
    submissionStatus: 'success' | 'failure' | null;
    onBack: () => void;
  }
  
  const ResultPage = ({ submissionStatus, onBack }: Props) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {submissionStatus === 'success' ? (
          <>
            <h1 className="text-4xl font-bold text-green-600">Registration Successful!</h1>
            <p className="text-xl text-gray-700 mt-4">The patient has been successfully registered.</p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-full hover:bg-blue-600 transition"
            >
              Go Back to Registration
            </button>
          </>
        ) : submissionStatus === 'failure' ? (
          <>
            <h1 className="text-4xl font-bold text-red-600">Registration Failed</h1>
            <p className="text-xl text-gray-700 mt-4">Something went wrong. Please try again.</p>
            <button
              onClick={onBack}
              className="mt-6 px-6 py-3 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 transition"
            >
              Go Back to Registration
            </button>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  };
  
  export default ResultPage;
  