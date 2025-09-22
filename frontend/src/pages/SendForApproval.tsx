import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SendForApproval = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData, customerId, content } = location.state || {};

  const handleApprove = () => {
    // do your approve API call if needed
    navigate("/suggested-content", {
      state: {
        customerData,
        customerId,
        generatedEmail: content, // so SuggestedContent still sees the email
        approved: true,          // 👈 flag to enable Send
      },
    });
  };

  const handleReject = () => {
    // go back two pages (from SendForApproval -> SuggestedContent -> CustomerDetails)
    navigate(-2);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Approval Page</h1>

      <p>
        Customer: {customerData?.firstName} {customerData?.lastName} ({customerId})
      </p>

      <pre className="whitespace-pre-wrap mt-4">{content}</pre>

      <div className="flex gap-4 mt-6">
        <Button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Approve
        </Button>

        <Button
          onClick={handleReject}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default SendForApproval;
