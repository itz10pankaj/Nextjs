// types/footer.ts
export interface FooterSectionHeader {
  label: string;
  headerid: number;
}

export interface FooterSectionLink {
  label: string;
  href: string;
  headerid: number;
}

export interface FooterImageItem {
  src: string;
  alt: string;
}

export interface FooterData {
  footerSectionsHeaders: FooterSectionHeader[];
  footerSectionLinks: FooterSectionLink[];
  footerApps: FooterImageItem[];
  footerVentures: FooterImageItem[];
}
