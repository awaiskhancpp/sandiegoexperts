const services = [
  {
    color: '#F0BFFF',
    title: 'Service Business Websites',
    description: 'For local businesses, contractors, consultants, clinics, legal firms, and professional services.',
  },
  {
    color: '#FFE07A',
    title: 'Ecommerce Websites',
    description: 'For brands that need better product pages, smoother shopping journeys, and stronger trust.',
  },
  {
    color: '#C5F0A4',
    title: 'Landing Pages',
    description: 'For paid ads, campaigns, service offers, and lead magnet funnels.',
  },
  {
    color: '#FFB99A',
    title: 'Custom Websites',
    description: 'For businesses that need advanced features, custom flows, or scalable development.',
  },
  {
    color: '#A8D8FF',
    title: 'Lead Generation Website',
    description: 'For businesses that need more calls, bookings, quote requests, or consultation forms.',
  },
];

function BrowserIcon({ color }: { color: string }) {
  return (
    <div
      className="w-[72px] h-[72px] rounded-xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: color }}
    >
      <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="36" height="30" rx="4" stroke="#111" strokeWidth="1.8" fill="none" />
        <line x1="1" y1="8" x2="37" y2="8" stroke="#111" strokeWidth="1.8" />
        <circle cx="6" cy="4.5" r="1.2" fill="#111" />
        <circle cx="10" cy="4.5" r="1.2" fill="#111" />
        <circle cx="14" cy="4.5" r="1.2" fill="#111" />
        <path d="M19 22l-3-5h2v-5h2v5h2l-3 5z" fill="#111" />
      </svg>
    </div>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 w-[280px] shrink-0">
      <BrowserIcon color={service.color} />
      <h3 className="text-[18px] font-black text-[#0a0a0a] leading-snug font-heading">
        {service.title}
      </h3>
      <p className="text-[14px] text-[#555] leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  // Duplicate for seamless loop
  const items = [...services, ...services];

  return (
    <section className="w-full bg-[#E3EEFB] pb-12 overflow-hidden">
      <div className="relative marquee-fade-edges">
        <div className="flex gap-4 animate-marquee whitespace-nowrap" style={{ transform: 'translateZ(0)' }}>
          {items.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
