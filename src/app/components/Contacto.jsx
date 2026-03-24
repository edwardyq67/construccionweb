'use client'

import React, { useState } from 'react';
import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaExclamationCircle,
  FaPaperPlane,
  FaTimes,
  FaMapMarkedAlt,
  FaCalendarWeek,
  FaCommentAlt,
  FaUser,
  FaMobileAlt,
  FaCheck,
  FaSpinner,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import Link from 'next/link';

const Contacto = ({ tipo = "General" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    aceptaTerminos: false
  });

  // Datos de contacto quemados (puedes moverlos a un JSON después)
  const contactInfo = {
    telefonos: [
      {
        tipo: "WhatsApp",
        numero: "+51 912 909 920",
        whatsapp: "https://wa.me/51912909920",
        descripcion: "Atención inmediata"
      },
      {
        tipo: "Teléfono",
        numero: "+51 1 123 4567",
        whatsapp: "tel:+5111234567",
        descripcion: "Oficina"
      }
    ],
    correos: [
      {
        tipo: "Ventas",
        email: "ventas@teknisolutions.com",
        descripcion: "Consultas y cotizaciones"
      },
      {
        tipo: "Soporte",
        email: "soporte@teknisolutions.com",
        descripcion: "Asistencia técnica"
      }
    ],
    direcciones: [
      {
        tipo: "Oficina Principal",
        direccion: "Av. Javier Prado Este 1234",
        ciudad: "San Isidro",
        pais: "Lima, Perú",
        mapa: "https://maps.google.com/?q=Av.+Javier+Prado+Este+1234+Lima"
      }
    ],
    horarios: {
      general: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      sabado: "Sábados: 9:00 AM - 1:00 PM",
      domingo: "Domingos: Cerrado"
    },
    redesSociales: {
      facebook: {
        nombre: "Facebook",
        url: "https://facebook.com/teknisolutions"
      },
      instagram: {
        nombre: "Instagram",
        url: "https://instagram.com/teknisolutions"
      },
      linkedin: {
        nombre: "LinkedIn",
        url: "https://linkedin.com/company/teknisolutions"
      }
    },
    whatsappMensaje: {
      mensaje: `Hola, estoy interesado en obtener información sobre: ${tipo}`
    }
  };

  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    twitter: FaTwitter
  };

  const socialColors = {
    facebook: 'bg-blue-600 hover:bg-blue-700',
    instagram: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
    tiktok: 'bg-black hover:bg-gray-800',
    youtube: 'bg-red-600 hover:bg-red-700',
    linkedin: 'bg-blue-700 hover:bg-blue-800',
    twitter: 'bg-blue-400 hover:bg-blue-500'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOpenTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!formData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simular envío (por ahora solo muestra éxito)
    setTimeout(() => {
      console.log('Datos del formulario:', {
        ...formData,
        tipo: tipo
      });
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        aceptaTerminos: false
      });
      setIsSubmitting(false);
    }, 1000);

    // TODO: Cuando tengas la API, descomenta esto:
    /*
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tipo: tipo
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: '',
          aceptaTerminos: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para resolver todas tus necesidades de climatización y ventilación
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Columna izquierda - Información de contacto */}
          <div className="space-y-6">
            {/* Teléfonos y Correos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <FaPhone className="text-primary" />
                  Teléfonos
                </h3>
                <div className="space-y-2">
                  {contactInfo.telefonos.map((telefono, index) => (
                    <a
                      key={index}
                      href={telefono.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-xl transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        {telefono.tipo === "WhatsApp" ? (
                          <FaWhatsapp className="text-primary text-lg" />
                        ) : (
                          <FaPhone className="text-primary text-lg" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-foreground font-medium text-sm">{telefono.tipo}</span>
                          <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {telefono.descripcion}
                          </span>
                        </div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                          {telefono.numero}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Correos
                </h3>
                <div className="space-y-2">
                  {contactInfo.correos.map((correo, index) => (
                    <a
                      key={index}
                      href={`mailto:${correo.email}`}
                      className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-xl transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <FaEnvelope className="text-primary text-lg" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground font-medium text-sm">{correo.tipo}</span>
                        </div>
                        <p className="text-primary group-hover:text-primary/80 text-sm truncate">
                          {correo.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{correo.descripcion}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Direcciones */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                Dirección
              </h3>
              <div className="space-y-3">
                {contactInfo.direcciones.map((direccion, index) => (
                  <div key={index} className="p-3 hover:bg-muted/30 rounded-xl transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaMapMarkedAlt className="text-primary text-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-sm mb-1">{direccion.tipo}</h4>
                        <p className="text-foreground text-sm">{direccion.direccion}</p>
                        <p className="text-muted-foreground text-xs">{direccion.ciudad}, {direccion.pais}</p>
                        <a
                          href={direccion.mapa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all text-xs mt-2"
                        >
                          <FaMapMarkedAlt />
                          Ver mapa
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horarios */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <FaClock className="text-primary" />
                Horarios de Atención
              </h3>
              <div className="space-y-2 p-3 bg-muted/30 rounded-xl">
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <FaCalendarWeek className="text-primary text-sm" />
                    <span className="text-foreground text-sm">Lunes a Viernes:</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{contactInfo.horarios.general.split(': ')[1]}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <FaCalendarWeek className="text-primary text-sm" />
                    <span className="text-foreground text-sm">Sábados:</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{contactInfo.horarios.sabado.split(': ')[1]}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <FaCalendarWeek className="text-primary text-sm" />
                    <span className="text-foreground text-sm">Domingos:</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{contactInfo.horarios.domingo.split(': ')[1]}</span>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <FaCommentAlt className="text-primary" />
                Síguenos
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(contactInfo.redesSociales).map(([key, red]) => {
                  const IconComponent = socialIcons[key];
                  const colorClass = socialColors[key] || 'bg-gray-600 hover:bg-gray-700';

                  if (!IconComponent) return null;

                  return (
                    <a
                      key={key}
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${colorClass}`}
                      aria-label={red.nombre}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
                <a
                  href={`https://wa.me/51912909920?text=${encodeURIComponent(contactInfo.whatsappMensaje.mensaje)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-all hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                Envíanos un mensaje
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Completa el formulario y te contactaremos pronto
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700">
                    <FaCheck className="text-green-600" />
                    <span className="font-medium">¡Mensaje enviado con éxito!</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2 text-red-700">
                    <FaExclamationCircle className="text-red-600" />
                    <span className="font-medium">Error al enviar el mensaje</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-card-foreground mb-1 font-medium">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-card-foreground mb-1 font-medium">
                    Correo electrónico *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-card-foreground mb-1 font-medium">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMobileAlt className="text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Tu número de teléfono"
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-card-foreground mb-1 font-medium">
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Describe tu consulta o necesidad..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-input bg-background rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
                    required
                  />
                </div>

                <input type="hidden" name="tipo" value={tipo} />

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacidad"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-primary"
                    required
                  />
                  <label htmlFor="privacidad" className="text-xs text-muted-foreground leading-relaxed">
                    Acepto los{' '}
                    <a
                      href="#"
                      onClick={handleOpenTermsModal}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      Términos y condiciones
                    </a>
                    {' '}y la{' '}
                    <a
                      href="/politicas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary cursor-pointer hover:underline"
                    >
                      Política de privacidad
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm ${
                    isSubmitting
                      ? 'bg-primary/70 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Términos y Condiciones */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleCloseTermsModal}
        >
          <div
            className="bg-card rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30 sticky top-0">
              <h2 className="text-xl font-bold text-foreground">
                Términos y Condiciones
              </h2>
              <button
                onClick={handleCloseTermsModal}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <FaTimes className="text-muted-foreground" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4 text-foreground">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-center mb-2">TÉRMINOS Y CONDICIONES</h3>
                  <p className="text-center text-sm text-muted-foreground mb-4">Servicios de Instalación y Mantenimiento</p>
                </div>

                <ol className="space-y-6 list-decimal pl-5">
                  <li className="pl-2">
                    <span className="font-medium">TEKNISOLUTIONS</span>, en adelante LA EMPRESA garantizará los servicios de instalación y mantenimiento correctivo, que realice, así como los productos adquiridos, comprados y/o vendidos, por LA EMPRESA, en conformidad con las condiciones generales que pasan a expresarse y que se dan a conocer a EL CLIENTE, por medio de la presente cotización; en los siguientes términos.
                  </li>

                  <li className="pl-2">
                    Si al momento de efectuar el servicio EL CLIENTE no se encuentra en la dirección acordada, o por cualquier motivo no permiten el ingreso, los técnicos esperarán 15 minutos. Pasado este periodo de tiempo, el técnico procederá a retirarse dando por finalizada la atención. Para reprogramar el servicio EL CLIENTE deberá pagar la suma de 25.00 soles.
                  </li>

                  <li className="pl-2">
                    Si EL CLIENTE decide anular el servicio de mantenimiento posterior a la llegada del técnico al lugar de prestación de servicio deberá realizar el pago de 25.00 soles por concepto de movilización a la visita, el cual será descontada del valor del servicio.
                  </li>

                  <li className="pl-2">
                    EL CLIENTE deberá proporcionar el espacio despejado donde se realizará el mantenimiento o la instalación. En caso de que EL CLIENTE haya solicitado una visita técnica previa, el mismo deberá acondicionar el espacio según lo acordado.
                  </li>

                  <li className="pl-2">
                    <p className="mb-2">La garantía de instalación tendrá una vigencia de 1 año, contados desde la fecha de recepción conforme de la instalación por parte de EL CLIENTE -en caso de no existir tal recepción, el plazo se contará desde la fecha del encargo y pago del servicio-, y cubrirá hasta el monto efectivamente pagado por EL CLIENTE por concepto de instalación adquirida.</p>
                  </li>
                </ol>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex justify-end">
                <button
                  onClick={handleCloseTermsModal}
                  className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contacto;