import { resolveMediaUrl } from "@/lib/api";
import { getAboutGallery } from "@/lib/about";

export async function AboutGallery() {
  const images = await getAboutGallery();

  if (images.length === 0) {
    return <p className="about-gallery__empty">Le foto verranno aggiunte a breve.</p>;
  }

  return (
    <div className="rv about-gallery__grid">
      {images.map((img, i) => (
        <div
          key={img.id}
          className={`about-gallery__tile about-gallery__tile--photo${i % 2 === 1 ? " about-gallery__tile--offset" : ""}`}
        >
          <img className="about-gallery__tile-img" src={resolveMediaUrl(img.image)} alt={img.caption} />
          <div className="about-gallery__tile-scrim" />
          <span className="about-gallery__tile-caption">{img.caption}</span>
        </div>
      ))}
    </div>
  );
}
