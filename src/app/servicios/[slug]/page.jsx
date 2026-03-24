'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaSnowflake, 
  FaIndustry, 
  FaClipboardCheck, 
  FaBox,
  FaWhatsapp,
  FaArrowRight,
  FaHome,
  FaBuilding,
  FaHospital,
  FaPills,
  FaUtensils,
  FaBriefcase,
  FaStore,
  FaCertificate,
  FaBolt,
  FaShieldAlt,
  FaUserMd,
  FaConciergeBell,
  FaVideo,
  FaFingerprint,
  FaSmoking,
  FaWifi,
  FaMicrochip,
  FaEye,
  FaThermometerHalf,
  FaDatabase,
  FaMobileAlt,
  FaRegSmile,
  FaCreditCard,
  FaChartLine,
  FaGasPump,
  FaBell,
  FaLightbulb,
  FaApple,
  FaEthernet,
  FaRegBuilding,
  FaTools,
  FaHeadset,
  FaCalendarAlt,
  FaDoorOpen,
  FaFireExtinguisher
} from 'react-icons/fa';
import Link from 'next/link';
import Carrusel from '@/app/components/Carrusel';
import Productos from '@/app/components/Productos';
import Contacto from '@/app/components/Contacto';

// Mapeo de iconos - usando clases de Tailwind que respetan global.css
const getIconByName = (iconName) => {
  const icons = {
    'mdi:snowflake': <FaSnowflake className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:snowflake-thermometer': <FaSnowflake className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:clipboard-check': <FaClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:box': <FaBox className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:home': <FaHome className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:hospital': <FaHospital className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:pill': <FaPills className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:food': <FaUtensils className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:briefcase': <FaBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:store': <FaStore className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:chef-hat': <FaConciergeBell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:certificate': <FaCertificate className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:lightning-bolt': <FaBolt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:shield-check': <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:check': <FaClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:information': <FaClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:cctv': <FaVideo className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:fingerprint': <FaFingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:face-recognition': <FaRegSmile className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:credit-card': <FaCreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:monitor-dashboard': <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:smoke-detector': <FaSmoking className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:gas-cylinder': <FaGasPump className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:alarm-panel': <FaBell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:alarm-light': <FaBell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:amazon-alexa': <FaMicrochip className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:apple': <FaApple className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:ethernet-cable': <FaEthernet className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:wifi': <FaWifi className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:thermometer': <FaThermometerHalf className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:database': <FaDatabase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:cellphone': <FaMobileAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:drawing': <FaRegBuilding className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:hammer-wrench': <FaTools className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:headset': <FaHeadset className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:calendar-check': <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:door-closed-lock': <FaDoorOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:fire-alert': <FaFireExtinguisher className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
    'mdi:home-automation': <FaLightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
  };
  return icons[iconName] || <FaClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />;
};

const getIconForSection = (titulo) => {
  if (!titulo) return "mdi:information";
  if (titulo.includes("Salud") || titulo.includes("Hospitalario")) return "mdi:hospital";
  if (titulo.includes("Farmacéutica")) return "mdi:pill";
  if (titulo.includes("Alimentaria") || titulo.includes("Procesamiento")) return "mdi:food";
  if (titulo.includes("Corporativo") || titulo.includes("Comercial")) return "mdi:briefcase";
  if (titulo.includes("Residencial")) return "mdi:home";
  if (titulo.includes("Retail")) return "mdi:store";
  if (titulo.includes("Horeca")) return "mdi:chef-hat";
  return "mdi:information";
};

const ServicioDetalle = () => {
  const params = useParams();
  const { slug } = params;
  
  const [servicioEncontrado, setServicioEncontrado] = useState(null);
  const [serviciosData, setServiciosData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/servicios');
        const data = await response.json();
        setServiciosData(data);
        
        const servicio = data.servicios?.find(s => s.slug === slug);
        setServicioEncontrado(servicio);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando servicio:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (!servicioEncontrado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Servicio no encontrado</h1>
          <Link href="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const servicioSlugParaProductos = servicioEncontrado.slug;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${servicioEncontrado.img}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              {servicioEncontrado.titulo}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="#contacto"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
              >
                Solicitar Cotización
              </a>
              
              {(servicioEncontrado.titulo === "Aire acondicionado y climatización" || 
                servicioEncontrado.titulo === "Refrigeración comercial e industrial") && (
                <a 
                  href={`https://wa.me/51912909920?text=${encodeURIComponent(`Hola, quiero un asesoramiento para: ${servicioEncontrado.titulo}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Asesoramiento por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Descripción */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={servicioEncontrado.img}
                  alt={servicioEncontrado.titulo}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-primary/5 rounded-full -z-10"></div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                {servicioEncontrado.titulo}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {servicioEncontrado.descripcion_larga || servicioEncontrado.contenido}
              </p>
              
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {getIconByName('mdi:certificate')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Experiencia Certificada</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Equipo técnico especializado con certificaciones internacionales</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {getIconByName('mdi:lightning-bolt')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Alta Eficiencia Energética</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Equipos que reducen hasta 40% el consumo eléctrico</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {getIconByName('mdi:shield-check')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Garantía y Seguridad</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Instalaciones certificadas con garantía extendida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección DomesticoComercial */}
      {servicioEncontrado.DomesticoComercial && servicioEncontrado.DomesticoComercial.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-background">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={servicioEncontrado.DomesticoComercial[0].img || servicioEncontrado.img}
                    alt={servicioEncontrado.DomesticoComercial[0].titulo}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-primary/10 rounded-full -z-10"></div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <FaHome className="w-3 h-3 sm:w-4 sm:h-4" />
                  Servicio para Hogares
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  {servicioEncontrado.DomesticoComercial[0].titulo}
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  {servicioEncontrado.DomesticoComercial[0].descripcion_corta}
                </p>

                <div className="space-y-4 sm:space-y-6">
                  {servicioEncontrado.DomesticoComercial[0].servicios.map((servicio, index) => (
                    <div key={index} className="bg-card p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-border">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {getIconByName(servicio.icono || "mdi:check")}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                            {servicio.nombre}
                          </h4>
                          <p className="text-sm sm:text-base text-muted-foreground">
                            {servicio.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-0.5 sm:mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Nuestro Compromiso</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {servicioEncontrado.DomesticoComercial[0].compromiso}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección descripcionDetallada */}
      {servicioEncontrado.descripcionDetallada?.servicios && (
        <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                {servicioEncontrado.descripcionDetallada.titulo}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto px-4">
                Tecnología de vanguardia para tu seguridad y bienestar
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={servicioEncontrado.descripcionDetallada.img || servicioEncontrado.img}
                    alt={servicioEncontrado.descripcionDetallada.titulo}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"></div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {servicioEncontrado.descripcionDetallada.servicios.map((item, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 sm:mb-3">
                        {getIconByName(item.icono)}
                      </div>
                      <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">
                        {item.nombre}
                      </h4>
                      <p className="text-gray-200 text-xs sm:text-sm">
                        {item.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección de Secciones Informativas */}
      {servicioEncontrado.secciones && servicioEncontrado.secciones.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-24 bg-background">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Información Especializada
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {servicioEncontrado.secciones[0].titulo}
              </h2>
              {servicioEncontrado.secciones[0].contenido && (
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
                  {servicioEncontrado.secciones[0].contenido}
                </p>
              )}
            </div>

            {servicioEncontrado.secciones[0].items && Array.isArray(servicioEncontrado.secciones[0].items) && 
             servicioEncontrado.secciones[0].items.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                  {servicioEncontrado.secciones[0].items.map((item, idx) => {
                    const iconName = getIconForSection(item?.titulo);
                    return (
                      <div 
                        key={idx}
                        className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 bg-gradient-to-br from-primary-50 to-background rounded-2xl p-6 sm:p-8 md:p-10 border border-primary-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="mb-3 md:mb-0">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            {getIconByName(iconName)}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                            {item?.titulo || "Sector especializado"}
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            {item?.descripcion || "Información especializada del sector"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Carrusel */}
      {(servicioEncontrado.Domestico?.length > 0 || 
        servicioEncontrado.Comercial?.length > 0 || 
        servicioEncontrado.Industrial?.length > 0) && ( 
        <Carrusel />
      )}

      {/* Productos */}
      {(servicioEncontrado.Domestico?.length > 0 || 
        servicioEncontrado.Comercial?.length > 0 || 
        servicioEncontrado.Industrial?.length > 0) && (
        <Productos servicioSlug={servicioSlugParaProductos} />
      )}

      {/* Servicios Relacionados */}
      {serviciosData?.servicios && (
        <section className="py-12 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                Servicios Relacionados
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Soluciones completas para todas tus necesidades
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {serviciosData.servicios.filter(s => s.slug !== servicioEncontrado.slug).slice(0, 3).map((servicioRel, index) => (
                <Link 
                  key={index}
                  href={`/servicios/${servicioRel.slug}`}
                  className="group relative bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img 
                      src={servicioRel.img}
                      alt={servicioRel.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {getIconByName(servicioRel.icono)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {servicioRel.titulo}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {servicioRel.contenido}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold group-hover:underline text-sm sm:text-base">
                        Ver detalles
                      </span>
                      <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contacto */}
      <Contacto tipo={servicioEncontrado.titulo} />
    </>
  );
};

export default ServicioDetalle;