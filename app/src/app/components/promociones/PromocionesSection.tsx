"use client"

import { useProductStore } from '@/app/store/productsStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../card/ProductCard';

const PromocionesSection = () => {
    const { products } = useProductStore()

    return (
        <div className='w-full md:px-2 rounded-t-lg mt-12 mb-2 pb-2 text-white bg-[--verde]'>
            <h2 className='text-white text-center text-2xl font-bold '>Promociones Increíbles</h2>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={8}
                slidesPerView={2.2}
                grabCursor={true}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView:2.2
                    }
                }}
            >
                {products?.filter((pr) => pr.categories.find(ct => ct.name == 'Promociones')).map((prod) => (
                    <SwiperSlide key={prod.id}>
                        <ProductCard
                            product={prod}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PromocionesSection;
