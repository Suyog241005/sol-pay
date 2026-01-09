import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const BlogPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const blogs = await prisma.articles.findMany({
    where: {
      published: true,
    },
  });

  return (
    <div className="h-full w-full flex flex-col items-center gap-y-5">
      <div className="h-full w-full">
        {!!blogs && blogs.map((blog) => <div key={blog.id}>{blog.title}</div>)}
        {!blogs && <div className="text-white">No blogs found</div>}
      </div>
    </div>
  );
};
