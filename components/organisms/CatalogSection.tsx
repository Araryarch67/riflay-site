import { FEATURE_COUNT } from "@/lib/features";
import { FeatureCatalog } from "@/components/organisms/FeatureCatalog";

export function CatalogSection() {
  return (
    <section className="section" id="all-features" aria-labelledby="all-title">
      <header className="section__head section__head--split reveal">
        <h2 id="all-title" className="display-medium">
          All {FEATURE_COUNT} features.
        </h2>
        <p className="body-large muted">
          Everything Riflay does, by area, and where it works. “Computers” means
          Windows, macOS and Linux.
        </p>
      </header>
      <div className="reveal">
        <FeatureCatalog />
      </div>
    </section>
  );
}
