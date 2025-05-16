import '@/globals.css' 
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import { getMetadata } from '@/utlis/metaData';

type Params = {
  __segment?: string;
  [key: string]: string | undefined;
};

export async function generateMetadata({ params }: { params?: Params }) {
  const segment = params?.__segment ?? '';
  const pathname = `/${segment}`;
  return getMetadata(pathname);
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
