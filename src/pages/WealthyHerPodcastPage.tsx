import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  WELCOME_IONO_SRC,
  type PodcastEpisode,
  type PodcastSeries,
  featuredSpotlights,
  podcastHero,
  podcastSeries,
  podcastToc,
  podcastWelcome,
} from "@/data/wealthyHerPodcastContent";
import "./wealthy-her-podcast.css";

function PodcastAudioFrame({ src, label }: { src: string; label: string }) {
  return (
    <div className="wh-audio-frame wh-audio-frame--iono">
      <iframe
        src={src}
        title={`Listen: ${label}`}
        width="100%"
        height={50}
        loading="lazy"
        referrerPolicy="origin"
        frameBorder={0}
        className="wh-audio-frame__iframe"
      />
    </div>
  );
}

function BookGardenRouteLink({ className }: { className?: string }) {
  return (
    <Link className={className} to="/booking?source=carrick">
      Book with Garden Route
    </Link>
  );
}

function EpisodeBlock({ ep }: { ep: PodcastEpisode }) {
  return (
    <article className="wh-episode" aria-labelledby={`ep-title-${ep.id}`}>
      {ep.label ? <p className="episode-card__meta">{ep.label}</p> : null}
      <h3 className="wh-episode__title" id={`ep-title-${ep.id}`}>
        {ep.title}
      </h3>
      {ep.description ? <p className="wh-episode__body">{ep.description}</p> : null}
      {ep.audioEmbedSrc ? <PodcastAudioFrame src={ep.audioEmbedSrc} label={ep.title} /> : null}
      {ep.spotifyListenUrl ? (
        <p className="wh-spotify-link">
          <a className="text-link" href={ep.spotifyListenUrl} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </a>
          <span className="wh-spotify-link__note"> — full episode</span>
        </p>
      ) : null}
      {ep.related && ep.related.length > 0 ? (
        <ul className="wh-related" aria-label="Related topics in the series">
          {ep.related.map((r) => (
            <li key={r}>
              <span className="wh-related__chip">{r}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function SeriesSection({ series }: { series: PodcastSeries }) {
  return (
    <section id={series.id} className="wh-series resource-anchor services section">
      <div className="container">
        {series.eyebrow ? <p className="eyebrow">{series.eyebrow}</p> : null}
        <h2>{series.title}</h2>
        {series.intro ? <p className="wh-series__intro">{series.intro}</p> : null}
        <div className="wh-episode-list">
          {series.episodes.map((ep) => (
            <EpisodeBlock key={ep.id} ep={ep} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WealthyHerPodcastPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page podcast-page">
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">WEALTHY HER PODCAST · GARDEN ROUTE</p>
            <h1>{podcastHero.title}</h1>
            <p className="podcast-hero__tag">{podcastHero.tagline}</p>
            <p className="page-lead">
              Garden Route continues the Wealthy Her series: practical conversations on marriage, divorce, wealth, and legacy—with inline
              audio where available and Spotify for selected full episodes.
            </p>
            <p className="page-stack">
              <BookGardenRouteLink className="btn btn-primary wh-podcast-cta-btn" />
            </p>
          </div>
        </section>

        <div className="wh-podcast-cta-bar" aria-label="Garden Route booking">
          <div className="container">
            <p>
              Garden Route is Carrick Wealth&apos;s programme for women navigating pivotal financial moments. Use these episodes alongside
              one-to-one advice to prepare for marriage, divorce, widowhood, trusts, wills, and lasting financial freedom.
            </p>
            <BookGardenRouteLink className="btn btn-secondary wh-podcast-cta-btn" />
          </div>
        </div>

        <nav className="wh-toc-wrap" aria-label="On this page">
          <div className="container">
            <ul className="wh-toc">
              {podcastToc.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <section id="welcome" className="resource-anchor resources section">
          <div className="container">
            <p className="eyebrow">WHY THIS PODCAST</p>
            <h2>{podcastWelcome.title}</h2>
            <p className="wh-subhead">{podcastWelcome.subtitle}</p>
            <PodcastAudioFrame src={WELCOME_IONO_SRC} label={podcastWelcome.subtitle} />
            {podcastWelcome.paragraphs.map((para, i) => (
              <p key={i} className="page-lead">
                {para}
              </p>
            ))}
            <p className="wh-host">— {podcastWelcome.host}</p>
            <p className="wh-footnote">
              Episode summaries support education only. For personal advice, speak with a Garden Route wealth manager—start from{" "}
              <Link className="text-link" to="/booking?source=carrick">
                Book a consultation
              </Link>{" "}
              or explore{" "}
              <Link className="text-link" to="/resources">
                Resources
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="featured" className="resource-anchor services section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">DIVORCE SERIES</p>
              <h2>How to get divorced before you get married</h2>
            </div>
            <p className="wh-series__intro">
              A structured path through marriage contracts, divorce, maintenance, trusts, and real stories—so you are informed before life
              takes a turn.
            </p>
            <div className="wh-episode-list">
              {featuredSpotlights.map((ep) => (
                <EpisodeBlock key={ep.id} ep={ep} />
              ))}
            </div>
          </div>
        </section>

        {podcastSeries.map((series) => (
          <SeriesSection key={series.id} series={series} />
        ))}

        <section className="cta section" aria-labelledby="podcast-cta">
          <div className="container cta-wrap">
            <h2 id="podcast-cta">Turn what you learn into a plan that fits your regime, your family, and your goals.</h2>
            <div className="cta-actions">
              <Link className="btn btn-secondary" to="/resources">
                More resources
              </Link>
              <Link className="btn btn-primary" to="/booking?source=carrick">
                Book consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
