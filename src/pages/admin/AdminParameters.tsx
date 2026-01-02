import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";

const AdminParameters = () => {
  return (
    <AdminLayout title="Parameters">
      <section className="grid gap-6">
        <Card className="border-none shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm text-card-foreground">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base font-semibold text-foreground">
                System Parameters
              </CardTitle>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Configure system-wide settings and parameters for PVK Enterprises.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="PVK Enterprises" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="info@pvkenterprises.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input id="phone-number" type="tel" placeholder="+91 91421 07707" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                <Input id="whatsapp-number" type="tel" placeholder="+91 91421 07707" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                placeholder="Enter business address"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between rounded-md border border-dashed border-border bg-muted px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Parameter Management</p>
                <p className="text-xs text-muted-foreground">
                  Configure additional system parameters and settings.
                </p>
              </div>
              <Badge variant="outline" className="text-[11px]">
                Coming Soon
              </Badge>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminParameters;

