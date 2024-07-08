import fs from "node:fs/promises";

export async function PUT(req: Request) {
  const formData = await req.formData();
  if (formData.get("file")) {
    const file = formData.get("file");

    console.log({file: file});

    await fs.writeFile("/uploads/image/profile.jpg", file?.toString()!);
  }

  return Response.json(true);
}
