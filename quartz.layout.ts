import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "webamboos.com": "https://webamboos.com",
      GitHub: "https://github.com/webamboos",
      LinkedIn: "https://linkedin.com/company/webamboos",
      Facebook: "https://www.facebook.com/webamboos",
      Instagram: "https://www.instagram.com/webamboos",
    },
  }),
}

function explorer () {
  return Component.Explorer({
    sortFn(a, b) {
      const nameOrderMap: Record<string, number> = {
        "mindset": 100,

        "fundamentals": 200,
        "the-web": 201,
        "the-url": 202,
        "javascript": 203,
        "development-environment": 204,
        "package-management": 205,
        
        "backend": 300,
        "frontend": 400,
        "advanced": 500,
        "best-practices": 600,
        "resources": 700,
        "the-company": 800,
      }
   
      let orderA = 0
      let orderB = 0
   
      if (a.file && a.file.slug) {
        orderA = nameOrderMap[a.file.slug] || nameOrderMap[a.name] || 0
      } else if (a.name) {
        orderA = nameOrderMap[a.name] || 0
      }
   
      if (b.file && b.file.slug) {
        orderB = nameOrderMap[b.file.slug] || nameOrderMap[b.name] || 0
      } else if (b.name) {
        orderB = nameOrderMap[b.name] || 0
      }
   
      return orderA - orderB
    }
  })
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(explorer()),
  ],
  right: [],
}
