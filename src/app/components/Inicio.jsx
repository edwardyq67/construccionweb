'use client'

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Inicio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [datosInicio, setDatosInicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/inicio');
        if (!response.ok) throw new Error('Error cargando datos');
        const data = await response.json();
        
        // Si no hay video, precargar imágenes
        if (!data.video && data.fondos) {
          const imagePromises = data.fondos.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve;
            });
          });
          await Promise.all(imagePromises);
        }
        
        setDatosInicio(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Efecto para cambiar automáticamente el texto cuando hay video
  useEffect(() => {
    if (!datosInicio) return;
    
    const hasVideo = datosInicio.video && datosInicio.video.trim() !== '';
    
    if (hasVideo && datosInicio.titulo && datosInicio.titulo.length > 0) {
      let currentVideoIndex = 0;
      
      const interval = setInterval(() => {
        currentVideoIndex = (currentVideoIndex + 1) % datosInicio.titulo.length;
        setActiveIndex(currentVideoIndex);
      }, 5000); // Cambia cada 5 segundos
      
      return () => clearInterval(interval);
    }
  }, [datosInicio]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
  };

  if (loading) {
    return (
      <section id="Inicio" className="relative flex items-center justify-center overflow-hidden h-screen ">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative w-20 h-20 mx-auto mb-4"
            >
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full"></div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-lg font-medium"
            >
              Cargando contenido...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  if (!datosInicio) {
    return null;
  }

  const hasVideo = datosInicio.video && datosInicio.video.trim() !== '';

  return (
    <section id="Inicio" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full">
        {hasVideo ? (
          // Si hay video, mostrar video de fondo
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            >
              <source src={datosInicio.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70 md:bg-black/80" />
          </div>
        ) : (
          // Si no hay video, mostrar carrusel de imágenes
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/50 cursor-pointer transition-all duration-300 hover:bg-white/70"></span>`;
              },
            }}
            onSlideChange={handleSlideChange}
            className="w-full h-full"
          >
            {datosInicio.fondos?.map((fondo, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${fondo}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 md:bg-black/80" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {!hasVideo && (
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 md:gap-3 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 md:[&_.swiper-pagination-bullet]:w-3 md:[&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 hover:[&_.swiper-pagination-bullet]:bg-white/70 [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet-active]:scale-125" />
        )}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center text-white w-full">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={textVariants.transition}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 md:mb-6 tracking-tight leading-tight"
            >
              {datosInicio.titulo?.[activeIndex]}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${activeIndex}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ ...textVariants.transition, delay: 0.1 }}
              className="max-w-3xl mx-auto mb-6 md:mb-12 lg:mb-16"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-medium leading-relaxed px-2">
                {datosInicio.descripcion?.[activeIndex]}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0"
          >
            <a
              href="https://wa.me/51912909920?text=Hola,%20quiero%20más%20información%20del%20servicio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 bg-gradient-to-br from-white to-gray-100 text-primary font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {datosInicio.botones?.contacto?.texto}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </span>
            </a>

            <a
              href="#Nosotros"
              className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 backdrop-blur-md bg-white/10 border-2 border-white/30 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 hover:bg-white/20 hover:border-white/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {datosInicio.botones?.servicios?.texto}
                <span className="inline-block">+</span>
              </span>
            </a>
          </motion.div>

          {datosInicio.estadisticas && (
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-8 md:mt-12 lg:mt-14 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8"
            >
              {datosInicio.estadisticas?.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-center px-1 sm:px-2"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1">{stat.numero}</div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Inicio;