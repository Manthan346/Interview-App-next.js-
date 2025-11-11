import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div className="space-y-4 ">
          <h2 className="text-2xl font-semibold">Mockbuddy.io</h2>
          <p className="text-primary-foreground/80 text-base leading-relaxed">
           Empowering you to ace your upcoming interview with real anonymous mock sessions,
            true actionable feedback and guidance from real professionals. 
            Assess, learn and improve your confidence with each session.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl mb-3 font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-primary-foreground">
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
            <li>
              <a href="#faq" >
                FAQs
              </a>
            </li>

            <li>
              <Link
                href="/contact"
               
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources / Connect */}
        <div>
          <h3 className="text-xl mb-3 font-semibold">Connect</h3>
          <ul className="space-y-2 text-primary-foreground/80">
            <li>
              <Link
                href="/contact"
               
              >
                contact us
              </Link>
            </li>
          
            <li>
              <Link
                href="https://www.linkedin.com/company/mockbuddyio/"
               
              >
                Linkedin
              </Link>
            </li>
            <li>
              <a
                href="mailto:support@mockbuddy.io"
               
              >
                support@mockbuddy.io
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-primary-foreground/20 mt-8 py-6 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} Mockbuddy.io. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
