import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Ramesh Babu',
    location: 'LB Nagar',
    rating: 5,
    date: '2 weeks ago',
    text: 'Exceptional care from Dr. Akhil Dadi. My knee replacement surgery was flawless — I was walking the very next day. The robotic precision is truly next level. Highly recommend Srikara to anyone.',
    avatar: 'RB',
    color: '#8B1A4A',
  },
  {
    name: 'Priya Lakshmi',
    location: 'Peerzadiguda',
    rating: 5,
    date: '1 month ago',
    text: 'The staff is incredibly professional and warm. From admission to discharge, every step was seamless. The doctors explained everything clearly. Best hospital experience I have ever had.',
    avatar: 'PL',
    color: '#1a56db',
  },
  {
    name: 'Suresh Reddy',
    location: 'ECIL',
    rating: 5,
    date: '3 weeks ago',
    text: 'World-class infrastructure and genuinely caring doctors. My father\'s cardiac procedure went perfectly. The ICU team was attentive 24/7. We are forever grateful to Srikara Hospitals.',
    avatar: 'SR',
    color: '#0891b2',
  },
  {
    name: 'Anitha Varma',
    location: 'Kompally',
    rating: 5,
    date: '2 months ago',
    text: 'I had a laparoscopic surgery here and the recovery was incredibly fast. The operation theatre is state-of-the-art. Dr. and team were compassionate and thorough. 5 stars without hesitation.',
    avatar: 'AV',
    color: '#7c3aed',
  },
  {
    name: 'Venkat Rao',
    location: 'LB Nagar',
    rating: 5,
    date: '1 week ago',
    text: 'Outstanding neurology department. Dr. treated my spine condition with precision and care. The post-op physiotherapy team is excellent. I am back to normal life in just 3 weeks.',
    avatar: 'VR',
    color: '#dc2626',
  },
  {
    name: 'Kavitha Nair',
    location: 'Lakdikapul',
    rating: 4,
    date: '5 weeks ago',
    text: 'Very professional environment. The doctors are highly qualified and the nursing staff is attentive. Clean, modern facilities. My delivery experience was smooth and comfortable.',
    avatar: 'KN',
    color: '#d97706',
  },
  {
    name: 'Mohammed Farhan',
    location: 'RTC X Roads',
    rating: 5,
    date: '3 months ago',
    text: 'Srikara is truly a premium hospital. The oncology team gave my mother a new lease on life. The multidisciplinary approach and personalized care plan made all the difference.',
    avatar: 'MF',
    color: '#16a34a',
  },
  {
    name: 'Deepa Srinivas',
    location: 'Miyapur',
    rating: 5,
    date: '6 weeks ago',
    text: 'The diagnostic center is incredibly advanced. Got my MRI and reports within hours. The radiologist explained everything in detail. Affordable pricing for such premium quality.',
    avatar: 'DS',
    color: '#9333ea',
  },
  {
    name: 'Kiran Kumar',
    location: 'Peerzadiguda',
    rating: 5,
    date: '2 weeks ago',
    text: 'Had my hip replacement done here. The robotic surgery was precise and my recovery was faster than expected. The entire team from reception to surgery was top-notch.',
    avatar: 'KK',
    color: '#0d9488',
  },
  {
    name: 'Sunitha Goud',
    location: 'ECIL',
    rating: 4,
    date: '1 month ago',
    text: 'Excellent pediatric care for my child. The doctors were patient, kind, and thorough. The hospital is clean and well-maintained. Emergency response was very quick.',
    avatar: 'SG',
    color: '#c026d3',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          className={i <= rating ? 'fill-[#FBBC04] text-[#FBBC04]' : 'fill-white/10 text-white/10'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[340px] bg-white border border-[#E8EDF2] rounded-3xl p-7 mx-3 shadow-sm hover:shadow-md hover:border-[#8B1A4A]/20 transition-all duration-500 group">
      {/* Google logo + rating row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {/* Google G icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest">Google Review</span>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Quote */}
      <Quote size={20} className="text-[#8B1A4A]/40 mb-3" />
      <p className="text-[#4A5568] text-sm leading-relaxed font-medium line-clamp-4 mb-6">
        {review.text}
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#F1F5F9]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${review.color}, ${review.color}99)` }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-[#1A202C] font-bold text-sm leading-tight">{review.name}</p>
          <p className="text-[#94A3B8] text-[10px] font-semibold mt-0.5">
            Srikara {review.location} · {review.date}
          </p>
        </div>
      </div>
    </div>
  )
}

// Duplicate reviews for seamless infinite loop
const TRACK = [...REVIEWS, ...REVIEWS]

export function GoogleReviewsSection() {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const cardWidth = 340 + 24 // w + mx*2
    const halfWidth = REVIEWS.length * cardWidth

    const step = () => {
      if (!pausedRef.current) {
        posRef.current += 0.5
        if (posRef.current >= halfWidth) posRef.current = 0
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.4]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B1A4A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1a56db]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-12 sm:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 mb-5 sm:mb-6"
            >
              <div className="w-12 h-[1px] bg-[#8B1A4A]" />
              <span className="text-[#8B1A4A] text-[10px] font-black uppercase tracking-[0.5em]">Patient Voices</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-[#1A202C] tracking-tighter leading-none"
            >
              Trusted by <span className="text-[#8B1A4A]">Thousands</span>
              <br />
              <span className="text-[#94A3B8] text-2xl sm:text-3xl md:text-5xl font-light italic">across Hyderabad.</span>
            </motion.h2>
          </div>

          {/* Aggregate rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 bg-white border border-[#E2E8F0] shadow-md rounded-2xl px-5 sm:px-8 py-4 sm:py-5 flex items-center gap-4 sm:gap-5"
          >
            <div className="text-center">
              <div className="text-5xl font-black text-[#1A202C] tracking-tighter">4.9</div>
              <div className="flex justify-center mt-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} className="fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>
              <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest">Google Rating</div>
            </div>
            <div className="w-px h-14 bg-[#E2E8F0]" />
            <div className="text-center">
              <div className="text-5xl font-black text-[#1A202C] tracking-tighter">2K+</div>
              <div className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest mt-2">Reviews</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling track */}
      <div
        className="relative z-10 overflow-hidden"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex will-change-transform py-4"
          style={{ width: 'max-content' }}
        >
          {TRACK.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-[1400px] mx-auto px-4 sm:px-8 mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10"
      >
        <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-[0.3em]">
          Reviews sourced from Google Maps · Verified patients
        </p>
        <a
          href="https://www.google.com/maps/search/Srikara+Hospitals"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A202C] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-sm transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          View All on Google
        </a>
      </motion.div>
    </section>
  )
}
