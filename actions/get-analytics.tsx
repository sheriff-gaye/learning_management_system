import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";
import { error } from "console";
import { clerkClient } from "@clerk/nextjs";
type PurchaseWithCourse = Purchase & {
  course: Course;
};


const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true
      }
    });

    const groupedEarning = groupByCourse(purchases);
    const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total
    }));

    const newsLetter=await db.newsLetter.count();
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const users = await clerkClient.users.getCount();
    const totalUsers= users;



    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
      totalUsers,
      newsLetter
    };
  } catch {
    console.log("[GET ANALUTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      totalUsers:0,
      newsLetter:0
    };
  }
};
