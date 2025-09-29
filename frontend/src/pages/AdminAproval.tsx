import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, XCircle, Send, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const AdminAproval = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id,customerData, customerId, productType, generatedEmail } = location.state || {};

  const [content, setContent] = useState(generatedEmail || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendEnabled, setSendEnabled] = useState(false); // controls Send button

  const qualityScore = 92;

  // Store approval/rejection status in DB
  const handleStatusUpdate = async (status: "Approved" | "Rejected") => {
    console.log(customerData, customerId,productType, content, status);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/customers/save-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          customerId,
          customerType: customerData?.customerType || "UNKNOWN",
          productType: productType,
          email: content,
          status,
        }),
      });

      if (response.ok) {
        toast.success(`Content ${status.toLowerCase()} successfully!`);
        if (status === "Approved") navigate("/send-for-approval")
        if (status === "Rejected") navigate("/send-for-approval")
      } else {
        toast.error("Failed to update status. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while updating status.");
    } finally {
      setLoading(false);
    }
  };

// Updated handleSend
const handleSend = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/api/marketing/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cgid: customerId,
        subject: `Special Offer That You Cannot Miss`,
        bodyHtml: content,
      }),
    });

    if (response.ok) {
      toast.success("Email sent successfully!");
      // After sending, go back to SendForApproval page
      navigate("/send-for-approval", {
        state: { customerData, customerId }, // pass whatever is needed
      });
      setLoading(false);
    } else {
      toast.error("Failed to send email. Try again.");
    }
  } catch (error) {
    toast.error("Error while sending email.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-background p-4">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/send-for-approval")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Suggested Content</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {/* Generated Content for {customerData.firstName} {customerData.lastName} ({customerId}) */}
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-1"
            >
              <Pencil className="h-4 w-4" />
              <span>{isEditing ? "Lock" : "Edit"}</span>
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              {isEditing ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[150px] font-sans text-foreground leading-relaxed"
                />
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                  {content}
                </pre>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {/* Reject */}
              <Button
                onClick={() => handleStatusUpdate("Rejected")}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-destructive hover:text-destructive-foreground"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </Button>

              {/* Accept */}
              <Button
                onClick={() => handleStatusUpdate("Approved")}
                variant="outline"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
                <span>Approve</span>
              </Button>

              {/* Send - disabled until Approved
              <Button
                onClick={handleSend}
                disabled={!sendEnabled}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button> */}
            </div>

            <Alert className="bg-green-50 border-green-200 text-green-800">
              <Send className="h-4 w-4" />
              <AlertDescription>
                <strong>AI Quality Score: {qualityScore}%</strong> - This content meets high quality standards
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAproval;
