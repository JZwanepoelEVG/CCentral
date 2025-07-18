"use client"
import { useThemeStore } from "../../../../../themeStore";
import Image from "next/image";
import bg from "@/public/images/auth/bg-2.jpg"
import slider1 from "@/public/images/auth/slide-1.png"
import slider2 from "@/public/images/auth/slide-2.png"
import slider3 from "@/public/images/auth/slide-3.png"
import CreatePasswordForm from "./create-password-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const CreatePasswordPage = () => {
  const { isRtl } = useThemeStore();
  return (
    <div className="loginwrapper bg-background flex items-center min-h-screen  overflow-hidden w-full">
      <div className="lg-inner-column  grid grid-cols-2 w-full flex-wrap justify-center overflow-y-auto p-4">
        <div
          className="h-full w-full  bg-no-repeat bg-center bg-cover hidden lg:block rounded-xl col-span-1"
          style={{ backgroundImage: `url(${bg.src})` }}
        >
          <Swiper
            key={`swiper-${isRtl}`}
            dir={isRtl ? "rtl" : "ltr"}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-full h-full rounded-2xl auth-swiper"
            style={{
              "--swiper-pagination-color": "#fff",
              "--swiper-pagination-bottom": "40px",
              "--swiper-pagination-bullet-size": "10px",
            } as React.CSSProperties}
          >
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider1} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider2} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider3} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-2 lg:col-span-1 px-4 flex justify-center items-center">
          <div className="w-full md:w-[480px]">
            <CreatePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordPage;

