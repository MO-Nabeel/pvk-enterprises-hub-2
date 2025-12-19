import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Package,
    MapPin,
    Settings,
    LogOut,
    Camera,
    Heart,
    ShoppingBag,
    Bell,
    Shield,
    CreditCard,
    Edit2,
    Trash2,
    Plus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock Data
const MOCK_USER = {
    name: "Naleef Nabeel",
    email: "naleef@example.com",
    phone: "+91 98765 43210",
    avatar: "https://github.com/shadcn.png",
    joined: "March 2024",
};

const MOCK_ORDERS = [
    {
        id: "#ORD-7829",
        date: "Dec 12, 2024",
        status: "Delivered",
        total: "₹4,250",
        items: ["Custom Trophy (Gold)", "Premium Notebook x2"],
    },
    {
        id: "#ORD-7810",
        date: "Nov 28, 2024",
        status: "Processing",
        total: "₹1,850",
        items: ["Office Stationery Set"],
    },
    {
        id: "#ORD-7755",
        date: "Oct 15, 2024",
        status: "Cancelled",
        total: "₹950",
        items: ["Mobile Case (iPhone 15)"],
    },
];

const MOCK_ADDRESSES = [
    {
        id: 1,
        type: "Home",
        street: "123, Green Valley Apt, Civil Lines",
        city: "Malappuram",
        state: "Kerala",
        zip: "676505",
        default: true,
    },
    {
        id: 2,
        type: "Office",
        street: "PVK Tech Park, Infopark Road",
        city: "Kochi",
        state: "Kerala",
        zip: "682030",
        default: false,
    },
];

const CustomerProfile = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 mt-16 sm:mt-20">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-border">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="relative group">
                                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-lg">
                                    <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                        {MOCK_USER.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full shadow-md cursor-pointer hover:bg-primary/90 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                                    {MOCK_USER.name}
                                </h1>
                                <p className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
                                    {MOCK_USER.email} • <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Gold Member</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Member since {MOCK_USER.joined}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2 hidden sm:flex">
                            <LogOut className="h-4 w-4" /> Sign Out
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <nav className="space-y-2 lg:col-span-1">
                            {[
                                { id: "profile", label: "Profile Settings", icon: User },
                                { id: "orders", label: "My Orders", icon: Package },
                                { id: "wishlist", label: "Wishlist", icon: Heart },
                                { id: "addresses", label: "Addresses", icon: MapPin },
                                { id: "payment", label: "Payment Methods", icon: CreditCard },
                                { id: "security", label: "Security", icon: Shield },
                                { id: "notifications", label: "Notifications", icon: Bell },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </button>
                            ))}
                            <div className="pt-4 lg:hidden">
                                <Button variant="outline" className="w-full gap-2 justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </Button>
                            </div>
                        </nav>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

                                {/* PROFILE TAB */}
                                <TabsContent value="profile" className="space-y-6 m-0 animate-in fade-in-50 duration-300">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Personal Information</CardTitle>
                                            <CardDescription>Update your photo and personal details here.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">Full Name</Label>
                                                    <Input id="firstName" defaultValue={MOCK_USER.name} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input id="email" defaultValue={MOCK_USER.email} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input id="phone" defaultValue={MOCK_USER.phone} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="dob">Date of Birth</Label>
                                                    <Input id="dob" type="date" />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end gap-2 border-t pt-6">
                                            <Button variant="ghost">Cancel</Button>
                                            <Button>Save Changes</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                {/* ORDERS TAB */}
                                <TabsContent value="orders" className="space-y-6 m-0 animate-in fade-in-50 duration-300">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Ordering History</CardTitle>
                                            <CardDescription>Check the status of recent orders, manage returns, and download invoices.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {MOCK_ORDERS.map((order) => (
                                                    <div
                                                        key={order.id}
                                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors gap-4"
                                                    >
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-sm">{order.id}</span>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={`text-[10px] ${order.status === "Delivered"
                                                                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
                                                                            : order.status === "Cancelled"
                                                                                ? "bg-red-500/10 text-red-600 border-red-200"
                                                                                : "bg-amber-500/10 text-amber-600 border-amber-200"
                                                                        }`}
                                                                >
                                                                    {order.status}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                                                            <p className="text-xs text-muted-foreground">{order.date}</p>
                                                        </div>
                                                        <div className="flex items-center gap-4 justify-between sm:justify-end">
                                                            <span className="font-semibold text-sm">{order.total}</span>
                                                            <Button variant="outline" size="sm" className="h-8 text-xs">
                                                                View Details
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="border-t pt-6 flex justify-center">
                                            <Button variant="link" className="text-primary">View All Orders</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                {/* ADDRESSES TAB */}
                                <TabsContent value="addresses" className="space-y-6 m-0 animate-in fade-in-50 duration-300">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <div className="space-y-1">
                                                <CardTitle>Saved Addresses</CardTitle>
                                                <CardDescription>Manage your shipping and billing addresses.</CardDescription>
                                            </div>
                                            <Button size="sm" className="h-8 gap-1">
                                                <Plus className="h-3.5 w-3.5" /> Add New
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="mt-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {MOCK_ADDRESSES.map((addr) => (
                                                    <div
                                                        key={addr.id}
                                                        className="relative flex flex-col justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                                                    >
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-medium text-sm flex items-center gap-2">
                                                                    {addr.type === "Home" ? <Heart className="h-3.5 w-3.5 text-rose-500" /> : <Package className="h-3.5 w-3.5 text-blue-500" />}
                                                                    {addr.type}
                                                                </span>
                                                                {addr.default && (
                                                                    <Badge variant="secondary" className="text-[10px]">Default</Badge>
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground leading-relaxed">
                                                                <p>{MOCK_USER.name}</p>
                                                                <p>{addr.street}</p>
                                                                <p>{addr.city}, {addr.state} - {addr.zip}</p>
                                                                <p className="mt-1 font-medium text-foreground">{MOCK_USER.phone}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                                                            <Button variant="ghost" size="sm" className="h-7 text-xs flex-1">
                                                                <Edit2 className="h-3 w-3 mr-1.5" /> Edit
                                                            </Button>
                                                            <Separator orientation="vertical" className="h-4" />
                                                            <Button variant="ghost" size="sm" className="h-7 text-xs flex-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                <Trash2 className="h-3 w-3 mr-1.5" /> Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* WISHLIST TAB */}
                                <TabsContent value="wishlist" className="space-y-6 m-0 animate-in fade-in-50 duration-300">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>My Wishlist</CardTitle>
                                            <CardDescription>Items you saved for later.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center py-12 text-muted-foreground space-y-3">
                                                <Heart className="h-12 w-12 mx-auto text-muted-foreground/30" />
                                                <p>Your wishlist is currently empty.</p>
                                                <Button variant="link" className="text-primary">Browse Products</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* OTHER TABS PLACEHOLDERS */}
                                {["payment", "security", "notifications"].map((tab) => (
                                    <TabsContent key={tab} value={tab} className="space-y-6 m-0 animate-in fade-in-50 duration-300">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="capitalize">{tab}</CardTitle>
                                                <CardDescription>Manage your {tab} settings.</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="py-8 text-center text-muted-foreground">
                                                    <p>Settings for {tab} will appear here.</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                ))}

                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CustomerProfile;
