import { getMetadata } from '@/utlis/metaData';

export async function generateMetadata() {
  return getMetadata('/CreateLead');
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
