import { Metadata } from 'next';
import metaData from './metaData.json'


export const getMetadata = (pathname: string): Metadata => {
  const defaultMetadata: Metadata = {
    title: 'MyApp',
    description: 'The best solution for your needs',
  };
  const route=Object.keys(metaData).find((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  return route ? metaData[route as keyof typeof metaData] : defaultMetadata;
};