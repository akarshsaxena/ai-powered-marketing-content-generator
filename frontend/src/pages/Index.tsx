import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // if you're using shadcn/ui

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="text-2xl font-bold">Welcome</h1>
      
      {/* Banker Button */}
      <Button onClick={() => navigate("/search")}>
        Go to Customer Search (Banker)
      </Button>

      {/* Admin Button */}
      <Button onClick={() => navigate("/send-for-approval")} variant="secondary">
        Go to Send for Approval (Campaign Manager)
      </Button>
    </div>
  );
};

export default Index;
