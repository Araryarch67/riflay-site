import { StructuredData } from "@/components/atoms/StructuredData";
import { buildStructuredData } from "@/lib/seo";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FormatsMarquee } from "@/components/organisms/FormatsMarquee";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import { IslandShowcase } from "@/components/organisms/IslandShowcase";
import { NumbersSection } from "@/components/organisms/NumbersSection";
import { MakeItYoursSection } from "@/components/organisms/MakeItYoursSection";
import { CatalogSection } from "@/components/organisms/CatalogSection";
import { ScreenshotsSection } from "@/components/organisms/ScreenshotsSection";
import { InstallSection } from "@/components/organisms/InstallSection";
import { FaqSection } from "@/components/organisms/FaqSection";
import { ClosingSection } from "@/components/organisms/ClosingSection";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { TopAppBar } from "@/components/organisms/TopAppBar";
import { Icon } from "@/components/atoms/Icon";
import { Snackbar } from "@/components/molecules/Snackbar";
import { PageEffects } from "@/components/providers/PageEffects";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import type { Release } from "@/lib/release";
/** The page composes sections; data loading stays in the Next.js route. */
export function LandingPage({ release }: { release: Release }) {
  return (
    <>
      <StructuredData data={buildStructuredData(release)} />
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopAppBar />
      <main id="main">
        <HeroSection release={release} />
        <FormatsMarquee />
        <FeaturesSection />
        <IslandShowcase />
        <NumbersSection />
        <MakeItYoursSection />
        <CatalogSection />
        <ScreenshotsSection />
        <InstallSection release={release} />
        <FaqSection />
        <ClosingSection />
      </main>
      <a
        className="fab"
        href="#install"
        aria-label="Download Riflay"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Icon name="download" />
        <span className="fab__label">Download</span>
      </a>
      <Snackbar />
      <PageEffects />
      <SmoothScroll />
      <SiteFooter release={release} />
    </>
  );
}
