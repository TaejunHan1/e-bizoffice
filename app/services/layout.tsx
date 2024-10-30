// app/services/layout.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className="pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}