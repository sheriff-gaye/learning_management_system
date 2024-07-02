import { Skeleton } from "@/components/ui/skeleton";

export const DataTableSkeleton= ()=>{
    const skeletonRows = Array.from({ length: 5 }, (_, index) => index);
    return (
      <div>
        <div className="flex items-center py-4 justify-between">
          <Skeleton className="w-48 h-10" />
          <Skeleton className="w-32 h-10" />
        </div>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="w-32 h-4" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="w-32 h-4" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Skeleton className="w-32 h-4" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {skeletonRows.map((index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="w-full h-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
      </div>
    );
  }