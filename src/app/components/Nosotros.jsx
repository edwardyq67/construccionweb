'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaSnowflake, FaThermometerHalf, FaClipboardCheck, FaBoxes } from 'react-icons/fa';

const Nosotros = () => {
    const [datosNosotros, setDatosNosotros] = useState(null);
    const [servicios, setServicios] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar datos de Nosotros
                const nosotrosResponse = await fetch('/api/nosotros');
                if (!nosotrosResponse.ok) throw new Error('Error cargando datos de nosotros');
                const nosotrosData = await nosotrosResponse.json();
                setDatosNosotros(nosotrosData);

                // Cargar datos de Servicios
                const serviciosResponse = await fetch('/api/servicios');
                if (!serviciosResponse.ok) throw new Error('Error cargando datos de servicios');
                const serviciosData = await serviciosResponse.json();
                setServicios(serviciosData.servicios);

                setLoading(false);
            } catch (error) {
                console.error('Error cargando datos:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Función para obtener el icono según el nombre
    const getIcon = (iconName) => {
        const icons = {
            'mdi:snowflake': <FaSnowflake className="text-2xl text-primary" />,
            'mdi:snowflake-thermometer': <FaThermometerHalf className="text-2xl text-primary" />,
            'mdi:clipboard-check': <FaClipboardCheck className="text-2xl text-primary" />,
            'mdi:box': <FaBoxes className="text-2xl text-primary" />
        };
        return icons[iconName] || <FaSnowflake className="text-2xl text-primary" />;
    };

    if (loading) {
        return (
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Cargando...</p>
                </div>
            </section>
        );
    }

    if (!datosNosotros) return null;

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-sm uppercase tracking-wider text-primary font-semibold mb-4">
                        Sobre Nosotros
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {datosNosotros.titulo}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {datosNosotros.contenido}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {datosNosotros.stats?.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-8 rounded-2xl border border-border bg-muted/30 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="text-3xl font-bold text-foreground mb-2">{stat.numero}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                    {/* Left Column - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold text-foreground mb-6">
                            Nuestros valores
                        </h3>
                        <div className="space-y-4">
                            {datosNosotros.logros?.map((logro, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                                >
                                    <FaCheck className="text-primary text-sm mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">{logro}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={datosNosotros.foto}
                                alt="Equipo"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                        </div>

                        {datosNosotros.sello?.numero && (
                            <div className="absolute -bottom-4 -right-4 bg-card px-6 py-3 rounded-lg shadow-lg border border-border">
                                <div className="text-2xl font-bold text-primary">
                                    {datosNosotros.sello.numero}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {datosNosotros.sello.texto}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Servicios */}
                {servicios && servicios.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20"
                    >
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-sm uppercase tracking-wider text-primary font-semibold mb-4">
                                Nuestros Servicios
                            </h2>
                            <h3 className="text-3xl font-bold text-foreground">
                                Soluciones profesionales para tu negocio
                            </h3>
                        </div>

                       <div className="grid sm:grid-cols-2 gap-8">
  {servicios.map((servicio, i) => (
    <motion.a
      key={i}
      href={`/servicios/${servicio.slug || servicio.titulo.toLowerCase().replace(/\s+/g, '-')}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer"
    >
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={servicio.img}
          alt={servicio.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

        {/* Icono */}
        <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md p-2 rounded-full">
          {getIcon(servicio.icono)}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
          {servicio.titulo}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {servicio.contenido}
        </p>

        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300 gap-2">
          Ver más
          <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  ))}
</div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Nosotros;