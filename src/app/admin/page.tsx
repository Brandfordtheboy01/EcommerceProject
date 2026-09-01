import DashboardPage from "@/app/dashboard/page";

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="bg-amber-500 text-white px-4 py-2 text-xs font-bold text-center">
        SUPER ADMIN PORTAL — System Metrics, Vendor Management, & Global Analytics
      </div>
      <DashboardPage />
    </div>
  );
}
