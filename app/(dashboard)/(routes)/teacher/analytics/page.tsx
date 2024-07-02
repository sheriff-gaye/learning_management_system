import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import AnalyticsPageSkeleton from "./_components/AnalyticsSkeleton";

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    data,
    totalRevenue,
    totalSales,
    totalUsers,
    newsLetter
  } = await getAnalytics(userId);


  if (!data || !totalRevenue || !totalSales || !totalUsers || !newsLetter) {
    return <AnalyticsPageSkeleton />;
  }

  return ( 
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
         <DataCard
          label="Newsletter Subscription"
          value={newsLetter}
        />
        <DataCard
          label="Users"
          value={totalUsers}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
   );
}
 
export default AnalyticsPage;