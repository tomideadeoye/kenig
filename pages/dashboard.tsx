import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Truck,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  RotateCcw,
  SortAsc,
  Filter,
  ChevronDown,
  Search
} from "lucide-react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DashboardPage = () => {
  // State for date range
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  
  // State for items per page
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for the dashboard with more items
  const stats = [
    { title: "Total Revenue", value: "₦45,231.89", change: "+20.1% from last month", icon: DollarSign, link: "/delivery-details" },
    { title: "Subscriptions", value: "+2350", change: "+180.1% from last month", icon: Users, link: "/users/all" },
    { title: "Sales", value: "+12,234", change: "+19% from last month", icon: ShoppingCart, link: "/delivery-details" },
    { title: "Active Now", value: "+573", change: "+201 since last hour", icon: TrendingUp, link: "/delivery-details" },
  ];

  // Mock data for assets
  const assets = [
    { id: 1, title: "iPhone 15 Pro", location: "Lagos", sellingMode: "Auction", status: "Active", price: 850000, creationDate: "2025-10-15" },
    { id: 2, title: "MacBook Pro M3", location: "Abuja", sellingMode: "Direct Sale", status: "Active", price: 2500000, creationDate: "2025-10-14" },
    { id: 3, title: "Samsung Galaxy S24", location: "Lagos", sellingMode: "Auction", status: "Sold", price: 650000, creationDate: "2025-10-14" },
    { id: 4, title: "Dell XPS 13", location: "Port Harcourt", sellingMode: "Direct Sale", status: "Active", price: 1200000, creationDate: "2025-10-13" },
    { id: 5, title: "iPad Air", location: "Kano", sellingMode: "Auction", status: "Pending", price: 450000, creationDate: "2025-10-12" },
    { id: 6, title: "Sony WH-1000XM5", location: "Lagos", sellingMode: "Direct Sale", status: "Active", price: 280000, creationDate: "2025-10-11" },
    { id: 7, title: "Nintendo Switch OLED", location: "Abuja", sellingMode: "Auction", status: "Sold", price: 350000, creationDate: "2025-10-10" },
    { id: 8, title: "Canon EOS R6", location: "Lagos", sellingMode: "Direct Sale", status: "Active", price: 1800000, creationDate: "2025-10-09" },
    { id: 9, title: "AirPods Pro", location: "Ibadan", sellingMode: "Auction", status: "Pending", price: 150000, creationDate: "2025-10-08" },
    { id: 10, title: "iMac 24-inch", location: "Lagos", sellingMode: "Direct Sale", status: "Active", price: 3200000, creationDate: "2025-10-07" },
    { id: 11, title: "Google Pixel 8", location: "Abuja", sellingMode: "Auction", status: "Sold", price: 550000, creationDate: "2025-10-06" },
    { id: 12, title: "Surface Pro 9", location: "Port Harcourt", sellingMode: "Direct Sale", status: "Active", price: 1400000, creationDate: "2025-10-05" },
  ];

  // State for advanced filters
  const [itemTitle, setItemTitle] = useState("");
  const [location, setLocation] = useState("");
  const [sellingMode, setSellingMode] = useState("");
  const [status, setStatus] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [creationDateFrom, setCreationDateFrom] = useState<Date | null>(null);
  const [creationDateTo, setCreationDateTo] = useState<Date | null>(null);

  // State for column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    location: true,
    sellingMode: true,
    status: true,
    price: true,
    creationDate: true,
  });

  // State for advanced filter toggle
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // Filter and sort data
  const filteredAndSortedAssets = useMemo(() => {
    let result = [...assets];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply main date range filter
    if (startDate && endDate) {
      result = result.filter(asset => {
        const assetDate = new Date(asset.creationDate);
        return assetDate >= startDate && assetDate <= endDate;
      });
    }

    // Apply advanced filters
    if (itemTitle) {
      result = result.filter(asset => asset.title.toLowerCase().includes(itemTitle.toLowerCase()));
    }
    if (location) {
      result = result.filter(asset => asset.location === location);
    }
    if (sellingMode) {
      result = result.filter(asset => asset.sellingMode === sellingMode);
    }
    if (status) {
      result = result.filter(asset => asset.status === status);
    }
    if (priceMin) {
      result = result.filter(asset => asset.price >= parseFloat(priceMin));
    }
    if (priceMax) {
      result = result.filter(asset => asset.price <= parseFloat(priceMax));
    }
    if (creationDateFrom && creationDateTo) {
      result = result.filter(asset => {
        const assetDate = new Date(asset.creationDate);
        return assetDate >= creationDateFrom && assetDate <= creationDateTo;
      });
    }

    // Apply sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [assets, searchTerm, startDate, endDate, itemTitle, location, sellingMode, status, priceMin, priceMax, creationDateFrom, creationDateTo, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAssets.length / itemsPerPage);
  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedAssets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedAssets, currentPage, itemsPerPage]);

  // Sorting handler
  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Reset filters
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
    setItemTitle("");
    setLocation("");
    setSellingMode("");
    setStatus("");
    setPriceMin("");
    setPriceMax("");
    setCreationDateFrom(null);
    setCreationDateTo(null);
    setSortConfig(null);
    setCurrentPage(1);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">From:</span>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              className="border rounded p-2 text-sm datepicker-input"
              placeholderText="Start Date"
              popperClassName="react-datepicker-popper"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">To:</span>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              className="border rounded p-2 text-sm datepicker-input"
              placeholderText="End Date"
              popperClassName="react-datepicker-popper"
            />
          </div>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart visualization would go here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Assets</CardTitle>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-48"
                  />
                </div>
                <Collapsible open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Advanced Filter
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="absolute right-0 top-full mt-2 bg-white border rounded-md shadow-lg p-4 z-10 w-96">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="itemTitle">Item Title</Label>
                        <Input
                          id="itemTitle"
                          placeholder="Filter by title..."
                          value={itemTitle}
                          onChange={(e) => setItemTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="Lagos">Lagos</SelectItem>
                            <SelectItem value="Abuja">Abuja</SelectItem>
                            <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                            <SelectItem value="Kano">Kano</SelectItem>
                            <SelectItem value="Ibadan">Ibadan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sellingMode">Ad Selling Mode</Label>
                        <Select value={sellingMode} onValueChange={setSellingMode}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="Auction">Auction</SelectItem>
                            <SelectItem value="Direct Sale">Direct Sale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Sold">Sold</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Price Range</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Min"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            type="number"
                          />
                          <Input
                            placeholder="Max"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            type="number"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Creation Date Range</Label>
                        <div className="flex gap-2">
                          <DatePicker
                            selected={creationDateFrom}
                            onChange={setCreationDateFrom}
                            className="border rounded p-2 text-sm w-full datepicker-input"
                            placeholderText="From"
                            dateFormat="dd/MM/yyyy"
                            popperClassName="react-datepicker-popper"
                          />
                          <DatePicker
                            selected={creationDateTo}
                            onChange={setCreationDateTo}
                            className="border rounded p-2 text-sm w-full datepicker-input"
                            placeholderText="To"
                            dateFormat="dd/MM/yyyy"
                            popperClassName="react-datepicker-popper"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Column Selection */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="font-medium">Select Columns:</span>
                {Object.entries(visibleColumns).map(([key, visible]) => (
                  <label key={key} className="flex items-center gap-1">
                    <Checkbox
                      checked={visible}
                      onCheckedChange={(checked) =>
                        setVisibleColumns(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                ))}
              </div>

              {/* Assets Table */}
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      {visibleColumns.title && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("title")}>
                            Title <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                      {visibleColumns.location && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("location")}>
                            Location <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                      {visibleColumns.sellingMode && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("sellingMode")}>
                            Selling Mode <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                      {visibleColumns.status && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("status")}>
                            Status <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                      {visibleColumns.price && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("price")}>
                            Price <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                      {visibleColumns.creationDate && (
                        <th className="text-left p-2">
                          <Button variant="ghost" size="sm" onClick={() => handleSort("creationDate")}>
                            Creation Date <SortAsc className="h-3 w-3 ml-1" />
                          </Button>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssets.length > 0 ? (
                      paginatedAssets.map((asset) => (
                        <tr key={asset.id} className="border-b hover:bg-gray-50">
                          {visibleColumns.title && <td className="p-2">{asset.title}</td>}
                          {visibleColumns.location && <td className="p-2">{asset.location}</td>}
                          {visibleColumns.sellingMode && <td className="p-2">{asset.sellingMode}</td>}
                          {visibleColumns.status && <td className="p-2">{asset.status}</td>}
                          {visibleColumns.price && <td className="p-2">₦{asset.price.toLocaleString()}</td>}
                          {visibleColumns.creationDate && <td className="p-2">{asset.creationDate}</td>}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center text-muted-foreground py-4">
                          No assets found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm">Items per page:</span>
                <select 
                  value={itemsPerPage} 
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="border rounded p-1 text-sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span className="text-sm">
                  {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedAssets.length)}-
                  {Math.min(currentPage * itemsPerPage, filteredAndSortedAssets.length)} of {filteredAndSortedAssets.length}
                </span>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt; Prev
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next &gt;
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Last
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;