// app/location/page.tsx
import Location from '../../components/Location';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function LocationPage() {
 return (
   <div>
     <Header />
     <div className="pt-20"> {/* Add padding top to account for fixed header */}
       <Location />
     </div>
     <Footer />
   </div>
 );
}