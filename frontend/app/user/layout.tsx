import CDashboardLayout from "@/components/dashboard/CDashboardLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CDashboardLayout>
      <div className="w-full flex flex-col gap-4">{children}</div>
    </CDashboardLayout>
  );
};

export default DashboardLayout;
