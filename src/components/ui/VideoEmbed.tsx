/**
 * Responsive YouTube embed for workshop reference videos.
 * Uses youtube-nocookie for slightly better privacy defaults.
 */

type VideoEmbedProps = {
  videoId: string;
  title: string;
};

export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
