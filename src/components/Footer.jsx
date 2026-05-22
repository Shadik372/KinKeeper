import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1A4731] text-white pt-10 md:pt-16 pb-6 md:pb-8 w-full mt-auto">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">KeenKeeper</h2>
        <p className="text-[#a6c4b2] text-sm md:text-base max-w-xl md:max-w-2xl mb-6 md:mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Social Links</h3>
        <div className="flex gap-3 md:gap-4 mb-10 md:mb-16">
          <Link href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/instagram.png" alt="Instagram" className="w-5 h-5 md:w-7 md:h-7 object-contain" />
          </Link>
          <Link href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/facebook.png" alt="Facebook" className="w-5 h-5 md:w-7 md:h-7 object-contain" />
          </Link>
          <Link href="#" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/twitter.png" alt="X/Twitter" className="w-4 h-4 md:w-6 md:h-6 object-contain" />
          </Link>
        </div>

        <div className="w-full border-t border-[#265e42] pt-5 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-xs text-[#a6c4b2]">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
