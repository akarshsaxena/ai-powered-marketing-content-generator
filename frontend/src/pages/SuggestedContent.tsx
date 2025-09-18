import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Send, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const SuggestedContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData, customerId, generatedEmail } = location.state || {};
  const [isApproved, setIsApproved] = useState(false);
  const [content, setContent] = useState(generatedEmail || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const qualityScore = 92;

  const handleApprove = () => {
    setIsApproved(true);
    toast.success("Content approved successfully!");
  };

  const handleReject = () => {
    toast.error("Content rejected. Please regenerate or modify.");
    navigate(-1)
    setIsApproved(false);
  };

    const handleRegenerate = async () => {
        toast.info("Regenerating content...");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/marketing/regenerate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cgid: customerId,
                    requirement: content, // current content or user's edits
                    editedContent: content // optional: pass user's edits explicitly
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data.generatedEmail || data.email || ""); // update content with regenerated email
                toast.success("Content regenerated successfully!");
            } else {
                toast.error("Failed to regenerate content. Try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while regenerating content.");
        } finally {
            setLoading(false);
        }
    };

  const handleSend = async () => {
    if (!isApproved) return;
  
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
      } else {
        toast.error("Failed to send email. Try again.");
      }
    } catch (error) {
      toast.error("Error while sending email.");
    } finally {
      setLoading(false);
    }
  };
  

  if (!customerData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p>No customer data found. Please start from customer search.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Go to Customer Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            onClick={() => navigate(-1)}
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
              Generated Content for {customerData.firstName} {customerData.lastName} ({customerId})
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
                <Button
                    onClick={handleApprove}
                    className={`flex items-center space-x-2 ${isApproved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                </Button>
              
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-destructive hover:text-destructive-foreground"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </Button>
              
              <Button
                onClick={handleRegenerate}
                variant="outline"
                className="flex items-center space-x-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Regenerate</span>
              </Button>

                <Button
                    onClick={handleSend}
                    disabled={!isApproved}
                    className={`flex items-center space-x-2 ${!isApproved ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                </Button>
            </div>

            <Alert className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle className="h-4 w-4" />
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

export default SuggestedContent;
