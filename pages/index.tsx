import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, Plus, Download, MoreHorizontal, ChevronDown, Calendar, Columns, RotateCcw, SortAsc } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IndexPage = () => {
  const router = useRouter();

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [location, setLocation] = useState("");
  const [sellingMode, setSellingMode] = useState("");
  const [status, setStatus] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [creationDateFrom, setCreationDateFrom] = useState<Date | null>(null);
  const [creationDateTo, setCreationDateTo] = useState<Date | null>(null);

  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  // State for column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    adId: true,
    sellerName: true,
    askingPrice: true,
    location: true,
    sellingMode: true,
    adTitle: true,
    creationDate: true,
    status: true,
    actions: true,
  });

  // State for advanced filter toggle
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // State for column selection dropdown
  const [isColumnSelectOpen, setIsColumnSelectOpen] = useState(false);
  const columnSelectRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnSelectRef.current && !columnSelectRef.current.contains(event.target as Node)) {
        setIsColumnSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock data for the dashboard
  const overviewData = [
    { title: "Total created", value: "107" },
    { title: "Total active", value: "70" },
    { title: "Total Sold with Payment Protection", value: "27" },
    { title: "Total Sold w/o Payment Protection", value: "10" },
  ];

  const tableData = [
    {
      id: 3,
      sellerName: "John Doe",
      askingPrice: 1000,
      location: "Lagos",
      sellingMode: "Auction",
      adTitle: "Used iPhone 12",
      creationDate: "2025-10-12",
      status: "Active",
    },
    {
      id: 556,
      sellerName: "Jane Smith",
      askingPrice: 2500,
      location: "Abuja",
      sellingMode: "Direct Sale",
      adTitle: "MacBook Pro M3",
      creationDate: "2025-10-11",
      status: "Active",
    },
    {
      id: 88,
      sellerName: "Mike Johnson",
      askingPrice: 800,
      location: "Lagos",
      sellingMode: "Auction",
      adTitle: "Samsung Galaxy S24",
      creationDate: "2025-10-10",
      status: "Sold",
    },
    {
      id: 89,
      sellerName: "Sarah Wilson",
      askingPrice: 1500,
      location: "Port Harcourt",
      sellingMode: "Direct Sale",
      adTitle: "Dell XPS 13",
      creationDate: "2025-10-09",
      status: "Active",
    },
    {
      id: 8,
      sellerName: "David Brown",
      askingPrice: 300,
      location: "Kano",
      sellingMode: "Auction",
      adTitle: "AirPods Pro",
      creationDate: "2025-10-08",
      status: "Pending",
    },
    {
      id: 9,
      sellerName: "Lisa Davis",
      askingPrice: 2000,
      location: "Lagos",
      sellingMode: "Direct Sale",
      adTitle: "Sony WH-1000XM5",
      creationDate: "2025-10-07",
      status: "Active",
    },
    {
      id: 97,
      sellerName: "Tom Anderson",
      askingPrice: 350,
      location: "Abuja",
      sellingMode: "Auction",
      adTitle: "Nintendo Switch OLED",
      creationDate: "2025-10-06",
      status: "Sold",
    },
    {
      id: 4,
      sellerName: "Emma Taylor",
      askingPrice: 1800,
      location: "Lagos",
      sellingMode: "Direct Sale",
      adTitle: "Canon EOS R6",
      creationDate: "2025-10-05",
      status: "Active",
    },
    {
      id: 76,
      sellerName: "Chris Martin",
      askingPrice: 550,
      location: "Ibadan",
      sellingMode: "Auction",
      adTitle: "Google Pixel 8",
      creationDate: "2025-10-04",
      status: "Pending",
    },
    {
      id: 78,
      sellerName: "Anna White",
      askingPrice: 1400,
      location: "Lagos",
      sellingMode: "Direct Sale",
      adTitle: "Surface Pro 9",
      creationDate: "2025-10-03",
      status: "Active",
    },
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...tableData];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(item =>
        item.adTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply advanced filters
    if (itemTitle) {
      result = result.filter(item => item.adTitle.toLowerCase().includes(itemTitle.toLowerCase()));
    }
    if (location) {
      result = result.filter(item => item.location === location);
    }
    if (sellingMode) {
      result = result.filter(item => item.sellingMode === sellingMode);
    }
    if (status) {
      result = result.filter(item => item.status === status);
    }
    if (priceMin) {
      result = result.filter(item => item.askingPrice >= parseFloat(priceMin));
    }
    if (priceMax) {
      result = result.filter(item => item.askingPrice <= parseFloat(priceMax));
    }
    if (creationDateFrom && creationDateTo) {
      result = result.filter(item => {
        const itemDate = new Date(item.creationDate);
        return itemDate >= creationDateFrom && itemDate <= creationDateTo;
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
  }, [tableData, searchTerm, itemTitle, location, sellingMode, status, priceMin, priceMax, creationDateFrom, creationDateTo, sortConfig]);

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
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <Button variant="outline" className="border-gray-300 text-gray-700">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Table Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Filter Toolbar */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search assets"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={() => handleSort("adTitle")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Sort
              </Button>
              <Collapsible open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 font-semibold">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute right-0 top-full mt-2 bg-white border rounded-md shadow-lg p-4 z-50 w-96">
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
                      <Select value={location || "any"} onValueChange={(value) => setLocation(value === "any" ? "" : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
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
                      <Select value={sellingMode || "any"} onValueChange={(value) => setSellingMode(value === "any" ? "" : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="Auction">Auction</SelectItem>
                          <SelectItem value="Direct Sale">Direct Sale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={status || "any"} onValueChange={(value) => setStatus(value === "any" ? "" : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
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
                          className="border rounded p-2 text-sm w-full"
                          placeholderText="From"
                          dateFormat="dd/MM/yyyy"
                          withPortal
                        />
                        <DatePicker
                          selected={creationDateTo}
                          onChange={setCreationDateTo}
                          className="border rounded p-2 text-sm w-full"
                          placeholderText="To"
                          dateFormat="dd/MM/yyyy"
                          withPortal
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className="relative" ref={columnSelectRef}>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsColumnSelectOpen(!isColumnSelectOpen)}
                >
                  <Columns className="mr-2 h-4 w-4" />
                  Select Columns
                </Button>
                {isColumnSelectOpen && (
                  <div className="absolute top-full mt-2 bg-white border rounded-md shadow-lg p-4 z-50 w-48">
                    <div className="space-y-2">
                      {Object.entries(visibleColumns).map(([key, visible]) => (
                        <label key={key} className="flex items-center gap-2">
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
                  </div>
                )}
              </div>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <Calendar className="mr-2 h-4 w-4" />
                Date
              </Button>
            </div>
          </div>

        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                </th>
                {visibleColumns.adId && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("id")}>
                      Ad ID <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.sellerName && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("sellerName")}>
                      Seller Name <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.askingPrice && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("askingPrice")}>
                      Asking Price <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.location && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("location")}>
                      Item Location <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.sellingMode && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("sellingMode")}>
                      Selling Mode <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.adTitle && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("adTitle")}>
                      Ad Title <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.creationDate && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("creationDate")}>
                      Creation Date <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.status && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <Button variant="ghost" size="sm" onClick={() => handleSort("status")}>
                      Status <SortAsc className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                )}
                {visibleColumns.actions && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/delivery-details')}>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    </td>
                    {visibleColumns.adId && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.id}</td>}
                    {visibleColumns.sellerName && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.sellerName}</td>}
                    {visibleColumns.askingPrice && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">₦{item.askingPrice.toLocaleString()}</td>}
                    {visibleColumns.location && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.location}</td>}
                    {visibleColumns.sellingMode && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.sellingMode}</td>}
                    {visibleColumns.adTitle && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.adTitle}</td>}
                    {visibleColumns.creationDate && <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-800">{item.creationDate}</td>}
                    {visibleColumns.status && (
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            item.status === 'Active' ? 'bg-green-500' :
                            item.status === 'Sold' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm text-gray-800">{item.status}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-6 py-5 whitespace-nowrap text-sm">
                        <Link href="/delivery-details" onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                            MORE
                          </Button>
                        </Link>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="px-6 py-5 text-center text-sm text-gray-500">
                    No assets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <span>Items per page</span>
            <select className="border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500">
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-700">
              1-10 of 50
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                First
              </Button>
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
              <Button variant="outline" size="sm">
                Last
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;