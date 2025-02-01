import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",

  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;
    console.log("server identity", await ctx.auth.getUserIdentity());
    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      //add more event types such as through invitation
      //add guest function
      switch (result.type) {
        case "user.created":
          console.log("server identity", await ctx.auth.getUserIdentity());
          await ctx.runMutation(internal.users.createUser, {
            tokenIdentifier: `https://${process.env.CLERK_JWT_ISSUER_DOMAIN}|${result.data.id}`,
            name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
            image: result.data.image_url,
          });

          break;

        case "user.updated":
          console.log("server identity", await ctx.auth.getUserIdentity());
          await ctx.runMutation(internal.users.updateUser, {
            tokenIdentifier: `https://${process.env.CLERK_JWT_ISSUER_DOMAIN}|${result.data.id}`,
            name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
            image: result.data.image_url,
          });

          break;

        case "organizationMembership.created":
          console.log("server identity", await ctx.auth.getUserIdentity());
          await ctx.runMutation(internal.users.addOrgIdToUser, {
            tokenIdentifier: `https://${process.env.CLERK_JWT_ISSUER_DOMAIN}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === "admin" ? "admin" : "member",
          });

        case "organizationMembership.updated":
          console.log("server identity", await ctx.auth.getUserIdentity());
          await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
            tokenIdentifier: `https://${process.env.CLERK_JWT_ISSUER_DOMAIN}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === "org:admin" ? "admin" : "member",
          });

          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
