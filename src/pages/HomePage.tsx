import BannerCarousel from "../components/BannerCarousel";
import NewArrivals from "../components/NewArrivals";
import WhyChooseUs from "../components/WhyChooseUs";
import OurProducts from "./OurProducts";
import InfiniteMarquee from "../components/InfiniteMarquee";

export default function HomePage() {
  return (
    <main className="dark:bg-dark">
      <BannerCarousel />
      <NewArrivals />
      <OurProducts />
      <WhyChooseUs />
      <InfiniteMarquee />
    </main>
  );
}
