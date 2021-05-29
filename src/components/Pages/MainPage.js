import HeroBlock from '../HeroBlock/HeroBlock';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import PageMainContent from '../PageMainContent/PageMainContent';

const MainPage = () => {
  return (
    <>
      <PageMainContent>
        <HeroBlock />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </PageMainContent>
      <Footer />
    </>
  );
}

export default MainPage;
