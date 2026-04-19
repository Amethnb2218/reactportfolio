import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import PortfolioIntroSection from "./components/PortfolioIntroSection.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import Topbar from "./components/Topbar.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";

export default function App() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#contenu-principal">
        Aller au contenu principal
      </a>
      <header className="hero" id="accueil">
        <Topbar />
        <HeroSection />
      </header>
      <main id="contenu-principal">
        <ProfileSection />
        <ExperienceSection />
        <PortfolioIntroSection />
      </main>
      <Footer />
    </div>
  );
}
