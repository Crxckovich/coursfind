export interface FooterProps {
  navItems: {
    title: string
    url: string
    items?: { title: string; url: string }[]
  }[]
}