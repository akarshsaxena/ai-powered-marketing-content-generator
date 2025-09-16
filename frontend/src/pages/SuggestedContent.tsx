import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";

const SuggestedContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData, customerId } = location.state || {};
  const [isApproved, setIsApproved] = useState(false);
  const [content, setContent] = useState(
    `Dear ${customerData?.firstName || "Valued Customer"},

We're excited to introduce our latest premium collection that we believe perfectly matches your sophisticated taste and lifestyle preferences.

As one of our ${customerData?.customerType || "valued"} customers, you have exclusive early access to our newest arrivals featuring:

• Handcrafted premium products designed for discerning customers
• Limited edition items available only to our select clientele  
• Complimentary consultation services tailored to your preferences
• Priority shipping and white-glove delivery service

Based on your previous purchases and preferences, we've curated a personalized selection that we believe will exceed your expectations.

Would you like to schedule a private viewing at your convenience? Our personal shopping specialists are ready to assist you.

Best regards,
The MarketingIQ Team`
  );

  const qualityScore = 92;

  const handleApprove = () => {
    setIsApproved(true);
    toast.success("Content approved successfully!");
  };

  const handleReject = () => {
    toast.error("Content rejected. Please regenerate or modify.");
    setIsApproved(false);
  };

  const handleRegenerate = () => {
    toast.info("Regenerating content...");
    // Simulate content regeneration
    setTimeout(() => {
      setContent(content.replace("excited", "thrilled").replace("sophisticated", "refined"));
      toast.success("New content generated!");
    }, 1500);
  };

  const handleSend = () => {
    if (isApproved) {
      toast.success("Content sent successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
          <CardHeader>
            <CardTitle className="text-xl">
              Generated Content for {customerData.firstName} {customerData.lastName} ({customerId})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg">
              <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                {content}
              </pre>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button
                onClick={handleApprove}
                className={`flex items-center space-x-2 ${isApproved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                variant={isApproved ? "default" : "default"}
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