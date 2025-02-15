import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1c1f26] border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            © {new Date().getFullYear()} Adrigo. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 