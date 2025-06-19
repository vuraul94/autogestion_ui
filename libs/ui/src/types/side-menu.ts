export type SideMenuLinks = {
  text: string;
  icon: [string, string];
  route: string;
}

export type SideMenuProps = {
  links: SideMenuLinks[];
  isMobile?: boolean;
  logoSrc: string;
}
