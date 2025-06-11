import { Carousel } from "flowbite-react";

import banner1 from "../assets/images/discount2.png";
import banner2 from "../assets/images/discount3.png";

export default function BannerCarousel() {
  return (
    <section className="px-6">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {[banner1, banner2].map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Discount Banner ${index + 1}`}
              className="w-full h-full object-cover object-center rounded-lg"
              loading="lazy"
              draggable="false"
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
