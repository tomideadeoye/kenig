import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <div className="p-4">
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test card to check if the border issue is resolved.</p>
        </CardContent>
      </Card>
    </div>
  );
}