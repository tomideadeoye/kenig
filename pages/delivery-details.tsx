import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import {
  ChevronDown,
  Upload,
  Eye,
  Star,
  Phone,
  MessageCircle,
  Mail,
  FileText,
  Pencil,
  Box,
} from "lucide-react";

// Helper Component for Key-Value Pairs
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value}</p>
  </div>
);

// User Profile Card (Seller/Buyer)
const UserCard = ({
  role,
  name,
  rating,
  details,
}: {
  role: string;
  name: string;
  rating: number;
  details: { label: string; value: string }[];
}) => {
  const iconComponents = [Phone, MessageCircle, Mail, FileText];
  return (
    <Card className="bg-slate-50/50 border border-slate-100">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-600">
          {role}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://avatar.vercel.sh/bright.png" alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-slate-800">{name}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(rating)
                      ? "text-orange-400 fill-orange-400"
                      : "text-slate-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-slate-500">{rating}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {iconComponents.map((Icon, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className="bg-orange-50 text-orange-500 border-orange-200 rounded-full hover:bg-orange-100"
            >
              <Icon size={18} />
            </Button>
          ))}
        </div>
        <div className="mt-4 space-y-1">
          {details.map((item) => (
            <DetailItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function DeliveryDetailsPage() {
  const sellerDetails = [
    { label: "Dispatch Details", value: "" }, // Placeholder for section title
  ];
  const buyerDetails = [
    { label: "Purchase Date", value: "25th Aug 2025" },
    { label: "Purchase mode", value: "Purchase Protection" },
    { label: "Linked Delivery Job", value: "PP-5698" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          {/* Header */}
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-800">
              Delivery Details
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-sm">
                <Upload size={16} className="mr-2" />
                Export
              </Button>
              <ChevronDown className="text-slate-500 cursor-pointer" />
            </div>
          </header>

          {/* Ad Status */}
          <div className="flex items-center space-x-2 mb-4 text-sm">
            <span className="text-slate-600">Sell Ad:</span>
            <span className="font-semibold text-slate-800">AD-1258</span>
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
            <span className="text-green-600 font-medium">Active</span>
            <ChevronDown
              size={20}
              className="text-slate-400 cursor-pointer"
            />
          </div>
          <Separator className="bg-slate-200" />

          <main className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column: Image & User Cards */}
            <div className="space-y-6">
              {/* Image Gallery */}
              <Card>
                <CardHeader className="flex-row items-center justify-between py-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Eye size={18} />
                    <span>25 Views</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-slate-100 rounded-lg p-8 flex items-center justify-center aspect-video mb-4">
                    {/* Using the provided image */}
                    <img 
                      src="/images/1f8cc530-3beb-4fbd-9bf3-732fd4ddcf8f.png" 
                      alt="Product Image" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-slate-100 rounded-md flex items-center justify-center aspect-square"
                      >
                        {/* Using the provided image for thumbnails as well */}
                        <img 
                          src={`/images/1f8cc530-3beb-4fbd-9bf3-732fd4ddcf8f.png`} 
                          alt={`Product Thumbnail ${i+1}`} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Seller & Buyer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserCard
                  role="Seller"
                  name="Bright Azu - Sender"
                  rating={4.6}
                  details={sellerDetails}
                />
                <UserCard
                  role="Buyer"
                  name="Bright Azu - Receiver"
                  rating={4.6}
                  details={buyerDetails}
                />
              </div>
            </div>

            {/* Right Column: Details Cards */}
            <div className="space-y-6">
              {/* Pick up & Delivery Details */}
              <Card className="bg-slate-50/50 border border-slate-100">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-600">
                    Pick up & Delivery Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DetailItem label="Created at" value="25th Aug 2025" />
                  <DetailItem label="Ad Expiry date" value="25th Aug 2027" />
                  <DetailItem label="Pickup Type" value="From Sender's location" />
                  <DetailItem label="Delivery Type" value="PP, Direct Contact" />

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <RadioGroup defaultValue="pickup" className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <label htmlFor="pickup" className="text-sm font-medium">
                          Pick up Details:
                        </label>
                      </div>
                      <div className="flex justify-between items-start pl-6">
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>
                            Name:{" "}
                            <span className="font-semibold text-slate-800">
                              Adebayo Ojoba
                            </span>
                          </p>
                          <p>Address: 24 Akonwonjo Road, Egbeda, Alimoso</p>
                          <p>Phone Number: +2348037456908</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Pencil size={16} />
                        </Button>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Package Details */}
              <Card className="bg-slate-50/50 border border-slate-100">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-600">
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DetailItem label="Title" value="New Samsung Galaxy S10" />
                  <DetailItem label="Category" value="Electronics" />
                  <div className="flex justify-between py-2">
                    <p className="text-sm text-slate-500">Product category</p>
                    <p className="text-sm font-semibold text-slate-800 text-right">
                      Multi Category <br /> (Petroleum/Liquids/Chemicals/
                      <br />
                      Agricultural Produce)
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <DetailItem label="Package Weight" value="5kg" />
                  <DetailItem
                    label="Monetary Worth of Package"
                    value="60,000"
                  />
                  <DetailItem label="Pickup preference" value="No Vehicle" />
                  <div className="flex justify-between items-center py-2">
                    <p className="text-sm text-slate-500">
                      Delivery Fee Invoice Recipient
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-slate-800">
                        Sender
                      </p>
                      <Button variant="ghost" size="icon">
                        <Pencil size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* Views Accordion */}
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="views"
              className="bg-white border border-slate-200 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="px-6 text-lg font-bold text-slate-800">
                Views
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="h-20 bg-slate-50 rounded-md flex items-center justify-center text-slate-400">
                  Chart visualization would go here
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
