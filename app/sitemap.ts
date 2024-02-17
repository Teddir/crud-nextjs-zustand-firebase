import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.velociti-group.co.uk", // example
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
