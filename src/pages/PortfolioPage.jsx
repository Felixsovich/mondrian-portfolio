import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PortfolioPage = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Анимации для разных секций
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const section2Y = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  const section3Scale = useTransform(scrollYProgress, [0.25, 0.4], [0.9, 1]);
  const section3Rotate = useTransform(scrollYProgress, [0.25, 0.4], [2, 0]);

  return (
    <div ref={containerRef} style={{
      background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a, #0a0a0a)',
      position: 'relative'
    }}>
      {/* Фоновая анимация */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(212,9,32,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 1. HERO SECTION - Погружение */}
      <motion.section
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          opacity: heroOpacity,
          scale: heroScale,
          overflow: 'hidden'
        }}
      >
        {/* Анимированный фон */}
        <motion.div
          style={{
            position: 'absolute',
            width: '150%',
            height: '150%',
            background: 'radial-gradient(circle, rgba(212,9,32,0.15) 0%, transparent 60%)',
          }}
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 20px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(56px, 10vw, 120px)',
              color: 'white',
              fontWeight: '200',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              lineHeight: '1'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            Mikhail Starun
          </motion.h1>

          <motion.p
            style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: '300',
              marginBottom: '50px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            Motion Designer & Digital Artist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.button
              style={{
                background: 'rgba(212, 9, 32, 0.1)',
                border: '1px solid rgba(212, 9, 32, 0.3)',
                color: 'white',
                padding: '16px 48px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer',
                backdropFilter: 'blur(20px)'
              }}
              whileHover={{
                background: 'rgba(212, 9, 32, 0.25)',
                scale: 1.05,
                boxShadow: '0 10px 40px rgba(212, 9, 32, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Work
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Скролл индикатор */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))',
            borderRadius: '2px'
          }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '300' }}>
            Scroll
          </span>
        </motion.div>
      </motion.section>

      {/* 2. ABOUT SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y: section2Y,
          opacity: section2Opacity
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 style={{
                fontSize: 'clamp(40px, 6vw, 56px)',
                color: 'white',
                fontWeight: '300',
                marginBottom: '30px',
                letterSpacing: '-0.02em'
              }}>
                About Me
              </h2>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '40px'
              }}>
                I create immersive visual experiences that blend motion design,
                digital art, and storytelling. With a focus on minimalist aesthetics
                and emotional engagement, every project is crafted to leave a lasting impression.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Motion Design', 'Video Editing', 'UI/UX', 'Branding', '3D Animation'].map((skill, i) => (
                  <motion.span
                    key={skill}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      background: 'rgba(212, 9, 32, 0.15)',
                      borderColor: 'rgba(212, 9, 32, 0.3)',
                      scale: 1.05
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                position: 'relative'
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '500px',
                  background: 'linear-gradient(135deg, rgba(212,9,32,0.1), rgba(19,86,162,0.1))',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(212,9,32,0.1) 0%, transparent 50%)'
                }} />
                Personal Photo
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. PHILOSOPHY SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale: section3Scale,
          rotate: section3Rotate
        }}
      >
        <motion.div
          style={{ maxWidth: '900px', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-150px" }}
        >
          <motion.h2
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              color: 'white',
              fontWeight: '200',
              marginBottom: '40px',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            "Design is not just what it looks like.<br />Design is how it works."
          </motion.h2>
          <motion.p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '300'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            — Steve Jobs
          </motion.p>
        </motion.div>
      </motion.section>

      {/* 4. FEATURED WORK SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              color: 'white',
              textAlign: 'center',
              marginBottom: '80px',
              fontWeight: '300',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured Work
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: 'Brand Identity', color: '#D40920', desc: 'Complete visual system for modern tech startup' },
              { title: 'Motion Graphics', color: '#1356A2', desc: 'Animated explainer video series' },
              { title: 'UI/UX Design', color: '#F7D842', desc: 'Mobile app for creative professionals' }
            ].map((project, i) => (
              <motion.div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -15,
                  boxShadow: `0 20px 60px ${project.color}20`
                }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  style={{
                    height: '280px',
                    background: `linear-gradient(135deg, ${project.color}15, transparent)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '200px',
                      background: `radial-gradient(circle, ${project.color}30, transparent)`,
                      borderRadius: '50%'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                  <span style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '14px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Project Preview
                  </span>
                </motion.div>

                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '22px',
                    marginBottom: '12px',
                    fontWeight: '400'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. SERVICES SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <motion.h2
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              color: 'white',
              textAlign: 'center',
              marginBottom: '80px',
              fontWeight: '300'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Services
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              { icon: '🎬', title: 'Motion Design', desc: 'Bringing ideas to life through animation' },
              { icon: '✨', title: 'Visual Effects', desc: 'Creating stunning visual experiences' },
              { icon: '🎨', title: 'Art Direction', desc: 'Guiding creative vision from concept to reality' },
              { icon: '📱', title: 'UI/UX Design', desc: 'Crafting intuitive digital interfaces' }
            ].map((service, i) => (
              <motion.div
                key={i}
                style={{
                  padding: '40px 30px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  background: 'rgba(255,255,255,0.05)',
                  scale: 1.05
                }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  {service.icon}
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '20px',
                  marginBottom: '12px',
                  fontWeight: '400'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. PROCESS SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <motion.h2
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              color: 'white',
              textAlign: 'center',
              marginBottom: '80px',
              fontWeight: '300'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Process
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {[
              { num: '01', title: 'Discovery', desc: 'Understanding your vision and goals' },
              { num: '02', title: 'Concept', desc: 'Developing creative direction and strategy' },
              { num: '03', title: 'Design', desc: 'Crafting the visual experience' },
              { num: '04', title: 'Delivery', desc: 'Final touches and launch' }
            ].map((step, i) => (
              <motion.div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '30px',
                  alignItems: 'center',
                  padding: '40px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(212, 9, 32, 0.3)'
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: '200',
                  color: 'rgba(212, 9, 32, 0.7)'
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '24px',
                    marginBottom: '8px',
                    fontWeight: '400'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '16px'
                  }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. CONTACT SECTION */}
      <motion.section
        style={{
          minHeight: '100vh',
          padding: '120px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          style={{
            textAlign: 'center',
            maxWidth: '800px'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            style={{
              fontSize: 'clamp(48px, 8vw, 72px)',
              color: 'white',
              fontWeight: '200',
              marginBottom: '30px',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Create<br />Something Amazing
          </motion.h2>

          <motion.p
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '50px',
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind? Let's talk about how we can bring your vision to life.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              style={{
                background: 'rgba(212, 9, 32, 0.2)',
                border: '1px solid rgba(212, 9, 32, 0.5)',
                color: 'white',
                padding: '18px 48px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer'
              }}
              whileHover={{
                background: 'rgba(212, 9, 32, 0.4)',
                scale: 1.05,
                boxShadow: '0 10px 40px rgba(212, 9, 32, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.button>

            <motion.button
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                padding: '18px 48px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '400',
                cursor: 'pointer'
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.4)',
                scale: 1.05
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Resume
            </motion.button>
          </motion.div>

          <motion.div
            style={{
              marginTop: '80px',
              display: 'flex',
              gap: '30px',
              justifyContent: 'center'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {['Behance', 'Instagram', 'LinkedIn', 'Email'].map((social, i) => (
              <motion.a
                key={social}
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '300'
                }}
                whileHover={{
                  color: 'rgba(212, 9, 32, 0.8)',
                  scale: 1.1
                }}
                transition={{ duration: 0.2 }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
          fontWeight: '300'
        }}>
          © 2024 Mikhail Starun. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;