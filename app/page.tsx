import { LandingPage } from "@/components/templates/LandingPage";
import { latestRelease } from "@/lib/release";
export const revalidate = 3600;
export default async function Home() {
  return <LandingPage release={await latestRelease()} />;
}
