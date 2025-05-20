import '@/webroute/styles/global.scss'
import '@/globals.css' 
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import { getMetadata } from '@/utlis/metaData';
import { FooterProvider } from '@/context/FooterContext';
import { HeaderProvider } from '@/context/HeaderContext';
type Params = {
  __segment?: string;
  [key: string]: string | undefined;
};
export async function generateMetadata({ params }: { params?: Params }) {
  const segment = params?.__segment ?? '';
  const pathname = `/${segment}`;
  return getMetadata(pathname);
}

async function getHeaderData() {
  const res = await fetch(`${process.env.LOCAL_URL}/api/header`, {
    cache: 'no-store',
  });
  return res.json();
}

async function getFooterData() {
  const res = await fetch(`${process.env.LOCAL_URL}/api/footer`, {
    cache: 'no-store',
  });
  return res.json();
}




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const headerData = await getHeaderData();
  const footerData = await getFooterData();
  return (
    <html lang="en">
      <body>
        <HeaderProvider initialData={headerData} >
          <Header />
        </HeaderProvider>
        {children}
        <FooterProvider initialData={footerData} >
        <Footer />
        </FooterProvider>
      </body>
    </html>
  )
}
