import Bookmarks from '@/components/Bookmarks';
import BottomNavbar from '@/components/BottomNavbar';
import withAuth from '@/components/HOC/ProtectedRoutes';
import Profile from '@/components/Profile';
import Services from '@/components/Services';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query;

  const renderComponent = () => {
    switch (slug) {
      case 'home':
        return <Bookmarks />;
      case 'services':
        return <Services />;
      case 'profile':
        return <Profile />;
      default:
        return <div>404 - Component not found</div>;
    }
  };

  return (
    <div className='p-[16px]'>
      {renderComponent()}
      <BottomNavbar/>
    </div>
  );
};

export default withAuth(Dashboard);


// eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.ks-X4Qa3a_btYvZBX6tKuY2xONTq-3MkJUe-nQEwKGE9_wdGMybhdRtEjpy9i2z8XbKJ8ETF2ERRAJx_1kvCYvdDBhE8KfpD.PR5DWH9f3vtkWpdRzlsupg.ZQvVM5qLeZvA24h4rHnatIwyEo9X-3tPFhgmdT5aaBO4OgzOdglvyNOgSOTL43WOkU_VyHg09fyG1ZB4H6g5Qle0_nEPP6KSGmMFneamrrksEZoRdI3BtUMmFk79z-HXK7XOAvfiR-PncUICprAYuI7ChSl56R2f7drc1A4i4Ew._B5fljZ0CYg5C5l5lOpnLnmpKRcWBOwTEb1iqTaln_o

// zjOK5-hnePCsgIkQzCS_GCYGhO_otLpN0Y5Kkik.Sy13tDi4bc9pnzhyqQQQQmuEqwctKh4bME6fbIx9HXM eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.3keOJUq3dY41OmUEARx5VuZW6tkgPAzEFXc3oLbQKNd05pNaBGcdFYoVaYZTC92PM8A2fu9HxoEBVxRGPyMxYMgcSq4D0ILR.vSG3vavtIwCGWlcUhRRi0w.7cO7fM0CbgiLU6Dgu_H0blZ_DZ8X2Wrpg_FGUffQ4S2AOUVcmwmlSPYRLGhe1_91eYVds1ZHk0A8Lw9Z__UE8mz-qYko6EQgaaaABoFhpx5LZOSrpIO-7El-FmGM4C3q5vB8zjOK5-hnePCsgIkQzCS_GCYGhO_otLpN0Y5Kkik.Sy13tDi4bc9pnzhyqQQQQmuEqwctKh4bME6fbIx9HXM