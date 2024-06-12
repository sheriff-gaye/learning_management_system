// "use server";

// import { stripe, PLANS } from "@/lib/stripe";
// import { getAbsoluteUrl } from "@/lib/utils";
// import { auth, User } from "@clerk/nextjs/server";

// export const createStripeSession = async () => {
//   const { userId } = await auth();

//   if (!userId) return { error: "Not authenticated" };

//   const billingUrl = getAbsoluteUrl("/dashboard/billing");

//   const user = await User.g(userId);

//   if (!user) return { error: "User not found" };

//   const subscriptionPlan = await getUserSubscriptionPlan(userId);

//   // If user is subscribed, take them to a page to manage their subscription
//   if (subscriptionPlan.isSubscribed && user.publicMetadata.stripeCustomerId) {
//     const stripeSession = await stripe.billingPortal.sessions.create({
//       customer: user.publicMetadata.stripeCustomerId,
//       return_url: billingUrl,
//     });
//     return { url: stripeSession.url };
//   }

//   // If user is not subscribed, take them to a page to subscribe
//   const stripeSession = await stripe.checkout.sessions.create({
//     success_url: billingUrl,
//     cancel_url: billingUrl,
//     payment_method_types: ["card", "paypal"],
//     mode: "subscription",
//     billing_address_collection: "auto",
//     line_items: [
//       {
//         price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
//         quantity: 1,
//       },
//     ],
//     metadata: {
//       userId: userId,
//     },
//   });

//   return { url: stripeSession.url };
// };
