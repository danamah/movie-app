import { Input, Button, Link } from "@heroui/react"; 
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#16213e] text-[#e0e0e0] pt-16 pb-5 font-sans border-t border-[#e94560]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* About Section */}
          <div className="col-span-1 md:col-span-4">
            <h5 className="text-[#e94560] font-bold text-lg uppercase tracking-wide mb-5">MovieApp</h5>
            <p className="text-[#a0a0a0] leading-relaxed text-sm mb-5">
              Your ultimate destination for movies, trending shows, and exclusive content. 
              Experience the magic of cinema right at your fingertips.
            </p>
            <div className="flex gap-4">
              {[
                  { icon: <FaFacebook />, href: "#" },
                  { icon: <FaTwitter />, href: "#" },
                  { icon: <FaInstagram />, href: "#" },
                  { icon: <FaYoutube />, href: "#" }
              ].map((social, index) => (
                  <Link 
                    key={index} 
                    href={social.href} 
                    className="w-10 h-10 rounded-full bg-[#e94560]/10 text-[#e94560] flex items-center justify-center text-lg transition-all duration-300 hover:bg-[#e94560] hover:text-white hover:-translate-y-1"
                  >
                    {social.icon}
                  </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#e94560] font-bold text-lg uppercase tracking-wide mb-5">Quick Links</h5>
            <ul className="list-none p-0 space-y-2.5">
              {['Home', 'Trending', 'Movies', 'TV Shows'].map((item) => (
                <li key={item}>
                    <Link href="#" className="text-[#c0c0c0] hover:text-[#e94560] hover:pl-1 transition-all duration-300 text-sm no-underline">
                        {item}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1 md:col-span-2">
            <h5 className="text-[#e94560] font-bold text-lg uppercase tracking-wide mb-5">Categories</h5>
            <ul className="list-none p-0 space-y-2.5">
                {['Action', 'Comedy', 'Drama', 'Horror'].map((item) => (
                    <li key={item}>
                        <Link href="#" className="text-[#c0c0c0] hover:text-[#e94560] hover:pl-1 transition-all duration-300 text-sm no-underline">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-4">
            <h5 className="text-[#e94560] font-bold text-lg uppercase tracking-wide mb-5">Newsletter</h5>
            <p className="text-[#a0a0a0] leading-relaxed text-sm mb-4">Subscribe to get the latest updates and offers.</p>
            <form className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                classNames={{
                    input: "text-white",
                    inputWrapper: "bg-white/5 border border-white/10 hover:bg-white/10 focus-within:!bg-white/10 focus-within:!border-[#e94560] rounded-md"
                }}
                radius="none"
              />
              <Button className="bg-[#e94560] text-white font-semibold rounded-md hover:bg-[#d63d55]" radius="none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-5 text-center text-[#888] text-sm">
          <p className="mb-0">&copy; {new Date().getFullYear()} MovieApp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
