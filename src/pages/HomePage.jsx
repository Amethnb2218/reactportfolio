import ExperienceSection from "../components/ExperienceSection.jsx";
import HeroSection from "../components/HeroSection.jsx";
import HomePortfolioSection from "../components/HomePortfolioSection.jsx";
import ProfileSection from "../components/ProfileSection.jsx";
import Topbar from "../components/Topbar.jsx";

export default function HomePage() {
  return (
    <>
      <header className="hero" id="accueil">
        <Topbar />
        <HeroSection />
      </header>
      <main id="contenu-principal">
        <HomePortfolioSection />
        <ProfileSection />
        <ExperienceSection />
      </main>
    </>
  );
}
