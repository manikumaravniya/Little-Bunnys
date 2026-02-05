import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DressCollection from "@/components/DressCollection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <DressCollection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
