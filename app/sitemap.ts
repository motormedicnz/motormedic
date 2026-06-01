import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://motormedic.co.nz",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://motormedic.co.nz/about",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://motormedic.co.nz/services",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://motormedic.co.nz/contact",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}