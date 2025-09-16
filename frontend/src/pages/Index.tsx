import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to customer search page on app load
    navigate("/search");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Loading MarketingIQ...</h1>
        <p className="text-xl text-muted-foreground">Redirecting to customer search...</p>
      </div>
    </div>
  );
};

export default Index;
