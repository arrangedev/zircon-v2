import SiteAside from "@/components/site-aside";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteAside>
        <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      </SiteAside>
    </>
  );
}
