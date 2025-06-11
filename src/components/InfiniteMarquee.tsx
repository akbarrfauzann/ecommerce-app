import Marquee from "react-fast-marquee";
import adidas from "../assets/images/brands/adidas.png";
import nike from "../assets/images/brands/nike.png";
import carhatt from "../assets/images/brands/carhatt.png";
import stussy from "../assets/images/brands/stussy.png";
import champion from "../assets/images/brands/champion.png";

type Brand = {
  id: number;
  name: string;
  image: string;
};

const InfiniteMarquee = () => {
  const brands: Brand[] = [
    { id: 1, name: "Adidas", image: adidas },
    { id: 2, name: "Nike", image: nike },
    { id: 3, name: "Carhatt", image: carhatt },
    { id: 4, name: "Stussy", image: stussy },
    { id: 5, name: "Champion", image: champion },
  ];
  return (
    <section>
      <div className="px-6 py-18 bg-tertiary">
        <h1 className="text-2xl md:text-3xl font-bold italic text-center uppercase">
          Shop <span className="text-primary">Popular</span> Vintage Brands
        </h1>
        <Marquee className="my-20" autoFill={true} gradient={false} speed={50}>
          <div className="flex items-center gap-12 mx-8">
            {brands.map((brand) => (
              <img
                key={brand.id}
                src={brand.image}
                alt={brand.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div className="bg-white h-60 flex flex-col items-center justify-center italic dark:bg-dark">
        <p className="text-primary dark:text-white text-center text-2xl md:text-3xl font-bold">
          F*CK FAST FASHION,
        </p>
        <p className="text-primary dark:text-white text-center text-2xl md:text-3xl font-bold mt-2">
          SHOP SECOND HAND.
        </p>
      </div>
    </section>
  );
};

export default InfiniteMarquee;
