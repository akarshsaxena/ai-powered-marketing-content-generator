import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from "lucide-react";

const CustomerSearch = () => {
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
   if (customerId.trim()) {
      navigate(`/customer-details/${customerId}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Search className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">MarketingIQ</h1>
            </div>
            <CardTitle className="text-2xl font-semibold">Customer Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                placeholder="e.g., CGID-123456"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg h-12"
              />
              {!customerId.trim() && (
              <p className="text-red-600 text-sm">Please enter a Customer ID to search.</p>
            )}
            </div>
            <Button 
              onClick={handleSearch}
              className="w-full h-12 text-lg font-medium"
              size="lg"
              disabled={!customerId.trim()} // disable if empty
            >
              Search
            </Button>
          </CardContent>
        </Card>

        <Alert className="bg-info text-info-foreground border-info/20">
          <AlertDescription className="text-center">
            Enter a Customer ID (CGID) to search for customer details.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default CustomerSearch;