import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1A4731] text-white pt-16 pb-8 w-full mt-auto">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        
        <h2 className="text-4xl font-bold mb-3 tracking-tight">KeenKeeper</h2>
        <p className="text-[#a6c4b2] text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

<h3 className="font-medium text-lg mb-4">Social Links</h3>
        <div className="flex gap-4 mb-16">
          <Link href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/instagram.png" alt="Instagram" className="w-7 h-7 object-contain" />
          </Link>
          <Link href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/facebook.png" alt="Facebook" className="w-7 h-7 object-contain" />
          </Link>
          <Link href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src="/assets/twitter.png" alt="X/Twitter" className="w-6 h-6 object-contain" />
          </Link>
        </div>

        <div className="w-full border-t border-[#265e42] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#a6c4b2]">
          <p className="mb-4 md:mb-0">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
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