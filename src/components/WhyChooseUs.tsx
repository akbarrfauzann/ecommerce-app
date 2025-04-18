import { LiaShippingFastSolid } from "react-icons/lia";
import { TbClock24 } from "react-icons/tb";
import { RiExchangeDollarFill } from "react-icons/ri";

const WhyChooseUs = () => {
  return (
    <section className="px-6 py-8">
      <div className="dark:text-white">
        <h2 className="text-3xl font-bold text-center uppercase">
          Why{" "}
          <span className="text-primary dark:text-dark-secondary">Choose</span>{" "}
          Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex flex-col items-center">
            <LiaShippingFastSolid className="text-5xl" />
            <h3 className="text-xl font-semibold mt-4">Free Shipping</h3>
            <p className="text-center text-secondary dark:text-tertiary mt-2">
              Free shipping in the Bogor area.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <RiExchangeDollarFill className="text-5xl" />
            <h3 className="text-xl font-semibold mt-4">Money Return</h3>
            <p className="text-center text-secondary dark:text-tertiary mt-2">
              Money back if the item is not suitable.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <TbClock24 className="text-5xl" />
            <h3 className="text-xl font-semibold mt-4">24/7 Support</h3>
            <p className="text-center text-secondary dark:text-tertiary mt-2">
              We provide 24/7 support for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
