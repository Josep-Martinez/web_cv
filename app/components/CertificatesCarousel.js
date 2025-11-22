// app/components/CertificatesCarousel.js
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Lista de certificados con sus imágenes exactas y datos detallados
const certificateImages = [
  // Certificados Boomi
  {
    id: 1,
    name: "Professional Integration Developer",
    image: "/certificates/Professional Integration Developer.png",
    type: "boomi",
    issued: "December 2024",
    skills: ["Enterprise Integration", "Process Automation"]
  },
  {
    id: 2,
    name: "Professional API Management",
    image: "/certificates/Professional API Management.png",
    type: "boomi",
    issued: "February 2025",
    skills: ["API Gateway", "API Security"]
  },
  {
    id: 3,
    name: "Professional API Design",
    image: "/certificates/Professional API Design.png",
    type: "boomi",
    issued: "December 2024",
    skills: ["REST APIs", "OpenAPI"]
  },
  {
    id: 4,
    name: "Development & Application Architecture",
    image: "/certificates/Development & Application Architecture Badge Acquired.png",
    type: "boomi",
    issued: "January 2024",
    skills: ["Solution Architecture", "Enterprise Design"]
  },
  {
    id: 5,
    name: "Associate Runtime Architect",
    image: "/certificates/Associate Runtime Architect.png",
    type: "boomi",
    issued: "February 2025",
    skills: ["Architecture Design", "Performance Optimization"]
  },
  {
    id: 6,
    name: "Associate Integration Developer",
    image: "/certificates/Associate Integration Developer.png",
    type: "boomi",
    issued: "December 2024",
    skills: ["Integration Patterns", "Data Mapping"]
  },
  {
    id: 7,
    name: "Associate Flow Essentials",
    image: "/certificates/Associate Flow Essentials.png",
    type: "boomi",
    issued: "February 2025",
    skills: ["Process Flows", "Workflow Design"]
  },
  {
    id: 8,
    name: "Associate Event Streams",
    image: "/certificates/Associate Event Streams.png",
    type: "boomi",
    issued: "January 2025",
    skills: ["Event-Driven Architecture", "Real-time Processing"]
  },
  {
    id: 9,
    name: "Associate DataHub",
    image: "/certificates/Associate DataHub.png",
    type: "boomi",
    issued: "February 2025",
    skills: ["Data Management", "Master Data"]
  },
  // Certificados Informatica
  {
    id: 10,
    name: "Implementation Advanced Topic: CAI Query and Tag Objects in CAI",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "November 2024",
    skills: ["Cloud Application Integration", "Object Tagging"]
  },
  {
    id: 11,
    name: "MDM C360 SaaS Implementation Intermediate Series",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "November 2024",
    skills: ["Master Data Management", "SaaS Implementation"]
  },
  {
    id: 12,
    name: "MDM Implementation Beginner Series",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "November 2024",
    skills: ["Data Governance", "Data Quality"]
  },
  {
    id: 13,
    name: "Synergy of IDMC Services - CDI vs CAI Course",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "November 2024",
    skills: ["IDMC Services", "Data Integration"]
  },
  {
    id: 14,
    name: "Cloud Application Integration (CAI) Training Path",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "October 2024",
    skills: ["Cross-System Connectivity", "Application Connectivity"]
  },
  {
    id: 15,
    name: "Cloud Application Integration Services for Developers R42",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "2024",
    skills: ["Developer Tools", "API & Process Orchestration"]
  },
  {
    id: 16,
    name: "CDGC Introduction for Implementation Professionals",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "2025",
    skills: ["Data Quality & Compliance Awareness", "Cross-Platform Integration & Technical Understanding"]
  },
  {
    id: 17,
    name: "CDGC Implementation Training Path",
    image: "/certificates/informatica_logo.png",
    type: "informatica",
    issued: "2025",
    skills: ["Data Cataloging & Metadata Management", "Data Governance & Stewardship"]
  },
];

const CertificatesCarousel = ({ language }) => {
  const [certIndex, setCertIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const texts = {
    EN: {
      close: "Close",
      issued: "Issued",
      skills_label: "Skills",
    },
    ES: {
      close: "Cerrar",
      issued: "Expedición",
      skills_label: "Aptitudes",
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play timer setup
  useEffect(() => {
    if (!isMounted) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isMounted]);

  // Pause carousel when modal is shown
  useEffect(() => {
    if (!isMounted) return;

    if (showModal) {
      clearInterval(autoPlayTimerRef.current);
    } else if (!showModal && autoPlayTimerRef.current === null) {
      autoPlayTimerRef.current = setInterval(() => {
        setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
      }, 2000);
    }
  }, [showModal, isMounted]);

  const showCertificateDetails = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setInterval(() => {
      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
    }, 2000);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      setCertIndex(prev => (prev === 0 ? certificateImages.length - 1 : prev - 1));
    } else {
      setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
    }

    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(() => {
        setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
      }, 2000);
    }
  };

  if (!isMounted) {
    return (
      <div className="relative glass-panel rounded-xl overflow-hidden shadow-2xl p-6 mb-8 mx-auto max-w-5xl">
        <div className="h-[420px] flex items-center justify-center">
          <div className="text-slate-400 animate-pulse">Loading certificates...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={carouselRef}
        className="relative glass-panel rounded-xl overflow-hidden shadow-2xl p-6 mb-8 mx-auto max-w-5xl"
      >
        {/* Main carousel area */}
        <div className="relative h-[420px] flex items-center justify-center">
          {certificateImages.map((cert, index) => {
            const position = index - certIndex;

            if (position < -1 || position > 1) return null;

            let translateX = '0%';
            let scale = 1;
            let zIndex = 10;
            let opacity = 1;
            let shadow = 'shadow-lg';

            if (position === -1) {
              translateX = '-65%';
              scale = 0.8;
              zIndex = 5;
              opacity = 0.7;
            } else if (position === 1) {
              translateX = '65%';
              scale = 0.8;
              zIndex = 5;
              opacity = 0.7;
            } else if (position === 0) {
              scale = 1.05;
              zIndex = 20;
              shadow = 'shadow-[0_0_30px_5px_rgba(100,255,218,0.3)]';
            }

            return (
              <div
                key={cert.id}
                className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out ${shadow} rounded-xl ${position === 0 ? 'border-2 border-electric' : 'border border-slate-dark/50'} cursor-pointer hover:scale-105`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale})`,
                  zIndex,
                  opacity
                }}
                onClick={() => showCertificateDetails(cert)}
              >
                <div className="w-72 overflow-hidden">
                  <div className="bg-navy-800 h-[280px] rounded-t-xl flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        width={250}
                        height={250}
                        className="object-contain max-w-[250px] max-h-[250px]"
                        priority={position === 0}
                        style={{
                          margin: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`font-mono flex items-center justify-center text-center text-sm min-h-[60px] p-3 bg-navy-900 rounded-b-xl border-t border-slate-dark/50 ${position === 0 ? 'text-electric' : 'text-slate-light'}`}
                  >
                    <span className="line-clamp-2">{cert.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={() => handleNavigate('prev')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-electric/10 hover:bg-electric/20 text-electric border border-electric/50 shadow-lg transform transition-all hover:scale-110 focus:outline-none z-30"
            aria-label={language === "EN" ? "Previous certificate" : "Certificado anterior"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={() => handleNavigate('next')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-electric/10 hover:bg-electric/20 text-electric border border-electric/50 shadow-lg transform transition-all hover:scale-110 focus:outline-none z-30"
            aria-label={language === "EN" ? "Next certificate" : "Siguiente certificado"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2 max-w-2xl mx-auto flex-wrap">
          {certificateImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCertIndex(index);
                if (autoPlayTimerRef.current) {
                  clearInterval(autoPlayTimerRef.current);
                  autoPlayTimerRef.current = setInterval(() => {
                    setCertIndex(prev => (prev === certificateImages.length - 1 ? 0 : prev + 1));
                  }, 2000);
                }
              }}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-300 ${certIndex === index
                  ? 'bg-electric text-navy-900 scale-110 font-bold'
                  : 'bg-navy-800 text-slate-light hover:bg-navy-700 hover:text-white'
                }`}
              aria-label={`${language === "EN" ? "Certificate" : "Certificado"} ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for certificate details */}
      {showModal && selectedCert && (
        <div className="fixed inset-0 bg-navy-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel border border-electric/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="border-b border-electric/20 p-4 flex justify-between items-center">
              <h3 className="font-heading text-2xl text-electric font-bold">
                {selectedCert.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-light hover:text-electric transition-colors"
                aria-label={texts[language].close}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-navy-800 rounded-lg p-6 shadow-inner font-mono border border-slate-dark/30">
                <pre className="font-mono text-sm text-slate-light whitespace-pre-wrap">
                  {`/* ${selectedCert.name.toUpperCase()} */

const certificateData = {
  name: "${selectedCert.name}",
  ${language === "EN" ? "issued" : "expedicion"}: "${selectedCert.issued}",
  ${language === "EN" ? "skills" : "aptitudes"}: [
    "${selectedCert.skills[0]}",
    "${selectedCert.skills.length > 1 ? selectedCert.skills[1] : ''}"
  ],
  type: "${selectedCert.type}"
};

// ${language === "EN" ? "Certificate details" : "Detalles del certificado"}
console.log(certificateData);`}
                </pre>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-light">
                <div className="col-span-1">
                  <div className="flex flex-col bg-navy-800/50 rounded-lg p-4 border border-slate-dark/30">
                    <span className="font-mono text-xs font-semibold text-electric mb-1">
                      {texts[language].issued}:
                    </span>
                    <span className="font-mono text-sm">
                      {selectedCert.issued}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col bg-navy-800/50 rounded-lg p-4 h-full border border-slate-dark/30">
                    <span className="font-mono text-xs font-semibold text-electric mb-1">
                      {texts[language].skills_label}:
                    </span>
                    <ul className="list-disc pl-5">
                      {selectedCert.skills.map((skill, idx) => (
                        <li key={idx} className="font-mono text-sm">{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-electric/20 p-4 text-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-electric/10 hover:bg-electric/20 text-electric border border-electric/50 rounded-md transition-colors font-mono text-sm"
              >
                {texts[language].close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificatesCarousel;