import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-[#1c1f26] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Adrigo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-white text-xl font-bold">Adrigo</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {[
              ['Overview', '/overview'],
              ['Awareness', '/awareness'],
              ['Engagement', '/engagement'],
              ['Consideration', '/consideration'],
              ['Conversion', '/conversion'],
              ['Decision', '/decision'],
              ['Repeat', '/repeat'],
              ['Brand Love', '/brand-love'],
              ['Advocacy', '/advocacy'],
            ].map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className="text-gray-300 hover:bg-[#2d3139] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Upgrade Plan
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
              <span className="text-white text-sm font-medium">Adrigo Developer</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 