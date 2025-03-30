import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import banner1 from "../assets/images/discount1.png";
import banner2 from "../assets/images/discount2.png";
import banner3 from "../assets/images/discount3.png";

export default function BannerCarousel() {
  return (
    <section className="relative px-6">
      <Swiper
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-40 rounded-2xl"
      >
        {[banner1, banner2, banner3].map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} className="w-full h-40 object-cover" alt={`banner ${index + 1}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
